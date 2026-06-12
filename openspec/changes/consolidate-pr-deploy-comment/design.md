## Context

`pull-request.yml` fans out a matrix `Deploy` job over `pr_deploy_matrix` (up to 2 projects: `ageorgedev` and `design-docs`). Each matrix job calls the reusable `deploy-vercel-project.yml`, which currently posts its own individual PR comment at the end. This produces one comment per project per run, and re-runs pile up more comments.

The fix: strip the comment step from the reusable workflow, have each matrix job upload a tiny artifact instead, then let a new `Finish` job collect them all and post one consolidated, find-and-replaced comment.

## Goals / Non-Goals

**Goals:**
- One PR comment per workflow run, updated in-place on re-runs
- Comment lists all deployed preview URLs labelled by project name
- No race conditions between parallel matrix jobs
- No meaningful GitHub Actions storage growth

**Non-Goals:**
- Changing deploy behaviour, e2e test execution, or production promotion logic
- Supporting workflows other than `pull-request.yml`
- Surfacing per-job failure details in the comment (partial success is fine to show)

## Decisions

### 1. Artifact relay for matrix output collection

**Decision:** Each matrix job uploads a JSON artifact (`deploy-url-<project>.json`) containing `{ project, url }`. The `Finish` job downloads all artifacts matching the `deploy-url-*` name pattern, reads them, and builds the comment.

**Alternatives considered:**
- `needs.Deploy.outputs.deploy_url` — GitHub collapses all matrix outputs to the same key; only the last job's value survives. Unreliable.
- Append-to-comment per job — parallel jobs race on read-modify-write; one job's update clobbers the other's.
- GitHub Deployments API re-query — adds Vercel-specific complexity and a second API surface to maintain.

**Rationale:** Artifacts are the idiomatic GitHub Actions solution for fan-in from matrix jobs. Files are tiny (< 100 bytes each); retention can be tuned later if desired.

### 2. Find-and-replace comment via `peter-evans/find-or-create-comment`

**Decision:** Use the `peter-evans/find-or-create-comment` action (or equivalent `github-script` logic) with a hidden marker string in the comment body to locate and update the existing bot comment rather than creating a new one.

**Alternatives considered:**
- Always create new comment — spams the PR thread on re-runs.
- Delete-then-create — brief gap where the comment disappears; also requires listing comments first.

**Rationale:** Find-or-create is the standard pattern for bot comments; the hidden marker (e.g. `<!-- pr-deploy-urls -->`) makes the lookup reliable without querying comment authors.

### 3. Remove `pull_request_number` input from `deploy-vercel-project.yml`

**Decision:** Drop the `pull_request_number` input entirely from the reusable workflow since nothing inside it needs it anymore.

**Rationale:** Dead input adds noise. The reusable workflow is only called from `pull-request.yml` and `production.yml`; production never passed this input.

### 4. Comment format

```markdown
<!-- pr-deploy-urls -->
## Preview deployments

- **ageorge.dev**: https://...
- **Design System**: https://...
```

Project name mapping is derived from `matrix.project.vercel_project_name` matched against known `vars.VERCEL_PROJECT_*` values, or alternatively the `pr_deploy_matrix` can include a `label` field computed in `info.yml`.

**Decision:** Add a `label` field to the matrix entries in `info.yml` (e.g. `"ageorge.dev"`, `"Design System"`) so the finish job doesn't need to reverse-map Vercel project names.

## Risks / Trade-offs

- [Artifact download flakiness] The `download-artifact` action occasionally retries on transient errors → mitigated by GitHub's built-in retry behaviour; low risk for a personal repo
- [Finish job runs even if all deploys fail] `needs: [Deploy]` with no `if` guard means the finish job runs and posts a comment with zero URLs → mitigation: add `if: always() && needs.Deploy.result != 'skipped'` and handle empty artifact list gracefully (skip posting or post a "no previews" message)
- [Artifact name collision across concurrent runs] Two open PRs running simultaneously use the same artifact names → mitigated by scoping artifact names with the run ID: `deploy-url-${{ github.run_id }}-<project>`

## Migration Plan

1. Update `info.yml` to add `label` to matrix entries
2. Update `deploy-vercel-project.yml`: remove `pull_request_number` input and the comment step; add artifact upload step
3. Update `pull-request.yml`: remove `pull_request_number` from `Deploy` job inputs; add `Finish` job
4. Open a test PR affecting both projects to verify the consolidated comment appears and updates correctly on re-run

Rollback: revert the three workflow file changes — no infrastructure state to undo.
