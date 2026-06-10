## Context

The repo has two primary CI workflows: `pull-request.yml` (runs on PR to main) and `production.yml` (runs on push to main). Both delegate to reusable workflows: `info.yml`, `tests.yml`, and `deploy-vercel-project.yml`.

Currently there are two deployable apps — the main site and the design-system Storybook — each hardcoded as a separate job in both workflow files. `production.yml` compounds this by duplicating each deploy job again for the `is_hotfix` path (commits that reached main without a PR), resulting in four deploy job definitions.

## Goals / Non-Goals

**Goals:**
- Remove `is_hotfix` detection and always run tests on production push
- Replace hardcoded per-app deploy jobs with a single matrix job in each workflow
- Extend `info.yml` to compute and output deploy matrices so callers stay declarative
- Move PR comment posting into `deploy-vercel-project.yml` to remove downstream comment jobs

**Non-Goals:**
- Changes to `merge-pull-request.yml` preview cleanup
- Changes to Vercel project setup or deployment mechanics
- Adding new deployable apps (this change makes it easier; it doesn't do it)

## Decisions

### 1. Always run tests on production push

Removing `is_hotfix` means tests always run before any production deploy. The bypass existed for speed during hotfixes, but it created risk — the most urgent deploys are exactly when you want test coverage. A test run adds ~1-2 min and is worth it unconditionally.

*Alternative considered*: Keep `is_hotfix` but default it to `false`. Rejected — it would preserve dead code and complexity without benefit.

### 2. Info job computes the deploy matrices

Info already runs `yarn affected:apps`, has access to `vars` context, and computes `should_deploy_site` / `should_deploy_design_system`. Computing the matrices there eliminates a separate intermediate job and keeps callers (production/PR workflows) purely declarative — they just consume `fromJSON(needs.Info.outputs.matrix)`.

Each matrix entry shape:
```json
{ "vercel_project_name": "<resolved-value>", "e2e_project": "<optional>" }
```

`vercel_project_name` is resolved from `vars` inside the Info step so callers don't need to map project identifiers to var names.

*Alternative considered*: Separate matrix-builder job after Info. Rejected — adds a job hop with no new information; Info already has everything needed.

### 3. Two separate matrices: `pr_deploy_matrix` and `production_deploy_matrix`

The PR workflow includes the site when `should_deploy_site || should_run_e2e` (to run e2e against a deployed preview even if only e2e tests changed). The production workflow only deploys the site when `should_deploy_site`. Using a single matrix would either over-deploy in production or under-deploy in PRs.

Named outputs make the intent explicit at the call site.

*Alternative considered*: One matrix with a boolean flag per entry, filtered differently by caller. Rejected — pushes conditional logic back into callers, defeating the purpose.

### 4. PR comment posting moves inside `deploy-vercel-project.yml`

The reusable workflow already has the deploy URL in scope. Adding an optional `pull_request_number` input lets it post the comment itself when called from a PR context. This removes two jobs (`Save_Site_Preview_URL`, `Save_Design_System_Preview_URL`) from `pull-request.yml` and keeps all deploy side-effects co-located.

Production calls omit `pull_request_number`; the comment step is skipped via `if: inputs.pull_request_number != ''`.

*Alternative considered*: Pass URL through matrix job output to a downstream comment job. Rejected — matrix job outputs are overwritten by each item; collecting multiple URLs requires artifact uploads, adding significant complexity.

## Risks / Trade-offs

- **Matrix JSON must be valid at all times** → Info step uses a shell script with `jq` to build the array conditionally; if both conditions are false, it outputs `[]` (empty array). GitHub Actions matrix with `[]` skips the job cleanly — this is expected behaviour.
- **`vars` context in Info** → Vars are available in all job contexts; resolving them in the Info step is safe. If a var is unset the matrix entry gets an empty string, which will fail at deploy time with a clear error rather than silently.
- **`pull_request_number` as string input** → GitHub Actions workflow inputs are strings. Pass `${{ github.event.pull_request.number }}` (auto-coerced); the `if` check uses `!= ''` to detect presence.

## Migration Plan

1. Update `info.yml`: remove `is_hotfix` step and dead outputs; add matrix computation step and two new outputs.
2. Update `deploy-vercel-project.yml`: add optional `pull_request_number` input and conditional comment step.
3. Update `production.yml`: remove all four deploy jobs and the conditional `Run_Tests`; add `Run_Tests` unconditionally and one matrix deploy job.
4. Update `pull-request.yml`: remove two deploy jobs and two comment jobs; add one matrix deploy job passing `pull_request_number`.

Each file change is independent and can be reviewed separately. No rollback strategy needed — reverting any file is a standard git revert.

## Open Questions

<!-- none -->
