## Why

Unit test files across the monorepo use two different naming conventions — `*.spec.ts(x)` in six packages/apps (`apps/ageorgedev`, `apps/game-tools`, `packages/design-system`, `packages/brand-components`, `packages/reveal-framework`, `packages/toolbelt`) and `*.test.ts(x)` in one (`packages/dnd-character-sheet`). This inconsistency makes it harder to predict a test's filename when navigating the codebase and leaves the "correct" convention undocumented. Standardizing on a single convention removes that ambiguity.

## What Changes

- Rename every Vitest unit test file from `*.spec.ts`/`*.spec.tsx` to `*.test.ts`/`*.test.tsx` via `git mv`, across `apps/ageorgedev`, `apps/game-tools`, `packages/design-system`, `packages/brand-components`, `packages/reveal-framework`, and `packages/toolbelt`. `packages/dnd-character-sheet` already uses `*.test.ts(x)` and needs no file renames.
- Rename the associated Vitest snapshot file (`packages/design-system/src/typography/__snapshots__/typography-components.spec.tsx.snap` → `typography-components.test.tsx.snap`) via `git mv` alongside its test file, preserving recorded snapshot content.
- Update each affected `vitest.config.ts` `test.include` glob from `src/**/*.spec.{ts,tsx}` (or `src/**/*.spec.ts` for `toolbelt`) to `src/**/*.test.{ts,tsx}` (`src/**/*.test.ts` for `toolbelt`, which has no JSX/tsx files today), so only the new convention is discovered.
- Add a short convention note to the root `CLAUDE.md` documenting that Vitest unit tests use `*.test.ts`/`*.test.tsx`, distinct from Playwright e2e specs.
- **Out of scope / explicitly unchanged**: Playwright e2e test files (`apps/ageorgedev-e2e/tests/*.spec.ts`, `apps/game-tools-e2e/tests/*.spec.ts`) keep their `.spec.ts` naming — this is Playwright's own default convention and a different test category, not part of this migration. No CI/lint enforcement script is being added; the updated `vitest.config.ts` include globs plus the CLAUDE.md note are the only guardrails for now.

## Capabilities

### New Capabilities
(none — this change modifies existing test infrastructure, it doesn't introduce a new capability)

### Modified Capabilities
- `vitest-test-runner`: Requirements that reference `.spec.ts`/`.spec.tsx` file discovery (for `packages/toolbelt` and `packages/design-system`) change to reference `.test.ts`/`.test.tsx` discovery instead.

## Impact

- **Affected files**: ~20 test files renamed across `apps/ageorgedev/src`, `apps/game-tools/src`, `packages/design-system/src`, `packages/brand-components/src`, `packages/reveal-framework/src`, `packages/toolbelt/src`, plus one snapshot file.
- **Affected config**: `vitest.config.ts` in `apps/ageorgedev`, `apps/game-tools`, `packages/design-system`, `packages/brand-components`, `packages/reveal-framework`, `packages/toolbelt` (6 files).
- **Affected docs**: root `CLAUDE.md` (new convention note).
- **Not affected**: `packages/dnd-character-sheet` (already compliant), Playwright e2e apps (`apps/ageorgedev-e2e`, `apps/game-tools-e2e`), Biome configuration, CI workflows.
- **Risk**: Low — pure renames plus glob updates, no test logic changes. Main risk is a missed rename causing a test file to silently stop being collected by Vitest; the tasks phase should include a verification step (`yarn test` run to confirm identical test counts before/after).
