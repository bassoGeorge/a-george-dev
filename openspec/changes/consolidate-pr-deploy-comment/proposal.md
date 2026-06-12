## Why

Currently each matrix deploy job posts its own individual PR comment, so a PR affecting both `ageorgedev` and `design-docs` gets two separate "Preview URL: ..." comments — and re-runs add more. Consolidating into a single found-and-replaced comment keeps the PR thread clean.

## What Changes

- Remove the "Post preview URL comment" step from `deploy-vercel-project.yml`
- Remove the `pull_request_number` input from `deploy-vercel-project.yml` (no longer needed)
- Each matrix `Deploy` job in `pull-request.yml` uploads a small JSON artifact (project name + URL)
- Add a `Finish` job to `pull-request.yml` that runs after all `Deploy` matrix jobs complete, downloads the artifacts, and posts a single consolidated comment (find-and-replace pattern) with all preview URLs labelled by project name

## Capabilities

### New Capabilities

- `consolidated-pr-deploy-comment`: A finishing job that collects all matrix deploy URLs via artifacts and posts one labelled, find-and-replaced PR comment after all deploys complete

### Modified Capabilities

- none

## Impact

- `.github/workflows/deploy-vercel-project.yml` — step removed, input removed
- `.github/workflows/pull-request.yml` — new `Finish` job added, `Deploy` matrix jobs updated to upload artifacts
