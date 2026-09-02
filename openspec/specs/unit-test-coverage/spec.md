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
The root Vitest coverage configuration SHALL emit `text`, `html`, and `lcov` reporters to `coverage/` at the repo root. The `text` reporter output SHALL be printed to stdout during the run; the `html` reporter SHALL produce `coverage/index.html`; the `lcov` reporter SHALL produce `coverage/lcov.info`.

#### Scenario: Local run produces browsable HTML report
- **WHEN** `yarn test:coverage` completes successfully at the monorepo root
- **THEN** `coverage/index.html` exists and, when opened, renders a coverage summary that lists files from every project

#### Scenario: Local run produces lcov artifact
- **WHEN** `yarn test:coverage` completes successfully at the monorepo root
- **THEN** `coverage/lcov.info` exists and is a valid lcov-format file covering every included source file

### Requirement: CI runs coverage and uploads lcov as an artifact
`.github/workflows/tests.yml` SHALL execute the full unit-test suite with coverage enabled (via `yarn test:coverage` or an equivalent invocation) and SHALL upload the resulting `coverage/lcov.info` as a workflow artifact named `coverage-lcov`.

#### Scenario: CI job produces a coverage artifact
- **WHEN** the `tests.yml` reusable workflow runs on a pull request
- **THEN** the job executes the full unit-test suite with coverage and, on success, uploads a `coverage-lcov` artifact containing `lcov.info`

#### Scenario: PR workflow no longer passes `--affected` to tests
- **WHEN** `pull-request.yml` calls the `tests.yml` reusable workflow
- **THEN** it does not pass a `command_arg: --affected` input, and the tests job runs the full unit-test suite regardless of which packages changed
