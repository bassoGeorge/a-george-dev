## Why

The GitHub Actions workflows have accumulated duplicated job definitions and a fragile `is_hotfix` conditional that bypasses tests for direct-to-main pushes. Removing the bypass and replacing hardcoded per-project jobs with matrix strategies will reduce duplication and make the pipeline easier to extend when new deployable apps are added.

## What Changes

- **Remove `is_hotfix`**: The production workflow no longer detects whether a push bypassed a PR. Tests always run on every production push.
- **Remove dead outputs from Info**: `is_hotfix`, `affected_base`, `affected_head`, and `should_preview_site` outputs are removed from `info.yml`.
- **Matrix-driven deploys in `production.yml`**: The four hardcoded deploy jobs (`Deploy_Hotfix_Site`, `Deploy_Hotfix_Design_System`, `Deploy_Site`, `Deploy_Design_System`) are replaced with one matrix job driven by a `production_deploy_matrix` output from Info.
- **Matrix-driven deploys in `pull-request.yml`**: The two hardcoded deploy jobs (`Site_Preview`, `Design_System_Preview`) and their two downstream comment jobs (`Save_Site_Preview_URL`, `Save_Design_System_Preview_URL`) are replaced with one matrix job.
- **PR comment posting moves into `deploy-vercel-project.yml`**: An optional `pull_request_number` input is added; when provided, the reusable workflow posts the preview URL comment itself.
- **Info computes two deploy matrices**: `pr_deploy_matrix` (broader — includes site when `should_deploy_site || should_run_e2e`) and `production_deploy_matrix` (narrower — includes site only when `should_deploy_site`). Each matrix entry contains `vercel_project_name` (resolved from vars) and an optional `e2e_project`.

## Capabilities

### New Capabilities

- `ci-matrix-deploy`: Matrix-based deploy strategy for GitHub Actions — how projects are discovered, how matrices are structured, and the contract between Info outputs and deploy jobs.

### Modified Capabilities

<!-- none -->

## Impact

- `.github/workflows/info.yml` — remove `is_hotfix` step and four outputs; add matrix computation steps and two new matrix outputs
- `.github/workflows/production.yml` — replace four deploy jobs with one matrix job; remove `Run_Tests` conditional
- `.github/workflows/pull-request.yml` — replace two deploy jobs and two comment jobs with one matrix job
- `.github/workflows/deploy-vercel-project.yml` — add optional `pull_request_number` input and conditional comment step
