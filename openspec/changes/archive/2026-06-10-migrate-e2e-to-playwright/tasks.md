## 1. Clean up Cypress

- [x] 1.1 Delete `apps/ageorgedev-e2e/cypress.config.ts`
- [x] 1.2 Delete `apps/ageorgedev-e2e/src/` directory (all Cypress support files, fixtures, and test files)
- [x] 1.3 Remove `cypress` and `@testing-library/cypress` from `apps/ageorgedev-e2e/package.json` devDependencies

## 2. Add Playwright

- [x] 2.1 Add `@playwright/test` at version `1.60.0` (exact pin) to `apps/ageorgedev-e2e/package.json` devDependencies
- [x] 2.2 Update the `e2e` script in `apps/ageorgedev-e2e/package.json` to `playwright test`
- [x] 2.3 Create `apps/ageorgedev-e2e/playwright.config.ts` reading `BASE_URL` env var with fallback to `http://localhost:3000`

## 3. Write smoke tests

- [x] 3.1 Create `apps/ageorgedev-e2e/tests/smoke.spec.ts` with tests for `/`, `/resume`, and `/talks`
- [x] 3.2 Home page test: assert headings "Anish", "George", "Web Developer" are visible using `page.getByRole`
- [x] 3.3 Resume page test: navigate to `/resume` and assert page has visible content
- [x] 3.4 Talks page test: navigate to `/talks` and assert page has visible content

## 4. Update CI action

- [x] 4.1 Update `.github/actions/run-e2e/action.yml` description from "cypress" to "playwright"
- [x] 4.2 Replace `--baseUrl=$SITE_URL` CLI arg with `BASE_URL=$SITE_URL` env var in the run step
- [x] 4.3 Add a `playwright install --with-deps chromium` step before the test run step

## 5. Verify

- [x] 5.1 Run `yarn install` to update lockfile with new dependencies
- [x] 5.2 Add `passThroughEnv: ["BASE_URL"]` to `e2e` task in `turbo.json` (Turbo sandboxes env vars by default)
- [x] 5.3 Run `BASE_URL=https://ageorge.dev yarn turbo e2e --filter=@ageorgedev/ageorgedev-e2e` and confirm all three smoke tests pass
