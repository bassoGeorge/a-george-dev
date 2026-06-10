## Context

`apps/ageorgedev-e2e` contains a Cypress setup that was never fully functional — the `e2e` script is stubbed with `echo 'skipping e2e'`. The CI pipeline already has the wiring to run e2e tests post-deploy via `.github/actions/run-e2e`, which passes a `--baseUrl` flag (a Cypress-specific CLI option).

The main site (`apps/ageorgedev`) runs on port 3000 locally. In CI, Vercel deploys a preview or production URL before e2e runs.

## Goals / Non-Goals

**Goals:**
- Replace Cypress with Playwright, producing a working `yarn e2e` command
- Cover three smoke test routes: `/`, `/resume`, `/talks`
- Work locally against a running dev server (no auto-start)
- Work in CI against a deployed Vercel URL via `BASE_URL` env var
- Update the `run-e2e` GitHub Action to pass `BASE_URL` instead of `--baseUrl`

**Non-Goals:**
- Full integration test coverage or user-flow testing
- Visual regression testing
- Playwright component testing
- Auto-starting the dev server in any environment

## Decisions

### Playwright with no `webServer` config
Rationale: CI runs against an already-deployed URL, and local dev assumes the server is running. A `webServer` config would only help local cold starts — adding complexity with no CI benefit. Keeping it simple: `baseURL` is always supplied externally.

### `BASE_URL` env var (not CLI flag)
Playwright reads `baseURL` from config, not a `--baseUrl` CLI arg. The `run-e2e` action currently passes `--baseUrl=$SITE_URL` to Cypress. We update the action to `BASE_URL=$SITE_URL` as an env var, and `playwright.config.ts` reads `process.env.BASE_URL ?? 'http://localhost:3000'`.

**Alternative considered**: keep `--baseUrl` via Playwright's `--config` override — rejected because Playwright doesn't support that flag and env vars are idiomatic for Playwright config.

### Native Playwright locators (no `@testing-library`)
`page.getByRole()` provides the same ARIA semantics as `@testing-library/cypress` with zero extra dependencies. Removes `@testing-library/cypress` and keeps the package lean.

### Full gut of existing Cypress files
All Cypress config, support files, fixtures, and the `cypress.config.ts` are deleted. Nothing is worth preserving — the support files are boilerplate and the remix-fixes shim is irrelevant to Playwright.

### Pinned dependency versions
`@playwright/test` version pinned exactly (no `^`) to avoid silent upgrades breaking CI. Browser binaries are installed via `npx playwright install` as part of CI setup.

## Risks / Trade-offs

- **Playwright browser install in CI** → The `run-e2e` action will need a `playwright install` step before running tests. Adds ~30s to CI but is unavoidable.
- **No retry / flake protection configured** → Smoke tests are simple enough that flakiness is unlikely; can add `retries: 1` later if needed.
- **`BASE_URL` not set locally = tests hit localhost:3000** → If dev server isn't running, tests fail with a connection error rather than a helpful message. Acceptable trade-off for simplicity.
