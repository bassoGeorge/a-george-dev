## Context

The main site (`apps/ageorgedev`) has a dedicated Playwright e2e app at `apps/ageorgedev-e2e` that runs against Vercel preview deployments via the shared `run-e2e` composite action. The `game-tools` app has no equivalent — routes can silently break on deploy without any signal.

The existing e2e pattern is intentionally lightweight: a separate app, `chromium`-only, no `webServer` config (CI drives it against a deployed `BASE_URL`, developers start dev servers manually). The CI orchestration lives in `.github/workflows/info.yml`, which builds a matrix of `{ vercel_project_name, e2e_project }` entries; the deploy workflow consumes that matrix and, when `e2e_project` is set, invokes the `run-e2e` action against the deployed URL.

## Goals / Non-Goals

**Goals:**
- Provide fast smoke coverage that game-tools boots and its main routes render.
- Reuse the existing CI plumbing (composite action, matrix pattern, `BASE_URL` env) with zero new infrastructure.
- Detect regressions on PR previews before merge, matching the ageorgedev flow.

**Non-Goals:**
- Deep functional testing of individual character sheets (stats, spellbooks, print layouts).
- Visual regression testing.
- Cross-browser coverage — chromium-only mirrors the existing standard.
- Testing every character sheet; one representative sheet (Claw) suffices for smoke.

## Decisions

**Separate `apps/game-tools-e2e` app (not colocated in `apps/game-tools`).**
Matches the ageorgedev convention exactly. Colocation would require entangling Playwright deps with the app's runtime deps and complicate the CI matrix (the matrix keys off e2e project name). Alternative rejected: colocation adds inconsistency for no gain.

**Chromium-only, no `webServer` config.**
Mirrors `apps/ageorgedev-e2e/playwright.config.ts`. CI always targets a deployed `BASE_URL`; the composite action handles browser install. A `webServer` block would slow local runs and diverge from the existing pattern. Alternative rejected: adding `webServer` for developer convenience — the `yarn turbo dev` step is already the standard local workflow.

**Default `BASE_URL` to `http://localhost:3001`.**
Game-tools runs on port 3001 (per `CLAUDE.md` and app config). Matches the "default to local dev port" pattern from `apps/ageorgedev-e2e`.

**Content-based assertions, not `body not empty`.**
The ageorgedev smoke suite uses specific heading matches for the home page and looser `body not empty` for less-critical pages. For game-tools, the character sheets *are* the main feature — a blank render that returns HTTP 200 would falsely pass a `body not empty` check. Assert on visible headings/names (`"Game Tools"`, `"Characters"`, `"Claw"`) so a broken data pipeline still fails the test.

**Test one character (Claw), not all four.**
Smoke = "does it boot," not "is every character correct." Per-character validation, if wanted later, belongs in a separate spec file (mirroring how `talks.spec.ts` extends `smoke.spec.ts` for the talks section).

**CI wiring in `info.yml`: extend the game-tools matrix entries with `e2e_project`, and treat `@ageorgedev/game-tools-e2e` as an affected trigger for the game-tools preview.**
Direct parallel to the ageorgedev wiring — same shape, same guard. When only the e2e app changes, still deploy the game-tools preview so the tests have something to hit.

## Risks / Trade-offs

- **[Flaky character-name assertion if Claw's route is renamed]** → Mitigation: assert on the character name text (`"Claw"`) which is stable content, not the route path alone. If Claw is ever removed, swap to another character in one line.
- **[Local dev requires manually starting `game-tools` on port 3001]** → Mitigation: document in the new app's absent-by-design (matches the ageorgedev-e2e pattern developers already know). Not a regression.
- **[CI cost: extra chromium install + preview deploy on every game-tools PR]** → Mitigation: chromium install is already cached in the composite action; the game-tools preview already deploys on affected PRs — this only *adds* the e2e run, not a new deploy.
- **[Smoke test could pass while a specific character sheet is broken]** → Accepted trade-off: this is smoke, not functional. Broadening coverage later is a separate change.

## Migration Plan

No migration needed — additive change. Rollout:

1. Land `apps/game-tools-e2e/` with tests.
2. Update `.github/workflows/info.yml` in the same PR.
3. The PR's own CI run will exercise the new wiring end-to-end (game-tools preview deploy → e2e run against it).

Rollback: revert the PR. No data or runtime state involved.
