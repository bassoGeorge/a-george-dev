## 1. Fix PR Workflow

- [x] 1.1 Add `if: needs.Info.outputs.pr_deploy_matrix != '[]'` condition to the `Deploy` job in `.github/workflows/pull-request.yml`

## 2. Fix Production Workflow

- [x] 2.1 Add `if: needs.Info.outputs.production_deploy_matrix != '[]'` condition to the `Deploy` job in `.github/workflows/production.yml`

## 3. Verify

- [x] 3.1 Confirm a PR that touches only non-deployable packages (e.g., `packages/toolbelt`) shows `Deploy` as `skipped` rather than `failed`
