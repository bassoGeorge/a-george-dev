## Context

AGE-28 established coverage measurement in this monorepo: a v8 provider configured at the root `vitest.config.ts`, an explicitly enumerated `coverage.include` list, and a global 93% floor on `lines` and `statements`. `tests.yml` runs `yarn test:coverage` and uploads `coverage/lcov.info` as a `coverage-lcov` artifact.

That artifact has no reader. Coverage today is a pass/fail bit: the job is green or it is red, and finding out *which* file moved the number means opening the workflow log. This change adds the missing consumer.

Relevant constraints in the existing workflows:

- `tests.yml` is a `workflow_call` reusable workflow, invoked by both `pull-request.yml` and `production.yml`. Anything pull-request-specific added to it becomes dead weight on the production path.
- Reusable workflows cannot grant themselves permissions beyond what the caller job provides, so `pull-requests: write` on the test job would have to be granted in `pull-request.yml` — and would then need conditionalising to avoid also applying on `production.yml`'s call.
- `pull-request.yml` already has a `Finish` job that posts a marker-tracked "Preview deployments" comment. It is gated on `needs.Deploy.result != 'skipped'`.
- `/coverage` is gitignored.

## Goals / Non-Goals

**Goals:**

- Surface the coverage summary and the changed-file breakdown on the pull request itself.
- Keep the 93% threshold defined in exactly one place — `vitest.config.ts` — and have the comment read it from there.
- Keep `tests.yml` event-agnostic and reusable by `production.yml` with no change.
- Confine `pull-requests: write` to a job that only downloads an artifact and posts a comment.
- Still comment when the coverage gate fails, since that is when the breakdown matters most.

**Non-Goals:**

- No delta against `main`. That would require either a second coverage run on the base commit or a stored artifact from the Production workflow, plus a chicken-and-egg first run. Deliberately deferred.
- No change to what the gate enforces. Thresholds, `include`, and `exclude` are untouched; this change is purely about reporting.
- No new tests and no production code.
- No external coverage service (Codecov, SonarQube, Coveralls). The comment is generated in-workflow from files the run already produces.
- No merging of coverage into the existing preview-deployment comment.

## Decisions

### The comment runs as its own job in `pull-request.yml`

Three placements were considered.

*A step inside `tests.yml`, guarded by `if: github.event_name == 'pull_request'`.* The coverage files are already on disk, so no artifact round-trip is needed. Rejected because it puts event-sniffing into a workflow whose whole value is being event-agnostic, and because it forces the write permission onto the test job at the caller.

*Folded into the existing `Finish` job.* That job already holds `pull-requests: write`. Rejected outright: it is gated on a deployment having happened, so a package-only or docs-only PR would silently get no coverage comment — a failure mode that is invisible precisely when nobody is looking.

*A new `Coverage_Comment` job.* Chosen. `tests.yml` stays a pure test workflow, the elevated token is scoped to a job with a tiny surface, and there is no gate coupling it to deployments. The cost is a second runner doing checkout + download + comment — no dependency install, so on the order of tens of seconds.

### The artifact carries the two JSON reports, not lcov

The action requires `coverage-summary.json` for headline metrics, and `coverage-final.json` for the per-file table under `file-coverage-mode: changes`. `lcov.info` is required by neither and read by nothing in this repository.

Rather than adding two files alongside a third nobody uses, the artifact is replaced: `coverage-report`, containing exactly the two JSON files, and `lcov` is dropped from the reporter array. A dead reporter in the config invites the "what reads this?" question at every future review, and re-adding it is a one-line change if a consumer appears.

`upload-artifact` strips the least common ancestor of the matched paths, so the artifact holds the two JSON files at its root rather than under `coverage/`. The consumer therefore downloads with `path: coverage`, which puts them exactly where the action's default path inputs look. No path inputs on the action itself need setting.

### Reporters are added to `vitest.config.ts`, not passed as CLI flags in CI

The alternative was keeping the config lean and adding `--coverage.reporter=...` in the CI invocation. Vitest's CLI `--coverage.reporter` *replaces* the configured array rather than appending to it, so CI would have to re-list every reporter — a second source of truth guaranteed to drift from the config. Adding them to the config means local and CI runs produce identical output, at the cost of two extra files in an already-gitignored directory.

### The action reads the threshold from the config

