## MODIFIED Requirements

### Requirement: Coverage report is written to a single directory
The root Vitest coverage configuration SHALL emit `text`, `html`, `json-summary`, and `json` reporters to `coverage/` at the repo root.

- The `text` reporter output SHALL be printed to stdout during the run.
- The `html` reporter SHALL produce `coverage/index.html`.
- The `json-summary` reporter SHALL produce `coverage/coverage-summary.json`, containing the aggregate and per-file totals that a coverage reporting action consumes for its headline metrics.
- The `json` reporter SHALL produce `coverage/coverage-final.json`, containing per-file statement, branch, and function maps, required to render a per-file table.

The `lcov` reporter SHALL NOT be configured. No consumer in this repository reads `lcov.info`; it may be re-added if one is introduced.

The `coverage/` directory SHALL remain gitignored, so that adding reporters does not change what is committed.

#### Scenario: Local run produces browsable HTML report
- **WHEN** `yarn test:coverage` completes successfully at the monorepo root
- **THEN** `coverage/index.html` exists and, when opened, renders a coverage summary that lists files from every project

#### Scenario: Local run produces the JSON summary
- **WHEN** `yarn test:coverage` completes successfully at the monorepo root
- **THEN** `coverage/coverage-summary.json` exists and contains a `total` object with `lines`, `statements`, `branches`, and `functions` entries

#### Scenario: Local run produces the per-file JSON report
- **WHEN** `yarn test:coverage` completes successfully at the monorepo root
- **THEN** `coverage/coverage-final.json` exists and contains an entry for each file matched by `coverage.include`

#### Scenario: No lcov file is produced
- **WHEN** `yarn test:coverage` completes successfully at the monorepo root
- **THEN** `coverage/lcov.info` is not written

#### Scenario: Coverage output stays untracked
- **WHEN** `yarn test:coverage` completes and `git status` is run at the repo root
- **THEN** no file under `coverage/` appears as an untracked or modified change

## REMOVED Requirements

### Requirement: CI runs coverage and uploads lcov as an artifact
**Reason**: The artifact's name and contents both change, so the requirement is replaced rather than edited. `lcov.info` has no consumer in this repository, and the new PR coverage comment needs the two JSON reports instead. The upload also becomes unconditional so that a run failing the coverage threshold still publishes the data that explains the failure.

**Migration**: Replaced by "CI runs coverage and uploads a coverage report artifact" below. Any workflow or tooling downloading the `coverage-lcov` artifact must switch to `coverage-report` and read `coverage-summary.json` / `coverage-final.json` rather than `lcov.info`. No such consumer exists at the time of this change.

## ADDED Requirements

### Requirement: CI runs coverage and uploads a coverage report artifact
`.github/workflows/tests.yml` SHALL execute the full unit-test suite with coverage enabled (via `yarn test:coverage` or an equivalent invocation) and SHALL upload `coverage/coverage-summary.json` and `coverage/coverage-final.json` as a single workflow artifact named `coverage-report`.

The upload step SHALL be conditioned on `always()`, so that a run failing the configured coverage threshold still produces the artifact. A coverage-threshold failure is exactly the case where the report is most needed, and Vitest writes its reporters before exiting non-zero on a threshold breach.

The artifact SHALL preserve the `coverage/` directory prefix, so that a consumer downloading it into the workspace root finds the files at the paths the coverage tooling expects by default.

`tests.yml` SHALL remain event-agnostic: it SHALL NOT branch on `github.event_name`, and SHALL behave identically when called from `pull-request.yml` and from `production.yml`.

#### Scenario: CI job produces a coverage artifact on success
- **WHEN** the `tests.yml` reusable workflow runs and the unit-test suite passes with coverage at or above the threshold
- **THEN** a `coverage-report` artifact is uploaded containing `coverage/coverage-summary.json` and `coverage/coverage-final.json`

#### Scenario: CI job produces a coverage artifact when the threshold fails
- **WHEN** the `tests.yml` reusable workflow runs and `yarn test:coverage` exits non-zero because coverage fell below the configured threshold
- **THEN** the job is marked failed
- **AND** the `coverage-report` artifact is still uploaded with both JSON files

#### Scenario: The same workflow serves both callers
- **WHEN** `production.yml` calls the `tests.yml` reusable workflow on a push to `main`
- **THEN** the same test command and the same artifact upload run, with no pull-request-specific branch

#### Scenario: PR workflow no longer passes `--affected` to tests
- **WHEN** `pull-request.yml` calls the `tests.yml` reusable workflow
- **THEN** it does not pass a `command_arg: --affected` input, and the tests job runs the full unit-test suite regardless of which packages changed
