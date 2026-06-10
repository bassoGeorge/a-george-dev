## Why

When no deployable projects are affected by a PR or push to main, the `Deploy` job in `pull-request.yml` and `production.yml` fails because GitHub Actions does not allow a `strategy.matrix` with an empty array. This causes the pipeline to be marked as failed even when there is nothing wrong with the change.

## What Changes

- Add an `if` condition to the `Deploy` job in `pull-request.yml` that skips the job when `pr_deploy_matrix` is an empty array
- Add an `if` condition to the `Deploy` job in `production.yml` that skips the job when `production_deploy_matrix` is an empty array

## Capabilities

### New Capabilities

- `graceful-empty-matrix`: CI deploy jobs skip gracefully when no projects are affected, instead of failing with an empty matrix error

### Modified Capabilities

- None

## Impact

- `.github/workflows/pull-request.yml` — `Deploy` job gains a guard condition
- `.github/workflows/production.yml` — `Deploy` job gains a guard condition
- No changes to application code, dependencies, or APIs
