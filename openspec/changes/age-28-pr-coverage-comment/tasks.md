## 1. Commit 1 — coverage reporters

- [x] 1.1 In root `vitest.config.ts`, change `coverage.reporter` to `['text', 'html', 'json-summary', 'json']` — adding `json-summary` and `json`, removing `lcov`
- [x] 1.2 Update the surrounding comment to record why `lcov` is gone (no consumer in this repo) and what each JSON reporter feeds
- [x] 1.3 Run `yarn test:coverage` and confirm it still exits 0 against the existing 93% floor
- [x] 1.4 Confirm `coverage/coverage-summary.json` exists and its `total` object carries `lines`, `statements`, `branches`, and `functions`
- [x] 1.5 Confirm `coverage/coverage-final.json` exists and contains an entry for a file matched by `coverage.include`
- [x] 1.6 Confirm `coverage/lcov.info` is no longer written (delete the stale local one first, then re-run — an existing file from a previous run would mask this)
- [x] 1.7 Confirm `coverage/index.html` still renders and `git status` is clean, i.e. no new coverage file escaped the gitignore
- [x] 1.8 Run `yarn format-and-lint:fix` at the repo root
- [x] 1.9 Commit the reporter change

## 2. Commit 2 — the CI artifact

- [x] 2.1 In `.github/workflows/tests.yml`, rename the upload step's artifact from `coverage-lcov` to `coverage-report`
- [x] 2.2 Change its `path` to the two JSON files — `coverage/coverage-summary.json` and `coverage/coverage-final.json` — as a multi-line path so the `coverage/` prefix is preserved in the artifact
- [x] 2.3 Add `if: always()` to the upload step so a threshold failure still publishes the report
- [x] 2.4 Confirm `tests.yml` contains no `github.event_name` branch and no new inputs — it must stay callable unchanged by `production.yml`
- [x] 2.5 Grep the repo for any remaining reference to `coverage-lcov` or `lcov.info` and remove or update it
- [x] 2.6 Commit the workflow change

## 3. Commit 3 — the comment job

- [x] 3.1 Add a `Coverage_Comment` job to `.github/workflows/pull-request.yml`, `needs: [Run_Tests]`
- [x] 3.2 Give it `permissions: pull-requests: write`, and confirm that permission is **not** added to `Run_Tests`
- [x] 3.3 Condition it on `always()` combined with a fork guard (`github.event.pull_request.head.repo.full_name == github.repository`)
- [x] 3.4 Confirm `pull-request.yml` is still triggered by `pull_request`, not `pull_request_target`
- [x] 3.5 Add `actions/checkout@v6` — needed for `vitest.config.ts` and for the changed-files diff. Do **not** add the `install-dependencies` action
- [x] 3.6 Add `actions/download-artifact@v7` for `coverage-report`, downloading into the workspace root so the files land at `coverage/*.json`
- [x] 3.7 Add the `davelosert/vitest-coverage-report-action` step, pinned to a major version tag matching how `actions/*` are pinned here, with `file-coverage-mode: changes` and `vite-config-path: vitest.config.ts`. Leave the coverage-file path inputs at their defaults
- [x] 3.8 Confirm no threshold value is hardcoded in the workflow — the floor must come only from `vitest.config.ts`
- [x] 3.9 Confirm the existing `Finish` preview-comment job is untouched
- [x] 3.10 Commit the comment job

## 4. Verification on a real pull request

- [ ] 4.1 Open the PR (see 5.1) and confirm a coverage comment is posted
- [ ] 4.2 Confirm the comment renders lines and statements against the 93% threshold with pass/fail markers
- [ ] 4.3 Confirm the per-file table lists only the files this PR changed, not every file in `coverage.include`
- [ ] 4.4 Push a second commit and confirm the existing comment is **updated in place** rather than a second one appearing
- [ ] 4.5 Confirm the coverage comment and the preview-deployment comment coexist as two separate comments
- [ ] 4.6 **Verify the `always()` path is real:** temporarily raise `lines` in `vitest.config.ts` above the achieved figure, push, and confirm `Run_Tests` goes **red** *and* the coverage comment still posts showing the failing metric. Then restore the real value and confirm green. An unverified `always()` is not a guarantee
- [x] 4.7 Resolve the one open question from design.md: whether the default checkout depth gives `file-coverage-mode: changes` enough history. **Resolved by source inspection, not trial:** `getPullChanges` calls `octokit.rest.pulls.listFiles` with the PR number, so changed files come from the GitHub API and no git history is required. `fetch-depth: 0` deliberately not set. If 4.3 still shows an empty table, this conclusion is wrong and `fetch-depth: 0` is the first thing to try
- [ ] 4.8 Confirm the Production workflow on `main` is unaffected — `tests.yml` runs as before and no comment job fires

## 5. Wrap-up

- [ ] 5.1 Open a PR titled per the repo's `write-commits` convention, referencing AGE-28 with a Linear magic word
- [ ] 5.2 In the PR description, note that the `coverage-lcov` artifact is replaced by `coverage-report` and that `lcov.info` is no longer produced
- [ ] 5.3 Record in this file the outcome of 4.6 — the `always()` verification — so the decision is not re-litigated later. 4.7 is already recorded above
