## Why

The e2e package is currently stubbed out (`echo 'skipping e2e'`) because Cypress was never fully wired up. Playwright is lighter, faster, and has native ARIA locators — replacing Cypress now unblocks a working smoke test suite with minimal investment.

## What Changes

- Remove all Cypress dependencies, config, support files, and fixtures from `apps/ageorgedev-e2e`
- Replace with Playwright (`@playwright/test`) and a single smoke test spec
- Smoke tests cover three routes: home (`/`), resume (`/resume`), talks (`/talks`) — each asserting the page renders key content
- `BASE_URL` env var drives the target host; defaults to `http://localhost:3000` locally
- Update `.github/actions/run-e2e/action.yml` to pass `BASE_URL` instead of Cypress `--baseUrl` flag
- All added dependency versions pinned

## Capabilities

### New Capabilities

- `smoke-tests`: Playwright-based smoke tests covering home, resume, and talks routes — verifying each page renders without errors

### Modified Capabilities

_(none — no existing specs)_

## Impact

- `apps/ageorgedev-e2e`: full replacement of Cypress with Playwright
- `.github/actions/run-e2e/action.yml`: updated to set `BASE_URL` env var instead of passing `--baseUrl` CLI arg
- `turbo.json`: no changes needed — `e2e` task already exists with `cache: false`
- CI pipeline behaviour unchanged: deploy → run e2e against deployed URL → promote
