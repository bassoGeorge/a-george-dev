## Context

Six of seven packages/apps with Vitest unit tests use `*.spec.ts(x)`; `packages/dnd-character-sheet` alone uses `*.test.ts(x)`. Two separate Playwright e2e apps (`apps/ageorgedev-e2e`, `apps/game-tools-e2e`) independently use `*.spec.ts`, following Playwright's own default `testMatch`. This design covers only the Vitest side — decided in the grilling session to leave Playwright naming untouched, since e2e tests are a different test category and `.spec.ts` there is idiomatic, not inconsistent.

## Goals / Non-Goals

**Goals:**
- Every Vitest unit test file in the repo uses `*.test.ts` or `*.test.tsx`.
- Every `vitest.config.ts` `include` glob only matches the new convention (no dual-matching transition period).
- The one Vitest snapshot file tied to a renamed test keeps its recorded content, just under the new name.
- Git history/blame is preserved for every renamed file.
- The convention is written down in root `CLAUDE.md` so it doesn't regress silently.

**Non-Goals:**
- Renaming Playwright e2e `*.spec.ts` files in `apps/ageorgedev-e2e` or `apps/game-tools-e2e`.
- Adding a CI/lint script or Biome rule to hard-enforce the naming convention (explicitly declined — the user will police this manually for now).
- Any change to test logic, assertions, or coverage.
- Any change to Biome configuration.

## Decisions

**Rename via `git mv`, one file at a time.** Preserves git history/blame per file; a bulk delete+recreate would lose it. Applies to all ~20 test file renames and the one snapshot rename.

**Snapshot file: rename, don't regenerate.** `typography-components.spec.tsx.snap` → `typography-components.test.tsx.snap` via `git mv`. Vitest matches snapshot files by test filename, not content hash, so the rename alone keeps the existing assertion intact. Regenerating (deleting and letting Vitest rewrite it) was considered and rejected — it adds a manual "confirm nothing actually changed" review step for zero benefit over a straight rename.

**Config `include` globs updated per-package, not globally.** Each `vitest.config.ts` already has its own `include` array; each is updated independently to `src/**/*.test.{ts,tsx}` (or `src/**/*.test.ts` for `toolbelt`, which is a non-React package with no `.tsx` files and no `react()` plugin — kept as `.ts`-only rather than speculatively widened to `{ts,tsx}`).

**Guardrail is documentation + config only, no enforcement tooling.** Considered a CI script (`grep`/`find` over `src/**/*.spec.{ts,tsx}` failing the build) and a Vitest-level check, both rejected by the user for now. The updated `include` globs act as a soft guard (a misnamed file just silently won't run), and the CLAUDE.md note documents the expected convention for humans and future Claude Code sessions.

**Spec-level change scoped to `vitest-test-runner` only.** Searched all `openspec/specs/*/spec.md` for literal `.spec.` filename references — only `vitest-test-runner` contains requirement text naming `.spec.ts`/`.spec.tsx` files directly (for `toolbelt` and `design-system`). Other unit-test specs (`ageorgedev-app-unit-tests`, `brand-components-unit-tests`, `reveal-framework-unit-tests`, `dnd-unit-tests`, `dnd-component-tests`, `toolbelt-cn-tests`) describe test coverage/behavior without asserting a filename convention, so they need no delta spec.

## Risks / Trade-offs

- **[Risk]** A renamed test file is missed, silently dropping it from the suite (Vitest just won't discover it under the new glob) → **Mitigation**: run `yarn test` before and after the migration and confirm identical test/file counts per package.
- **[Risk]** The design-system snapshot rename is done incorrectly (e.g., content edited instead of pure rename), causing an unrelated snapshot diff → **Mitigation**: use `git mv` exactly, then run `yarn turbo test --filter=@ageorgedev/design-system` and confirm zero diff/no snapshot-write prompt.
- **[Trade-off]** No automated enforcement means naming drift could recur later → accepted per user decision; documented in CLAUDE.md as the mitigation of record.

## Migration Plan

1. Rename all `*.spec.ts(x)` files to `*.test.ts(x)` via `git mv`, package by package.
2. Rename the design-system snapshot file via `git mv`.
3. Update the six affected `vitest.config.ts` `include` globs.
4. Update the `vitest-test-runner` spec (delta spec) to reference `.test.ts(x)` instead of `.spec.ts(x)`.
5. Add the convention note to root `CLAUDE.md`.
6. Run `yarn test` at the root and verify all packages report the same test counts as before the migration.

No rollback complexity beyond `git revert` — this is a pure rename + config change with no runtime behavior difference.

## Open Questions

None — all open questions were resolved in the pre-proposal grilling session.