Passing `vite-config-path: vitest.config.ts` lets the action read `coverage.thresholds` and render each metric with a pass/fail marker. The alternative — restating `93` as a workflow input — creates a second copy of the floor that will eventually disagree with the config. The comment being self-explaining is a bonus; the single source of truth is the reason.

### `always()` on both the comment job and the artifact upload

A sub-threshold run makes `yarn test:coverage` exit non-zero, failing the test job. A plain `needs: [Run_Tests]` job would then be skipped, removing the comment exactly when it explains the most.

Both the upload step in `tests.yml` and the comment job in `pull-request.yml` are therefore conditioned on `always()`. Vitest writes its reporters before exiting on a threshold breach, so the data exists. This does not soften the gate: the test job stays red and remains the enforcing signal.

### Fork pull requests are guarded out

A fork PR gets a read-only `GITHUB_TOKEN`; the comment call 403s and the job fails permanently. The job is guarded with a head-repo check, composed with the `always()` condition.

`pull_request_target` would grant a write token and make it work, and is rejected: it runs workflow code with a privileged token in the context of a PR authored by an outside contributor, which is a well-documented privilege-escalation footgun. This is a personal monorepo with no fork PRs today, so the guard is cheap insurance against a confusing failure rather than a live problem.

### Two comments, not one

The action posts and updates its own marker-tracked comment. Merging coverage into the existing preview comment would mean reimplementing the action's rendering inside `github-script` and forgoing upstream improvements. `merge-pull-request.yml` cleans up preview comments on PR close and will not touch the coverage comment — acceptable, since the comment's lifetime is the PR's.

### Spec split

The reporter configuration and the CI artifact are properties of *how coverage is measured and published*, and stay in `unit-test-coverage` as a delta. The comment is a *consumer* of that artifact and becomes its own capability, `pr-coverage-comment` — named in parallel with the existing `consolidated-pr-deploy-comment`. Keeping the producer requirements together means a future second consumer (a badge, a dashboard) does not have to reach into `pr-coverage-comment` to learn what CI emits. The new spec references the artifact rather than defining it, and says so explicitly.

The artifact rename is expressed as REMOVED + ADDED rather than MODIFIED, because the requirement's name itself ("uploads lcov as an artifact") no longer describes it.

## Risks / Trade-offs

**The action is a third-party dependency with a write-scoped token** → Pinned to a major version tag, consistent with how `actions/*` are pinned here. It is a widely used action, and its job holds only `pull-requests: write` — no contents write, no secrets. A stricter SHA pin is available if the risk appetite changes.

**Dropping `lcov` breaks any future consumer that expects it** → Nothing reads it today. Re-adding it is one array entry, and the spec explicitly notes it may be re-added if a consumer is introduced.

**`always()` could post a comment from a run whose coverage data is stale or partial** → The distinction that matters is threshold-failure (reporters written, data valid) versus crash (no artifact). In the crash case the download finds nothing and the job fails, which is the intended outcome — no comment is better than a comment implying zero coverage.

**A second runner adds wall-clock time to every PR** → It runs in parallel with the deploy matrix and skips dependency installation, so it is not on the critical path.

**`file-coverage-mode: changes` needs git context to diff against the base** → The job checks out the repo. If the default fetch depth turns out to be insufficient for the diff, the fix is `fetch-depth: 0`, as `tests.yml` and `info.yml` already use. This is the one detail to verify against a real PR rather than assume.

## Migration Plan

1. Add `json-summary` and `json` to the reporter array and remove `lcov`. Run `yarn test:coverage` locally and confirm both JSON files appear and `lcov.info` does not.
2. Change the upload step in `tests.yml` to the two JSON paths, rename the artifact to `coverage-report`, and add `if: always()`.
3. Add the `Coverage_Comment` job to `pull-request.yml`.
4. Verify on a real pull request: comment posted, threshold markers rendered, changed-file table correct.
5. Verify the failure path by temporarily raising the threshold above the achieved figure — the job must go red *and* the comment must still post. Restore afterwards. An unverified `always()` is not a guarantee.

Rollback is deleting the job and reverting the reporter array; nothing else depends on either.

## Open Questions

None blocking. The single item to confirm empirically during implementation is whether the default checkout depth gives `file-coverage-mode: changes` enough history to diff against the base branch, or whether `fetch-depth: 0` is required.
