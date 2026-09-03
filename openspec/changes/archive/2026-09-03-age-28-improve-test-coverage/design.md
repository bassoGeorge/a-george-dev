## Context

Coverage today is **52.8% of lines (526/997)**, produced by a root `vitest.config.ts` whose `coverage.include` is a broad `packages/*/src/**` + two app globs. The root config registers seven Vitest projects (five packages, two apps) via `projects`, but the coverage include glob is wider than that set — it sweeps in `packages/talk-tailwind`, which has neither a `vitest.config.ts` nor a `test` script. That mismatch is the structural bug behind most of the noise.

Measured composition of the 997-line denominator:

| Bucket | Lines | Currently covered |
|---|---|---|
| Storybook stories | 88 | 0 |
| Generated route trees (`routeTree.gen.ts`) | 30 | 0 |
| `packages/talk-tailwind` (no Vitest project) | 73 | 0 |
| Router wiring (`routes/**`, `router.tsx`, `__root.tsx`, `GlobalProviders.tsx`, `mdx-components.tsx`) | 56 | 0 |
| Per-character D&D data + example fixtures | 37 | 0 |
| **Genuinely untested logic** | ~160 | 0 |
| Everything else | ~553 | 526 |

Every excluded bucket is at zero coverage, so removing them changes only the denominator: 997 → ~713, and 526/713 ≈ **73.8%** with no tests written. The remaining ~160 uncovered lines are the actual work.

Constraints: `.github/workflows/tests.yml` already runs `yarn test:coverage`, so a threshold in the Vitest config is enforced in CI with no workflow edit. Cross-package imports resolve through each package's `exports` map to built `dist/`, so `yarn test:coverage` builds workspace packages first — test runs are not cheap, which argues against iterating on threshold values by trial.

## Goals / Non-Goals

**Goals**

- Coverage measures only code that a configured test runner can reach.
- The ~160 lines of genuinely untested logic get tests.
- A CI-enforced floor prevents silent regression.
- The measurement fix and the quality improvement are separable in `git log`, so the ~21-point jump from exclusions is not mistaken for test-writing.

**Non-Goals**

- Deleting `theming/__mocks__/ThemeProvider.tsx` and migrating consumer tests to the real provider. Behavioural change to every consumer test; reviewed and accepted as-is, no follow-up planned.
- Extracting route-level logic into tested `lib/` helpers. Investigated (see Decision 4) and found unnecessary — the logic is already extracted.
- Adding a Storybook test-runner or `@storybook/addon-vitest` so stories execute in CI. A plausible alternative to excluding stories, but a substantially larger change.
- A CI check that every package with `src/*.tsx?` has a Vitest project. Considered and declined: the explicit `coverage.include` list is judged visible enough in review on its own.
- `perFile` thresholds. Not viable while any included file sits at 0%.
- Any production source change. This change touches tests and config only.

## Decisions

### 1. Narrow `coverage.include` rather than grow `coverage.exclude`

**Chosen:** enumerate the seven Vitest-enabled projects explicitly in `coverage.include`.

**Alternative rejected:** add `packages/talk-tailwind/**` to `coverage.exclude`. That records a *conclusion* ("this package isn't meaningful") when the *fact* is narrower and more useful: the package has no test runner attached. Excluding by name also leaves `foundation-styles`, `testing-config`, and `ts-config` in the same latent state, and if `talk-tailwind` ever gains a `vitest.config.ts` the exclusion would silently keep suppressing it. Deriving the include set from "has a Vitest project" makes re-entry automatic.

**Alternative rejected:** derive the include list programmatically from the `projects` array. Genuinely DRY, but it makes a new untested package *invisible* to coverage — relocating the exact failure mode being fixed. An explicit seven-line list forces a conscious edit and shows up in review diffs.

### 2. Exclude file *kinds* by glob, not by path

`**/*.gen.ts` rather than the two literal `routeTree.gen.ts` paths; it sits alongside the existing `**/*.generated.ts` and catches a future app's route tree without an edit. Same reasoning for `**/*.stories.tsx`.

The one place a literal path wins is character data: `apps/game-tools/src/data/dnd-characters/*/**` and `packages/dnd-character-sheet/src/characters/**` are two unrelated locations in different packages, and a convention-based glob (`**/data/**`, `**/*.data.ts`) would over-reach into any future `data/` directory that does contain logic.

### 3. The `*/**` wildcard is load-bearing

`dnd-characters/*/**` — single-segment wildcard, then everything below — excludes the per-character directories and `common/` while leaving `dnd-characters/index.ts` measured. That file reads like data by location but is a registry: it derives slugs (`brief.name.toLowerCase().replace(/\W+/g, '-')`), groups with Ramda's `groupBy`, and exports `getCharacterBySlugAndLevel` with two throw paths and a level-matching branch. At 17 lines it is the single largest item in the "data" bucket and sits on the critical path of every character-sheet URL. A naive `dnd-characters/**` would have buried it.

`common/` *is* excluded despite containing a few factories (`weaponMastery`, `expertise`, `darkvision`) and `derivedEffect` closures. It is ~95% declarative `Feature` objects, and the effect machinery those closures feed (`apply-effects.ts`, `derived-stats.ts`) is already at 100% and 98%. Recorded as a deliberate call, not an oversight.

