## 1. Commit 1 — split the build config

- [x] 1.1 Add `packages/toolbelt/tsconfig.build.json` extending `./tsconfig.json`, excluding `**/*.test.*`, `**/*.spec.*`, `**/*.stories.*`, `**/__mocks__/**`, `**/__snapshots__/**`
- [x] 1.2 Point `toolbelt`'s `build` script at it (`tsc -p tsconfig.build.json`)
- [x] 1.3 Repeat 1.1–1.2 for `brand-components`, `design-system`, `dnd-character-sheet`, `reveal-framework`, `talk-tailwind`
- [x] 1.4 Run `yarn build:packages --force` and confirm all 12 tasks succeed
- [x] 1.5 Confirm no `dist/` contains test output: `find packages/*/dist -name '*test*'` returns nothing (was 132 artifacts)
- [x] 1.6 Confirm no `dist/` contains story, mock, or snapshot output (was 24 story artifacts in design-system)
- [x] 1.7 Confirm source output survives — `design-system/dist` still has `.js` + `.d.ts` for its real modules, and dependants compile against them
- [x] 1.8 **Verify the Storybook risk from design.md:** run `yarn build:design-docs` and confirm it succeeds with stories excluded. If it fails, stop and report — do not silently re-include stories
- [x] 1.9 Run `yarn test:coverage` and confirm it still exits 0 at the 93% floor
- [x] 1.10 Run `yarn format-and-lint:fix`
- [x] 1.11 Commit

## 2. Commit 2 — typecheck scripts and the turbo task

- [x] 2.1 Rename `packages/toolbelt`'s `check-types` script to `typecheck`; confirm no `check-types` reference remains anywhere
- [x] 2.2 Add `typecheck: tsc --noEmit` to `brand-components`, `design-system`, `dnd-character-sheet`, `reveal-framework`, `talk-tailwind`
- [x] 2.3 ~~Add `typecheck` to `packages/testing-config` and `packages/ts-config`~~ — **dropped.** Neither owns a `tsconfig.json` and there is no root config to inherit, so the script would resolve no project and check nothing. `ts-config` has no TypeScript source at all. `testing-config` is a real gap (its setup file is loaded by all six Vitest projects and compiled by nothing) but closing it means authoring a config — raised as a separate change. Spec, proposal and design amended to match
- [x] 2.4 Add a `typecheck` task to `turbo.json`: `dependsOn: ["^build"]`, no `outputs`, `inputs` that **include** test/story/mock files
- [x] 2.5 Add a comment on `build.inputs` recording that its exclusions are sound only while `tsconfig.build.json` excludes the same files
- [x] 2.6 Run `yarn turbo typecheck --filter='./packages/*'` and confirm it passes clean
- [x] 2.7 **Verify the cache split:** edit a test file, re-run both tasks, confirm `typecheck` re-executes while `build` reports a cache hit. This is the core mechanism — an unverified cache split is the bug we are fixing
- [x] 2.8 Re-run `typecheck` with no edit and confirm a full cache hit
- [x] 2.9 Commit

## 3. Commit 3 — the CI gate

- [x] 3.1 Add a typecheck step to the `Test` job in `.github/workflows/tests.yml`, positioned before `yarn test:coverage`
- [x] 3.2 Confirm it is a step in the existing job, not a new job, so the install is reused
- [x] 3.3 **Verify the gate catches the original bug class:** temporarily reintroduce an invalid union member in a test file (e.g. `shape="scooped"`), run typecheck locally, and confirm it fails. Restore afterwards. An unverified gate is not a gate
- [x] 3.4 Confirm a clean tree passes the step and proceeds to the coverage run
- [x] 3.5 Commit

## 4. Apps — measure first, then decide

- [ ] 4.1 Add a `typecheck` script to `apps/ageorgedev` and `apps/game-tools`; leave both `build` scripts as `vite build`
- [ ] 4.2 Run `tsc --noEmit` in each app and **record the error count and a summary of the kinds of error** in this file
- [ ] 4.3 **Decision point — report to the user before proceeding.** If the count is small, fix the errors here. If it is large or the fixes are substantive, split the app work into its own change and revert 4.1. Do not absorb an open-ended fix pile into this change unannounced
- [ ] 4.4 If fixing here: fix the errors, confirm both apps typecheck clean, and confirm `vite build` still succeeds for both
- [ ] 4.5 If splitting: raise the follow-up change, and record here why

## 5. Wrap-up

- [ ] 5.1 Run the full `yarn build:packages --force`, `yarn turbo typecheck`, and `yarn test:coverage` one final time; confirm all green
- [ ] 5.2 Record in this file the outcome of 1.8 (Storybook), 2.7 (cache split), and 4.2 (app error count), so none of them is re-litigated later
- [ ] 5.3 Open a PR titled per the repo's `write-commits` convention
