## Why

The `dnd-character-sheet` package contains non-trivial calculation logic with no test coverage. Adding targeted unit tests protects the core math (ability modifiers, proficiency bonuses, skill derivation) from regressions as character data and features evolve.

## What Changes

- Add a Vitest test file for `calculate-derived-stats.ts` covering `abilityModifier`, `proficiencyBonus`, and `calculateStats` (with all three `statMod` variant types)
- Add a Vitest test file for `utils.ts` covering `formatMod` and `formatModIgnoreZero`
- Add a Vitest test file for `character-brief.ts` covering `getCharacterBrief`
- Add a Vitest test file for `text-enrichment.ts` covering `enrichCharacterData`
- All tests use minimal inline fixtures; no dependency on the example character data file

## Capabilities

### New Capabilities

- `dnd-unit-tests`: Unit tests for the pure utility and calculation functions in `packages/dnd-character-sheet`

### Modified Capabilities

## Impact

- **Package**: `packages/dnd-character-sheet` — test files added alongside source, no API changes
- **Test config**: Uses existing `packages/testing-config` Vitest/jsdom setup already present in the monorepo
- **CI**: Tests will be picked up by `yarn test` / `yarn turbo test --filter=@ageorgedev/dnd-character-sheet`