### 4. Excluding `routes/**` does not bury logic — verified

The concern with a blanket route exclusion is that leaf routes hide real behaviour. Checked `$slug.{-$level}.tsx`, the most suspicious candidate: its `params.parse` is a one-line `parseInt`, and both `beforeLoad` and the component delegate straight to `getCharacterBySlugAndLevel`. The logic is *already* extracted — into `data/dnd-characters/index.ts`, which Decision 3 keeps in scope and which gets tests. So the exclusion removes framework wiring only, and no extraction refactor is needed.

### 5. Vendored shadcn primitives are first-party code

`packages/design-system/src/ui/**` carries modified Tailwind classes for this design system and continues to be edited. Treating it as third-party and excluding it would stop measuring code that actually changes. Kept in scope, tested with snapshots — consistent with the existing precedent at `typography/typography-components.test.tsx`, and appropriate where the thing under test is a class-name surface rather than behaviour.

**Implementation note:** `dropdown-menu.tsx` is 15 lines across ~10 exported subcomponents, and Radix renders its content through a portal that is closed by default. A single default-state `<DropdownMenu>` render captures an empty tree and covers almost nothing. Each primitive needs one snapshot of a *composed, open* state exercising a representative subcomponent of each kind.

### 6. Gate `lines` and `statements`; report `branches` and `functions`

v8 synthesises branch counts for optional chaining and default parameters — constructs nobody wrote a branch for. Gating `branches` produces failures that say nothing about test quality and train people to bump the threshold. `lines` and `statements` move together and are the number actually tracked.

Floor = achieved − ~2 points, set *after* the tests land. Setting it to the exact achieved figure makes the next PR that adds a file fail; setting it aspirationally high makes it decorative.

**Alternative rejected:** `thresholds.autoUpdate`. Vitest rewrites the config file mid-run — a dirty working tree in CI, and the floor ratchets without anyone reviewing it.

### 7. Three commits, one branch

Ordering is forced: the threshold cannot be set truthfully before the tests land. Splitting into `1) config/exclusions`, `2) tests`, `3) threshold` keeps "why did coverage jump 23 points" answerable from `git log` — commit 1's message states plainly that it is a measurement change with zero quality impact. Three separate PRs would be ceremony for one ticket.

## Risks / Trade-offs

**Exclusions can be used to hide real gaps → ** every exclusion in this change is justified by a property of the code (no test runner, generated, portal of framework wiring, declarative data), not by "hard to test". The one judgement call, `common/`, is written down in the proposal with its reasoning.

**The 21-point jump reads as a quality win → ** commit 1 is isolated and its message says otherwise; the proposal states the before/after denominators explicitly.

**`ThemeProvider` mock drift → ** this change tests the real provider but leaves `__mocks__/ThemeProvider.tsx` in place, so the two implementations can still diverge and coverage will show green either way. Reviewed and accepted; the mock is small enough that the exposure is judged low. No follow-up planned.

**Threshold blocks unrelated PRs → ** the 2-point buffer absorbs a normal-sized new file. If it proves too tight in practice the fix is to widen the buffer, not to remove the gate.

**Snapshot tests lock in Radix internals → ** a Radix upgrade will churn the `.snap` files. Acceptable: that churn is exactly the signal wanted when a vendored primitive's rendered output changes. Note the `write-unit-tests` convention — if a test file with a snapshot is renamed, `git mv` the `.snap` alongside it.

**Explicit include list goes stale → ** a new package added without a `vitest.config.ts` *and* without an include entry is invisible to coverage. Mitigated by the list being explicit enough to notice in review. A CI check would close this properly but was considered and declined.

## Migration Plan

1. **Commit 1 — measurement.** Rewrite `coverage.include` / `coverage.exclude` in the root `vitest.config.ts`. Run `yarn test:coverage`, record the new figure (expected ~73.8% lines), confirm the excluded buckets are absent from the report and that `dnd-characters/index.ts` is still present.
2. **Commit 2 — tests.** Add the test files per package, running each package's suite as it goes (`yarn vitest run --project @ageorgedev/<name>`). Full `yarn test:coverage` at the end to get the achieved figure.
3. **Commit 3 — gate.** Set `coverage.thresholds.lines` / `.statements` to achieved − 2. Re-run `yarn test:coverage` to confirm it passes, then temporarily raise the floor above achieved to confirm it actually *fails* — an unverified gate is not a gate.
4. `yarn format-and-lint:fix` at the repo root before finishing.

**Rollback:** the threshold is one config block; deleting it restores report-only behaviour without touching tests. The exclusions are one config block; reverting commit 1 restores the old denominator.

## Open Questions

None outstanding — resolved during the grilling session that preceded the proposal.

Three items surfaced during implementation and were each reviewed and declined rather than left open: deleting the `ThemeProvider` mock, a CI check enforcing that every package with TypeScript source has a Vitest project, and a shared `localStorage` polyfill in `testing-config` (jsdom 29 under Node 24 leaves `window.localStorage` undefined; the two tests that need storage stub it locally).
