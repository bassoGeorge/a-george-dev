## Why

The `game-tools` app has no automated verification that its routes render on deployed previews. The main site is covered by `@ageorgedev/ageorgedev-e2e` smoke tests wired into the PR + production deploy pipelines, but game-tools regressions (broken routes, blank pages, missing character data) currently go undetected until a manual click-through. As the character catalog grows, a smoke-level safety net is cheap insurance.

## What Changes

- Add a new `apps/game-tools-e2e` Playwright app mirroring the structure of `apps/ageorgedev-e2e`.
- Add smoke tests covering the game-tools home page (`/`), the character list (`/dnd/characters`), and a representative character sheet (`/dnd/characters/claw`).
- Default `BASE_URL` to `http://localhost:3001` (the game-tools dev port), overridable via env for CI runs against Vercel preview URLs.
- Wire the new e2e app into `.github/workflows/info.yml` so it runs against game-tools preview deploys on PRs and production deploys on `main`.

## Capabilities

### New Capabilities
- `game-tools-smoke-tests`: End-to-end smoke tests for the game-tools app that verify key routes render on a configurable base URL, executed against Vercel preview and production deployments via the shared CI matrix.

### Modified Capabilities
- `ci-matrix-deploy`: The PR and production deploy matrices SHALL associate `@ageorgedev/game-tools-e2e` with the game-tools Vercel project, and SHALL treat changes to `@ageorgedev/game-tools-e2e` itself as an affected trigger for that project (mirroring the ageorgedev-e2e wiring).

## Impact

- **New app**: `apps/game-tools-e2e/` (`package.json`, `playwright.config.ts`, `tsconfig.json`, `tests/smoke.spec.ts`).
- **CI**: `.github/workflows/info.yml` PR + production matrix blocks updated to include the new e2e project.
- **Dependencies**: Adds `@playwright/test@1.60.0` to the new workspace (already in use by ageorgedev-e2e — no version drift).
- **No runtime changes** to the game-tools app itself.
- **Local dev**: developers running the smoke tests locally must start `yarn turbo dev --filter=@ageorgedev/game-tools` first (matches existing pattern).
