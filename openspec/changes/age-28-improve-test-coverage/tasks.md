## 1. Branch setup

- [x] 1.1 Create branch `feat/AGE-28-test-coverage` off `main`

## 2. Commit 1 — measurement (coverage config only, no tests)

- [x] 2.1 In root `vitest.config.ts`, replace `coverage.include` with the explicit seven-project list: `brand-components`, `design-system`, `dnd-character-sheet`, `reveal-framework`, `toolbelt`, `apps/ageorgedev`, `apps/game-tools` — each as `<path>/src/**/*.{ts,tsx}`
- [x] 2.2 Add `**/*.gen.ts` to `coverage.exclude` (alongside the existing `**/*.generated.ts`)
- [x] 2.3 Add `**/*.stories.tsx` to `coverage.exclude`
- [x] 2.4 Add router wiring to `coverage.exclude`: `**/src/routes/**`, `**/src/router.tsx`, `**/src/components/GlobalProviders.tsx`, `**/src/mdx-components.tsx`
- [x] 2.5 Add `apps/game-tools/src/data/dnd-characters/*/**` to `coverage.exclude` — single-segment wildcard, so `dnd-characters/index.ts` stays measured
- [x] 2.6 Add `packages/dnd-character-sheet/src/characters/**` to `coverage.exclude`
- [x] 2.7 Run `yarn test:coverage` and record the new line/statement figures (expected ~73.8% lines, denominator ~713) — achieved **73.77% lines (526/713)**, **74.3% statements (558/751)**
- [x] 2.8 Verify in the report that no `*.stories.tsx`, `*.gen.ts`, `packages/talk-tailwind/**`, `apps/*/src/routes/**`, or per-character data file appears
- [x] 2.9 Verify `apps/game-tools/src/data/dnd-characters/index.ts` **does** still appear in the report
- [x] 2.10 Commit, with a message stating plainly that this is a measurement-scope change with zero test-quality impact — `9dbb0dc`

## 3. Commit 2 — design-system tests

- [x] 3.1 `theming/ThemeProvider.test.tsx` — test the real provider (not the `__mocks__` copy): default theme, `setTheme` transition, and the `<html>` class-list effect adding/removing `dark`. Real provider is richer than the mock (auto mode, localStorage, matchMedia subscription, `data-theme`, `colorScheme`) so all of that is covered; needed a local `localStorage` stub, see note at 5.9
- [x] 3.2 `color-utils.test.ts`
- [x] 3.3 `theming/theme-init-script.test.ts` — executes the inlined script for real, guarding it against drift from `ThemeProvider`
- [x] 3.4 `ui/button.test.tsx` — snapshot of a composed render covering the variant/size class surface
- [x] 3.5 `ui/breadcrumb.test.tsx` — snapshot of a composed breadcrumb (list, item, link, separator, page)
- [x] 3.6 `ui/dropdown-menu.test.tsx` — snapshot of an **open** menu (portal content is closed by default and renders an empty tree otherwise), including a representative item, checkbox-item, separator, and shortcut
- [x] 3.7 Run `yarn vitest run --project @ageorgedev/design-system` and confirm green — 16 files, 145 passed

## 4. Commit 2 — dnd-character-sheet tests

- [x] 4.1 `components/SpellcastingBlock/GroupedSpellList.test.tsx` (20 lines, largest single target) — 19 tests
- [x] 4.2 `components/SpellcastingBlock/SpellSlotsPanel.test.tsx` — 16 tests
- [x] 4.3 `components/SpellcastingBlock/SpellAbilityPanel.test.tsx`
- [x] 4.4 `components/SpellcastingBlock/SpellcastingBlock.test.tsx`
- [x] 4.5 `components/feature-blocks/FeatureEntry.test.tsx`
- [x] 4.6 `components/feature-blocks/SpeciesAndFeatsCombined.test.tsx`
- [x] 4.7 Extend coverage of `components/feature-blocks/FeatureList.tsx` (currently 50%) to its uncovered branch — new `FeatureList.test.tsx` covering the empty-state branch
- [x] 4.8 `lib/data/with-spell-mods.test.ts`
- [x] 4.9 Run `yarn vitest run --project @ageorgedev/dnd-character-sheet` and confirm green — 21 files, 207 passed

## 5. Commit 2 — reveal-framework and game-tools tests

- [x] 5.1 `packages/reveal-framework/src/components/slide-components.test.tsx`
- [x] 5.2 `packages/reveal-framework/src/components/slide-types.test.tsx`
- [x] 5.3 `apps/game-tools/src/components/HeaderBreadcrumbs.test.tsx`
- [x] 5.4 `apps/game-tools/src/data/dnd-characters/index.test.ts` — slug derivation, resolve-by-slug, unknown-slug throw, known-slug/unknown-level throw, and the no-level default-to-first-entry path
- [x] 5.5 Run `yarn vitest run --project @ageorgedev/reveal-framework` and `--project @ageorgedev/game-tools`, confirm green — 31 and 47 passed
- [x] 5.6 Run `yarn format-and-lint:fix` at the repo root — 8 files reformatted
- [x] 5.7 Run full `yarn test:coverage`, record the achieved line and statement figures — **95.93% lines (684/713)**, **95.87% statements (720/751)**; 53 files, 456 passed
- [x] 5.8 Commit the test additions
- [x] 5.9 **Environment finding:** jsdom 29 under Node 24 leaves `window.localStorage` undefined repo-wide (it defers to Node's built-in, which needs `--localstorage-file`). `ThemeProvider.test.tsx` and `theme-init-script.test.ts` each stub it locally. A shared polyfill in `packages/testing-config/react-jsdom-test-setup.ts` would be the durable fix — deliberately left out of this change as shared-infra scope; see 7.5

## 6. Commit 3 — the CI gate

- [x] 6.1 Add `coverage.thresholds` to root `vitest.config.ts` gating `lines` and `statements` only, each set to the figure recorded in 5.7 minus ~2 points — both set to **93** (achieved 95.93 / 95.87)
- [x] 6.2 Confirm `branches` and `functions` are **not** gated, `perFile` is not enabled, and `autoUpdate` is not enabled
- [x] 6.3 Run `yarn test:coverage` and confirm it exits 0
- [x] 6.4 Temporarily raise the threshold above the achieved figure, re-run, and confirm the run **fails** — then restore the real value. An unverified gate is not a gate — at `lines: 99` it failed with `ERROR: Coverage for lines (95.93%) does not meet global threshold (99%)`, then restored to 93 and re-confirmed exit 0
- [x] 6.5 Confirm `.github/workflows/tests.yml` needs no edit (it already invokes `yarn test:coverage`) — confirmed, `tests.yml:17`
- [x] 6.6 Commit the threshold

## 7. Wrap-up

- [ ] 7.1 Open a PR titled per the repo's `write-commits` convention, referencing AGE-28 with a Linear magic word
- [ ] 7.2 In the PR description, state the before/after figures and note that the denominator changed, so the percentages are not directly comparable
- [x] 7.3 ~~Raise a follow-up ticket: delete `theming/__mocks__/ThemeProvider.tsx`~~ — **declined.** Small enough that drift is unlikely to matter; the mock stays as-is and no ticket is raised
- [x] 7.4 ~~Raise a follow-up ticket: CI check for packages missing a Vitest project~~ — **declined.** The explicit `coverage.include` list is considered visible enough in review on its own
- [x] 7.5 ~~Raise a follow-up ticket: `localStorage` polyfill in `testing-config`~~ — **declined.** Two local stubs is an acceptable cost for now; revisit if more tests start needing storage
