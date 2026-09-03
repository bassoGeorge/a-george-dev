## Purpose

Defines how unit-test coverage is measured across the monorepo: the coverage provider, which source files are included, where reports are written, and what CI publishes.
## Requirements
### Requirement: Coverage provider is `@vitest/coverage-v8`
The monorepo SHALL use `@vitest/coverage-v8` as the coverage provider, configured at the root `vitest.config.ts`. The dependency SHALL be installed at a location that makes it available to the root Vitest invocation (root devDependencies or `@ageorgedev/testing-config`).

#### Scenario: Coverage provider resolves at runtime
- **WHEN** `yarn test:coverage` is executed at the monorepo root
- **THEN** Vitest loads the `v8` coverage provider without a "coverage provider not found" error

### Requirement: Coverage output includes application and package source
The root Vitest coverage configuration SHALL include source files from `packages/*/src/**/*.{ts,tsx}`, `apps/ageorgedev/src/**/*.{ts,tsx}`, and `apps/game-tools/src/**/*.{ts,tsx}`. The globs SHALL be restricted to source extensions rather than matching all files under `src`, so that the v8 provider does not attempt to parse non-JavaScript content (`.mdx`, `.csv`) and emit parse errors. It SHALL exclude test files, `dist/**`, `node_modules/**`, `storybook-static/**`, generated data files, `apps/*-e2e/**`, and `apps/design-docs/**`.

#### Scenario: Untested but included source counts against coverage
- **WHEN** `yarn test:coverage` runs and a source file under `packages/*/src/` is not imported by any test
- **THEN** that file appears in the coverage report with 0% coverage rather than being omitted

#### Scenario: Non-source files do not produce parse errors
- **WHEN** `yarn test:coverage` runs and the repo contains `.mdx` and `.csv` files under an included `src` directory
- **THEN** the run completes without `Failed to parse` / `RolldownError` messages for those files

#### Scenario: Excluded directories do not appear in the report
- **WHEN** `yarn test:coverage` runs
- **THEN** files under `node_modules`, `dist`, `storybook-static`, `apps/*-e2e`, and `apps/design-docs` do not appear in the coverage report

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

### Requirement: CI runs coverage and uploads a coverage report artifact
`.github/workflows/tests.yml` SHALL execute the full unit-test suite with coverage enabled (via `yarn test:coverage` or an equivalent invocation) and SHALL upload `coverage/coverage-summary.json` and `coverage/coverage-final.json` as a single workflow artifact named `coverage-report`.

The upload step SHALL be conditioned on `always()`, so that a run failing the configured coverage threshold still produces the artifact. A coverage-threshold failure is exactly the case where the report is most needed, and Vitest writes its reporters before exiting non-zero on a threshold breach.

`upload-artifact` strips the least common ancestor of the uploaded paths, so the artifact SHALL contain the two JSON files at its root rather than under a `coverage/` prefix. A consumer SHALL therefore download the artifact into a `coverage/` directory, which places the files at the paths the coverage tooling expects by default.

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

