## Why

`yarn test:coverage` already runs on every pull request and enforces a 93% floor, but the result is invisible unless you open the workflow log or download an artifact nobody reads. A PR that drops coverage shows a red X with no indication of which files caused it, and a PR that adds well-tested code gets no acknowledgement at all. Publishing the summary as a PR comment puts the number where the review happens.

## What Changes

- Add `json-summary` and `json` to the root `vitest.config.ts` coverage reporters. The action requires `json-summary` for the headline metrics and `json` for the per-file table.
- **BREAKING (CI artifact contract only):** remove `lcov` from the reporters and replace the `coverage-lcov` artifact with `coverage-report`, containing `coverage-summary.json` and `coverage-final.json`. `lcov.info` has no consumer in this repo today; it is re-addable in one line if one appears.
- Upload the coverage artifact with `if: always()`, so a run that fails the 93% threshold still publishes the data explaining why.
- Add a `Coverage_Comment` job to `pull-request.yml` that downloads the artifact and runs `davelosert/vitest-coverage-report-action`. The job:
  - is scoped to pull requests only, so `tests.yml` stays event-agnostic and usable unchanged by `production.yml`
  - holds `pull-requests: write` in isolation, rather than granting it to the whole test job
  - runs `if: always()` so the comment appears on threshold failures
  - is guarded against fork PRs, whose read-only token cannot post a comment
  - passes `vite-config-path` so the comment renders each metric against the 93% floor, keeping the threshold defined in exactly one place
  - uses `file-coverage-mode: changes`, listing only the files the PR touched
- No base-branch delta. The comment reports current coverage against the configured threshold, not a diff against `main`.

## Capabilities

### New Capabilities
- `pr-coverage-comment`: A GitHub Actions job that publishes the unit-test coverage summary as a comment on the pull request, including per-file figures for changed files and pass/fail markers against the configured threshold. Covers job placement, permission scope, fork handling, and behaviour when the coverage gate fails.

### Modified Capabilities
- `unit-test-coverage`: the set of coverage reporters changes (`json-summary` and `json` added, `lcov` removed), the requirement that the `lcov` reporter produce `coverage/lcov.info` is removed, and the CI artifact requirement changes from a `coverage-lcov` artifact holding `lcov.info` to a `coverage-report` artifact holding the two JSON files, uploaded unconditionally.

## Impact

- `vitest.config.ts` — `coverage.reporter` array only. Thresholds, `include`, and `exclude` are untouched.
- `.github/workflows/tests.yml` — the upload step's name, path, and condition.
- `.github/workflows/pull-request.yml` — one new job.
- New third-party action dependency: `davelosert/vitest-coverage-report-action`, pinned to a major version tag consistent with how the repo pins `actions/*`.
- No production code, no test code, and no change to what the coverage gate enforces. `production.yml` is unaffected: it calls `tests.yml`, which still runs the same command and gate.
- `merge-pull-request.yml` cleans up preview-deploy comments on PR close and does not touch the coverage comment. That is intended; the comment's lifetime is the PR's.
