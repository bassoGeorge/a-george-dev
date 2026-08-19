---
name: write-unit-tests
description: Conventions for writing or adding Vitest unit tests in this monorepo (ageorgedev, game-tools, design-system, dnd-character-sheet, brand-components, reveal-framework, toolbelt). Use this whenever asked to write a test, add test coverage, create a `.test.ts`/`.test.tsx` file, or test a component/function/hook in one of these packages — even if the request doesn't say "unit test" explicitly (e.g. "make sure this is covered", "add some tests for this"). Does NOT apply to Playwright e2e tests in apps/ageorgedev-e2e or apps/game-tools-e2e, which use a separate `.spec.ts` convention and live under `tests/`.
---

# Writing unit tests in this monorepo

This repo's Vitest conventions were standardized in `openspec/changes/archive/2026-07-15-standardize-test-file-naming/` (archived — see that directory's `proposal.md`/`design.md` for the full rationale). Follow them so new tests look like they belong.

## File naming and placement

- Test files are `<Name>.test.ts` or `<Name>.test.tsx` — never `.spec.ts(x)` (that suffix is reserved for Playwright e2e tests in `apps/*-e2e/tests/`, a different tool with a different convention).
- Co-locate the test next to the file it covers: `Card.tsx` → `Card.test.tsx` in the same directory. Don't create a separate `__tests__/` folder.
- Check the package's `vitest.config.ts` `test.include` glob before assuming — it's the source of truth for what Vitest will actually discover, and every package should already be `src/**/*.test.{ts,tsx}` (or `src/**/*.test.ts` for non-React packages).

## Environment per package

Vitest environment and setup differ depending on whether the package renders React components:

| Package type | Example packages | `environment` | `setupFiles` |
|---|---|---|---|
| React/UI | `apps/ageorgedev`, `apps/game-tools`, `packages/design-system`, `packages/brand-components`, `packages/reveal-framework`, `packages/dnd-character-sheet` | `jsdom` | `['@ageorgedev/testing-config/react-jsdom-test-setup.ts']` |
| Plain TS/utility | `packages/toolbelt` | `node` | none |

The shared setup file (`packages/testing-config/react-jsdom-test-setup.ts`) wires up `@testing-library/jest-dom` matchers and runs `cleanup()` after each test — you don't need to import or configure that yourself in a test file, it's automatic. If you're adding a *new* package with unit tests, copy the `vitest.config.ts` shape from an existing package of the matching type rather than writing one from scratch.

## Always use Vitest APIs, never Jest globals

This repo migrated off Jest. Use `vi.fn()`, `vi.mock()`, `vi.spyOn()` — not `jest.fn()`/`jest.mock()`. Import test primitives (`describe`, `it`, `expect`, `vi`) from `'vitest'`, not globals.

## Patterns to follow

**Plain function/utility test** (`packages/toolbelt/src/ramda-additions.test.ts`):
```ts
import { describe, expect, it } from 'vitest';
import { mapKeys } from './ramda-additions';

describe('mapKeys', () => {
  it('works directly', () => {
    expect(mapKeys((key) => `${key}__test`, { name: 'test', age: 10 })).toEqual({
      name__test: 'test',
      age__test: 10,
    });
  });
});
```

**React component test** (`packages/design-system/src/cards/Card.test.tsx`) — use `@testing-library/react`'s `render`/`screen`, assert with `@testing-library/jest-dom` matchers (`toBeInTheDocument`, `toHaveClass`, `toHaveAttribute`), query by visible text/role/testid rather than implementation details:
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders with default styles', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('shadow-normal');
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Card content</Card>);
    expect(screen.getByText('Card content')).toHaveClass('custom-class');
  });
});
```

**Component under a context provider** (`packages/dnd-character-sheet/src/components/AttackList/AttackList.test.tsx`) — when a component reads from a React context, write a small local factory for the context value/props instead of duplicating a full fixture in every test, and a render helper that wraps the component in its provider:
```tsx
function makeCharacter(overrides: Partial<Character> = {}): Character {
  return { /* ...minimal valid defaults... */, ...overrides };
}

function renderAttackList(character: Character) {
  return render(
    <CharacterSheet data={character}>
      <AttackList />
    </CharacterSheet>
  );
}

it('weapon attack: bonus = abilityMod + profBonus + attackBonusMod', () => {
  // STR 16 → mod +3, level 1 → profBonus +2, attackBonusMod +1 → total +6
  renderAttackList(makeCharacter({ /* ... */ }));
  expect(screen.getByText('+6')).toBeInTheDocument();
});
```
Note the comment above the assertion spelling out the arithmetic — when a test's expected value comes from a calculation, show the calculation, not just the answer.

**Snapshot tests** (`packages/design-system/src/typography/typography-components.test.tsx`) — used sparingly, mainly for typography/styling components where enumerating every class assertion is unwieldy:
```tsx
it('should add correct styling for heading types', async () => {
  const { baseElement } = await render(<div><Heading1>Heading 1</Heading1></div>);
  expect(baseElement).toMatchSnapshot();
});
```
The generated `__snapshots__/<TestFile>.snap` is keyed to the exact test filename. If you ever rename a test file that has a snapshot, `git mv` the `.snap` file alongside it — don't delete and regenerate, since that discards the recorded assertion and makes the rename diff harder to review.

## Running tests

- `yarn test` from the repo root runs every package via Turborepo.
- `yarn turbo test --filter=@ageorgedev/<package-name>` runs just one package (e.g. `--filter=@ageorgedev/design-system`).
- After adding or renaming test files, run `yarn format-and-lint:fix` from the repo root (not `npx biome` directly) to catch formatting issues before considering the work done.
