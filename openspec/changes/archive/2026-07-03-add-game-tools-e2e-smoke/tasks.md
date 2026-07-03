## 1. Scaffold the e2e app

- [x] 1.1 Create `apps/game-tools-e2e/package.json` mirroring `apps/ageorgedev-e2e/package.json` — name `@ageorgedev/game-tools-e2e`, `e2e` script running `playwright test`, `@playwright/test@1.60.0` and `concurrently@10.0.3` as devDependencies
- [x] 1.2 Create `apps/game-tools-e2e/playwright.config.ts` mirroring the ageorgedev-e2e config, with `baseURL` defaulting to `http://localhost:3001` and a single `chromium` project
- [x] 1.3 Create `apps/game-tools-e2e/tsconfig.json` matching the ageorgedev-e2e tsconfig
- [x] 1.4 Run `yarn install` at the repo root to register the new workspace

## 2. Write the smoke tests

- [x] 2.1 Create `apps/game-tools-e2e/tests/smoke.spec.ts`
- [x] 2.2 Add test: `/` renders — assert heading with name "Game Tools" is visible and a link to `/dnd/characters` is present
- [x] 2.3 Add test: `/dnd/characters` renders — assert heading "Characters" is visible and at least one character name is visible
- [x] 2.4 Add test: `/dnd/characters/claw` renders — assert the character name "Claw" is visible on the sheet

## 3. Verify tests locally

- [x] 3.1 Start game-tools dev server in a separate terminal: `yarn turbo dev --filter=@ageorgedev/game-tools`
- [x] 3.2 Run `yarn turbo e2e --filter=@ageorgedev/game-tools-e2e` and confirm all three tests pass
- [x] 3.3 Confirm `yarn format-and-lint:fix` reports clean

## 4. Wire into CI

- [x] 4.1 Update `.github/workflows/info.yml` production matrix: add `"e2e_project": "@ageorgedev/game-tools-e2e"` to the game-tools entry
- [x] 4.2 Update `.github/workflows/info.yml` PR matrix: add `"e2e_project": "@ageorgedev/game-tools-e2e"` to the game-tools entry AND extend the condition so `@ageorgedev/game-tools-e2e` in affected projects also triggers the game-tools preview deploy (mirroring the ageorgedev-e2e OR-condition pattern)
- [x] 4.3 Sanity-check the `jq` expressions by running them locally against a sample `affected` array or by staging the PR and inspecting the workflow's Debug output

## 5. Validate on PR

- [ ] 5.1 Open the PR and confirm the game-tools preview deploys
- [ ] 5.2 Confirm the e2e job runs against the deployed preview URL and passes
- [ ] 5.3 Confirm no regressions in the ageorgedev preview + e2e flow
