## Context

`packages/dnd-character-sheet` has no tests. The package contains pure calculation functions (`abilityModifier`, `proficiencyBonus`, `calculateStats`) alongside formatting utilities and data extraction helpers. These functions encode D&D 5e rules directly and are the highest-value testing targets. The monorepo already has a shared Vitest/jsdom config in `packages/testing-config`.

## Goals / Non-Goals

**Goals:**
- Test all pure functions with meaningful assertions (no fluff)
- Cover all three `statMod` variant types in `calculateStats`
- Use minimal inline fixtures (not the example character) for stability
- Compress related assertions into single tests with multiple `expect()`s

**Non-Goals:**
- Testing React components
- Testing DOMPurify's sanitisation behaviour (third-party responsibility)
- 100% line coverage — coverage is a byproduct, not the goal

## Decisions

**Decision: Minimal inline fixtures over reusing `example-wizard.data.ts`**
The example character is narrative data maintained for UI demonstration. Coupling tests to it makes assertions brittle when the character's stats are updated for storytelling reasons. Minimal fixtures with controlled values make test intent explicit.

**Decision: Multiple `expect()`s per test for related assertions**
Functions like `abilityModifier` and `proficiencyBonus` have a small, enumerable input space. A single test with compressed assertions (e.g., all level tiers in one block) is more readable than 5 separate `it()` blocks testing the same function.

**Decision: Test `enrichCharacterData` selection logic, not EJS internals**
The value in testing `enrichCharacterData` is verifying *which fields* on the character get template-processed (feature descriptions) and which don't (ability scores, etc.). EJS interpolation correctness is tested as a side-effect of exercising a real template token.

**Decision: Test all three `statMod` types in `calculateStats`**
`'static-skill-additions'`, `'skill-function'`, and `'generic-derived'` each take a distinct code path. All three are exercised with a minimal character fixture that isolates each variant.

## Risks / Trade-offs

- [Risk] `calculateStats` signature changes → Tests will catch this at compile time (TypeScript) and fail fast
- [Risk] EJS version changes affect template syntax → Single `enrichCharacterData` test contains the blast radius
