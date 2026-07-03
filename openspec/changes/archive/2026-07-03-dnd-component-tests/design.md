## Context

`packages/dnd-character-sheet` has Vitest + jsdom configured and lib-level tests for derived stat calculations. No component tests exist. The `vitest.config.ts` glob only matches `.test.ts`, missing `.test.tsx` files. The package lacks `@testing-library/react` and `@testing-library/jest-dom` as devDependencies (they're workspace-root installed but not declared locally, unlike `design-system` and `brand-components` which declare them explicitly).

All components consume `useCharacter()` which requires a `CharacterSheet` context provider wrapping the rendered tree.

## Goals / Non-Goals

**Goals:**
- Add component-level regression tests for `CharacterSheet`, `AttackList`, `SpellList`, `AbilityBox`
- Exercise all conditional logic branches in `AttackList` (3 attack kinds) and `SpellList` (sorting, prep states, casting time, alt ability)
- Fix vitest config to pick up `.tsx` test files
- Declare testing dependencies explicitly in the package

**Non-Goals:**
- Snapshot tests — brittle and high-maintenance
- Testing pure layout/display components (`Panel`, `RichTextDisplay`, `CombatRow`)
- Visual or CSS assertions
- Re-testing lib logic already covered by `calculate-derived-stats.test.ts`

## Decisions

### Test rendering approach: `@testing-library/react`

Use `render()` + `screen` queries from `@testing-library/react`. Already the established pattern in `design-system` and `brand-components`. Alternatives: direct JSDOM with ReactDOM.render (non-standard in this codebase), Enzyme (unmaintained for React 19).

### Context provision: real `CharacterSheet` wrapper, not mocked hook

Components are wrapped in `<CharacterSheet data={fixture}>` in each test. This exercises the actual context wiring. Mocking `useCharacter()` would be faster to write but would miss wiring bugs — exactly the category the context smoke test is designed to catch.

### Fixtures: minimal inline per test

Each test declares only the `Character` fields the component reads. The existing `example-wizard.data.ts` is intentionally not used as a base — it would create invisible coupling and make tests harder to read. Shared `makeCharacter()` helper can be introduced per test file if needed to satisfy TypeScript's required fields.

### File placement: co-located

`AttackList/AttackList.test.tsx` alongside `AttackList.tsx`. Consistent with the component directory structure already in place.

### vitest include glob: `src/**/*.test.{ts,tsx}`

Replaces `src/**/*.test.ts`. Minimal change, picks up all new `.tsx` test files without affecting existing `.test.ts` files.

## Risks / Trade-offs

- **CSS module class names in jsdom**: Class assertions are avoided; tests use text content and ARIA queries instead. → No mitigation needed given the test strategy.
- **Fixture completeness**: `Character` type has many required fields; minimal fixtures may need a base factory to satisfy TypeScript. → Each test file may introduce a local `makeCharacter()` helper with safe defaults.
- **Context re-calculation cost**: `CharacterSheet` re-runs `calculateStats()` on each render in tests. Acceptable for unit test scale. → No mitigation needed.
