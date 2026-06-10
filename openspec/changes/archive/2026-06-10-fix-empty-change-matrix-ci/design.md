## Context

GitHub Actions `strategy.matrix` requires at least one value. When `pr_deploy_matrix` or `production_deploy_matrix` outputs an empty JSON array `[]`, the `Deploy` job errors with "Matrix must define at least one vector." This happens whenever a PR only touches files that don't map to a deployable Vercel project (e.g., toolbelt changes, config-only changes).

The `Info` workflow correctly computes an empty array in these cases — the problem is purely in how the consuming `Deploy` job handles the result.

## Goals / Non-Goals

**Goals:**
- Deploy job exits cleanly (skipped, not failed) when the matrix is empty
- Both `pull-request.yml` and `production.yml` are fixed
- No change to behavior when the matrix has one or more entries

**Non-Goals:**
- Changing how the matrix is computed in `info.yml`
- Adding new deploy targets or changing deploy logic

## Decisions

### Use an `if` condition on the Deploy job

Add `if: needs.Info.outputs.<matrix_output> != '[]'` to the `Deploy` job in both workflows.

**Why this over alternatives:**
- **Fallback include entry**: Adding a dummy entry to prevent an empty matrix is a workaround that would attempt a meaningless deploy step. Worse, it requires adding branch logic inside `deploy-vercel-project.yml`.
- **JSON length check in jq**: Pre-filtering in `info.yml` to emit `null` instead of `[]` would break the `fromJSON` call downstream. A sentinel value adds complexity.
- **`if` condition on the job**: Clean, declarative, no side effects. GitHub Actions skips the entire job — including the matrix expansion — when the condition is false. This is the idiomatic solution for conditional matrix jobs.

## Risks / Trade-offs

- **Required status checks**: If `Deploy` is configured as a required status check in branch protection rules, skipping it (status: `skipped`) still satisfies the check — GitHub treats skipped jobs as passing for required checks. No action needed, but worth verifying in repo settings.
  → Mitigation: No code change needed; verify branch protection settings after deploy.

## Migration Plan

1. Add `if` condition to `Deploy` in `pull-request.yml`
2. Add `if` condition to `Deploy` in `production.yml`
3. Merge — next PR with no affected deploy targets will show `Deploy` as skipped rather than failed
