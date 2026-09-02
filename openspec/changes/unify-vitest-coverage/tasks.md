## 1. Dependencies

- [x] 1.1 Add `@vitest/coverage-v8` (matching the installed Vitest 4.1.8 major) as a devDependency at the repo root
- [x] 1.2 Run `yarn install` and confirm the lockfile updates cleanly

## 2. Root Vitest Configuration

- [x] 2.1 Create `vitest.config.ts` at the repo root using `defineConfig` from `vitest/config`
- [x] 2.2 Populate the `projects` field with entries for every existing package config: `packages/toolbelt`, `packages/reveal-framework`, `packages/design-system`, `packages/brand-components`, `packages/dnd-character-sheet`, `apps/ageorgedev`, `apps/game-tools`
- [x] 2.3 Add root `test.coverage` config: `provider: 'v8'`, `reporter: ['text', 'html', 'lcov']`, `reportsDirectory: './coverage'`
- [x] 2.4 Inline `include` globs: `packages/*/src/**`, `apps/ageorgedev/src/**`, `apps/game-tools/src/**`
- [x] 2.5 Inline `exclude` globs: test files (`**/*.{test,spec}.{ts,tsx}`), `**/dist/**`, `**/node_modules/**`, `**/storybook-static/**`, `apps/*-e2e/**`, `apps/design-docs/**`, generated data files (spells `.generated.ts`)

## 3. Root Scripts

- [x] 3.1 Replace the root `package.json` `test` script from `turbo test -- --passWithNoTests` to `vitest run`
- [x] 3.2 Add `test:coverage` script: `vitest run --coverage`
- [x] 3.3 Add `test:watch` script: `vitest`
- [x] 3.4 Add `coverage/` to `.gitignore` (verify not already ignored)

## 4. Local Verification

- [x] 4.1 Run `yarn test` — full suite passes, exits 0
- [x] 4.2 Run `yarn test:coverage` — same result, plus `coverage/index.html` and `coverage/lcov.info` are produced
- [x] 4.3 Open `coverage/index.html` and confirm files from every project appear in the report
- [x] 4.4 Run `yarn test:watch`, edit a source file in one package, confirm only its dependent tests re-run
- [x] 4.5 Run `yarn turbo test` — confirm the fallback path still works (per-package configs unchanged)

## 5. CI Workflow Updates

- [x] 5.1 In `.github/workflows/tests.yml`, replace `yarn turbo test ${{ inputs.command_arg }} -- --passWithNoTests` with `yarn test:coverage`
- [x] 5.2 Remove the `command_arg` workflow input from `tests.yml` (no longer used by any caller)
- [x] 5.3 Add an upload-artifact step that publishes `coverage/lcov.info` as artifact `coverage-lcov`
- [x] 5.4 In `.github/workflows/pull-request.yml`, remove the `command_arg: --affected` input from the `Run_Tests` job
- [x] 5.5 Grep for any other workflow that consumes `command_arg` on `tests.yml` and clean up

## 6. Cleanup

- [x] 6.1 Confirm each package still has its own `test` script (`vitest run`) untouched — do not remove
- [x] 6.2 Do not modify `turbo.json` `test` task inputs — turbo path stays functional

## 7. Merge & Validate

- [ ] 7.1 Open a PR against `develop`, watch CI produce a green build and a `coverage-lcov` artifact
- [ ] 7.2 Download the artifact and spot-check the lcov file covers files from every package
- [ ] 7.3 Merge to `develop`; monitor the next PR CI run for regressions
