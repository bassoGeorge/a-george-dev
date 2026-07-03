## 1. Verify test infrastructure

- [ ] 1.1 Confirm `packages/dnd-character-sheet` has a `vitest.config.ts` (or inherits from root); add one using `packages/testing-config` if missing
- [ ] 1.2 Confirm `test` script exists in `packages/dnd-character-sheet/package.json`; add if missing

## 2. Calculation engine tests

- [ ] 2.1 Create `packages/dnd-character-sheet/src/lib/calculate-derived-stats.test.ts`
- [ ] 2.2 Write `abilityModifier` test — boundary and representative scores in one compressed block
- [ ] 2.3 Write `proficiencyBonus` test — all five tier boundaries in one compressed block
- [ ] 2.4 Write `calculateStats` test for `'static-skill-additions'` statMod using minimal inline fixture
- [ ] 2.5 Write `calculateStats` test for `'skill-function'` statMod using minimal inline fixture
- [ ] 2.6 Write `calculateStats` test for `'generic-derived'` statMod using minimal inline fixture

## 3. Utility and helper tests

- [ ] 3.1 Create `packages/dnd-character-sheet/src/lib/utils.test.ts` with one compressed test for `formatMod` and `formatModIgnoreZero`
- [ ] 3.2 Create `packages/dnd-character-sheet/src/lib/character-brief.test.ts` with one compressed test covering single-class and multi-class level totals
- [ ] 3.3 Create `packages/dnd-character-sheet/src/lib/text-enrichment.test.ts` with two tests: EJS interpolation in feature descriptions, and non-template fields unchanged

## 4. Verify

- [ ] 4.1 Run `yarn turbo test --filter=@ageorgedev/dnd-character-sheet` and confirm all tests pass with no type errors
