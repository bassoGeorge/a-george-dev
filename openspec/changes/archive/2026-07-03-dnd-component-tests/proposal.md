## Why

The `dnd-character-sheet` package has solid lib/utility test coverage but zero component rendering tests. Several components (`AttackList`, `SpellList`, `AbilityBox`) contain non-trivial conditional logic that currently has no regression protection — a bug in attack bonus calculation or spell sorting would only surface at runtime.

## What Changes

- Add `@testing-library/react`, `@testing-library/jest-dom`, and `@ageorgedev/testing-config` to `dnd-character-sheet` devDependencies
- Update `vitest.config.ts` include glob from `src/**/*.test.ts` to `src/**/*.test.{ts,tsx}` to pick up new `.tsx` test files
- Add co-located component test files:
  - `CharacterSheet.test.tsx` — smoke test that the provider wires derived stats correctly
  - `AttackList/AttackList.test.tsx` — all three attack kind branches, mastery column logic, damage formatting, empty state
  - `SpellcastingBlock/SpellList.test.tsx` — spell sorting, prep-state display, casting time normalisation, alternate ability display, empty row padding
  - `AbilityBox/AbilityBox.test.tsx` — proficiency/expertise states, saving throw, modifier display rules

## Capabilities

### New Capabilities

- `dnd-component-tests`: UI regression and logic tests for `CharacterSheet`, `AttackList`, `SpellList`, and `AbilityBox` components

### Modified Capabilities

## Impact

- **Package**: `packages/dnd-character-sheet`
- **Config**: `vitest.config.ts` include glob updated
- **Dependencies**: `@testing-library/react@16.3.2`, `@testing-library/jest-dom@6.9.1`, `@ageorgedev/testing-config@workspace:*` added as devDependencies
- **No production code changes** — test files and config only
