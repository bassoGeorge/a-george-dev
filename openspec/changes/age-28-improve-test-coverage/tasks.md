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
- [ ] 2.10 Commit, with a message stating plainly that this is a measurement-scope change with zero test-quality impact

## 3. Commit 2 — design-system tests

- [ ] 3.1 `theming/ThemeProvider.test.tsx` — test the real provider (not the `__mocks__` copy): default theme, `setTheme` transition, and the `<html>` class-list effect adding/removing `dark`
- [ ] 3.2 `color-utils.test.ts`
- [ ] 3.3 `theming/theme-init-script.test.ts`
- [ ] 3.4 `ui/button.test.tsx` — snapshot of a composed render covering the variant/size class surface
- [ ] 3.5 `ui/breadcrumb.test.tsx` — snapshot of a composed breadcrumb (list, item, link, separator, page)
- [ ] 3.6 `ui/dropdown-menu.test.tsx` — snapshot of an **open** menu (portal content is closed by default and renders an empty tree otherwise), including a representative item, checkbox-item, separator, and shortcut
- [ ] 3.7 Run `yarn vitest run --project @ageorgedev/design-system` and confirm green

## 4. Commit 2 — dnd-character-sheet tests

- [ ] 4.1 `components/SpellcastingBlock/GroupedSpellList.test.tsx` (20 lines, largest single target)
- [ ] 4.2 `components/SpellcastingBlock/SpellSlotsPanel.test.tsx`
- [ ] 4.3 `components/SpellcastingBlock/SpellAbilityPanel.test.tsx`
- [ ] 4.4 `components/SpellcastingBlock/SpellcastingBlock.test.tsx`
- [ ] 4.5 `components/feature-blocks/FeatureEntry.test.tsx`
- [ ] 4.6 `components/feature-blocks/SpeciesAndFeatsCombined.test.tsx`
- [ ] 4.7 Extend coverage of `components/feature-blocks/FeatureList.tsx` (currently 50%) to its uncovered branch
- [ ] 4.8 `lib/data/with-spell-mods.test.ts`
- [ ] 4.9 Run `yarn vitest run --project @ageorgedev/dnd-character-sheet` and confirm green

## 5. Commit 2 — reveal-framework and game-tools tests

- [ ] 5.1 `packages/reveal-framework/src/components/slide-components.test.tsx`
- [ ] 5.2 `packages/reveal-framework/src/components/slide-types.test.tsx`
- [ ] 5.3 `apps/game-tools/src/components/HeaderBreadcrumbs.test.tsx`
- [ ] 5.4 `apps/game-tools/src/data/dnd-characters/index.test.ts` — slug derivation, resolve-by-slug, unknown-slug throw, known-slug/unknown-level throw, and the no-level default-to-first-entry path
- [ ] 5.5 Run `yarn vitest run --project @ageorgedev/reveal-framework` and `--project @ageorgedev/game-tools`, confirm green
- [ ] 5.6 Run `yarn format-and-lint:fix` at the repo root
- [ ] 5.7 Run full `yarn test:coverage`, record the achieved line and statement figures
- [ ] 5.8 Commit the test additions

## 6. Commit 3 — the CI gate

- [ ] 6.1 Add `coverage.thresholds` to root `vitest.config.ts` gating `lines` and `statements` only, each set to the figure recorded in 5.7 minus ~2 points
- [ ] 6.2 Confirm `branches` and `functions` are **not** gated, `perFile` is not enabled, and `autoUpdate` is not enabled
- [ ] 6.3 Run `yarn test:coverage` and confirm it exits 0
- [ ] 6.4 Temporarily raise the threshold above the achieved figure, re-run, and confirm the run **fails** — then restore the real value. An unverified gate is not a gate
- [ ] 6.5 Confirm `.github/workflows/tests.yml` needs no edit (it already invokes `yarn test:coverage`)
- [ ] 6.6 Commit the threshold

## 7. Wrap-up

- [ ] 7.1 Open a PR titled per the repo's `write-commits` convention, referencing AGE-28 with a Linear magic word
- [ ] 7.2 In the PR description, state the before/after figures and note that the denominator changed, so the percentages are not directly comparable
- [ ] 7.3 Raise a follow-up ticket: delete `theming/__mocks__/ThemeProvider.tsx` and migrate consumer tests to the real provider
- [ ] 7.4 Raise a follow-up ticket: CI check that every `packages/*` with `.tsx?` source under `src/` has a `vitest.config.ts` and an entry in `coverage.include`
