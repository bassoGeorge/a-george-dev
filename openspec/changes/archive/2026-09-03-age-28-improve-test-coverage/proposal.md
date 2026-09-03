# AGE-28: Improve unit test coverage and scope what coverage measures

## Why

Unit-test coverage across the monorepo reads **52.8% of lines (526/997)**, which is neither trustworthy nor actionable. A large share of the denominator is code that no unit test could ever execute — Storybook stories, generated TanStack route trees, a slide-deck package with no Vitest project attached, and declarative D&D data files. At the same time, genuinely untested logic hides inside that noise: `ThemeProvider`, the entire `SpellcastingBlock` family, and the character registry that backs every character-sheet URL are all at 0%.

Fixing only the second half leaves the number meaningless; fixing only the first half is cosmetic. This change does both, then locks the result in with a CI-enforced floor so it cannot silently regress.

## What Changes

### 1. Coverage measures only projects that can be tested

- Replace the broad `packages/*/src/**` include glob with an **explicit enumeration** of the seven projects that have a `vitest.config.ts`: `brand-components`, `design-system`, `dnd-character-sheet`, `reveal-framework`, `toolbelt`, `apps/ageorgedev`, `apps/game-tools`.
- This is a root-cause fix, not a deny-list. `packages/talk-tailwind` contributes 73 uncovered lines but has **no `vitest.config.ts` and no `test` script** — it is not in the root `projects` array, so it can never register a covered line. The same structural hole applies to `foundation-styles`, `testing-config`, and `ts-config`. Narrowing `include` states the real rule: *coverage measures projects with a test runner*.
- An explicit list (rather than a derived glob) means adding a new package forces a conscious edit to `vitest.config.ts`, keeping the omission visible in review.

### 2. Exclude file kinds that cut across those projects

| Pattern | Lines | Rationale |
|---|---|---|
| `**/*.stories.tsx` | 88 | No Storybook test-runner or `@storybook/addon-vitest` is configured in `apps/design-docs` — stories execute nowhere in CI. |
| `**/*.gen.ts` | 30 | Generated TanStack route trees. Sibling to the existing `**/*.generated.ts`; the glob form catches future apps without an edit. |
| `**/src/routes/**`, `router.tsx`, `__root.tsx`, `GlobalProviders.tsx`, `mdx-components.tsx` | 56 | Framework wiring. The pages themselves are covered by Playwright e2e in `ageorgedev-e2e` / `game-tools-e2e`. |
| `apps/game-tools/src/data/dnd-characters/*/**` | 35 | Per-character data directories and `common/`. |
| `packages/dnd-character-sheet/src/characters/**` | 2 | `example-wizard.data.ts` and `example.tsx` fixtures. |

**Deliberately kept in scope** — `apps/game-tools/src/data/dnd-characters/index.ts` (17 lines, 0%). Despite living in `data/`, it is a registry, not data: it derives slugs, groups by slug with Ramda, and exports `getCharacterBySlugAndLevel` with two error paths and a level-matching branch. The `*/**` glob excludes the character subdirectories while leaving this file measured.

**Deliberately kept in scope** — the vendored shadcn primitives in `packages/design-system/src/ui/**`. They carry modified Tailwind classes for this design system and continue to be edited, so they are treated as first-party code and get tests rather than an exclusion.

### 3. New tests for the genuinely untested units

Roughly 160 uncovered lines, targeted in rough order of value:

- `ThemeProvider.tsx` (36) — see the risk note below.
- `SpellcastingBlock` family (41): `GroupedSpellList`, `SpellSlotsPanel`, `SpellAbilityPanel`, `SpellcastingBlock`.
- shadcn primitives (26): `dropdown-menu`, `breadcrumb`, `button` — snapshot tests, consistent with the existing precedent in `typography-components.test.tsx`.
- `data/dnd-characters/index.ts` (17) — slug derivation and both `getCharacterBySlugAndLevel` error paths.
- `reveal-framework` `slide-components.tsx` / `slide-types.tsx` (16).
- `HeaderBreadcrumbs.tsx` (12), `feature-blocks` (8), `with-spell-mods.ts` (2), `color-utils.ts` (1), `theme-init-script.ts` (1).

### 4. CI-enforced coverage floor

Add `coverage.thresholds` to the root `vitest.config.ts`, gating **`lines` and `statements` only**, set to the achieved figure minus ~2 points as a ratchet-resistant floor. `branches` and `functions` are reported but not gated — v8 counts optional-chaining and default-parameter branches nobody wrote, which produces false failures. Global thresholds only; `perFile` is not viable while any file remains at 0%. No `autoUpdate` — rewriting config during a CI run creates dirty working trees and ratchets without review.

`.github/workflows/tests.yml` already runs `yarn test:coverage`, so the gate needs no workflow change.

## Expected outcome

| | Lines | Denominator |
|---|---|---|
| Today | 52.8% | 997 |
| After exclusions alone | ~73.8% | ~713 |
| After new tests | ~88–93% | ~713 |

The ~21-point jump from exclusions is a measurement fix, not a quality improvement, and is called out as such so the delta in `git log` stays honest.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `unit-test-coverage`: The "Coverage output includes application and package source" requirement changes from a broad `packages/*/src/**` glob to an explicit list of Vitest-enabled projects, and the exclusion set grows to cover stories, `*.gen.ts`, route wiring, and character data. A new requirement adds a CI-enforced threshold on lines and statements.

## Impact

**Config**
- `vitest.config.ts` (root) — `coverage.include`, `coverage.exclude`, new `coverage.thresholds`.

**New test files** (co-located `.test.tsx` per the `write-unit-tests` conventions)
- `packages/design-system/src/theming/ThemeProvider.test.tsx`, `src/ui/{button,breadcrumb,dropdown-menu}.test.tsx`, `src/color-utils.test.ts`, `src/theming/theme-init-script.test.ts`
- `packages/dnd-character-sheet/src/components/SpellcastingBlock/*.test.tsx`, `src/components/feature-blocks/*.test.tsx`, `src/lib/data/with-spell-mods.test.ts`
- `packages/reveal-framework/src/components/{slide-components,slide-types}.test.tsx`
- `apps/game-tools/src/components/HeaderBreadcrumbs.test.tsx`, `src/data/dnd-characters/index.test.ts`

**Unchanged**
- `.github/workflows/tests.yml` — already invokes `yarn test:coverage`.
- No production source changes. This is a test-and-config change only.

**Risk knowingly accepted**
- `packages/design-system/src/theming/__mocks__/ThemeProvider.tsx` is a hand-written parallel implementation that every consumer test uses instead of the real provider. This change tests the real `ThemeProvider` but leaves the mock in place, so the two can still drift — a correctness risk the coverage percentage will not surface. Reviewed and accepted: the mock is small enough that drift is unlikely to bite, and deleting it would mean a behavioural change to every consumer test. No follow-up is planned.

**Assumption on record**
- `data/dnd-characters/common/` is excluded along with the per-character directories. It is ~95% declarative `Feature` objects; the handful of factories (`weaponMastery`, `expertise`, `darkvision`) and `derivedEffect` closures inside it delegate to `apply-effects.ts` and `derived-stats.ts`, already at 100% and 98%.
