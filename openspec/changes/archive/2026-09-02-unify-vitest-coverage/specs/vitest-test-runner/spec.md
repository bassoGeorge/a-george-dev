## ADDED Requirements

### Requirement: Root-level Vitest projects configuration
The monorepo SHALL have a `vitest.config.ts` at the repo root that uses Vitest's `projects` field to reference every package's existing `vitest.config.ts`. Each referenced project retains its own `environment`, `setupFiles`, and `include` configuration.

#### Scenario: Root config discovers all projects
- **WHEN** `yarn vitest run` is executed from the repo root
- **THEN** Vitest loads the root `vitest.config.ts`, resolves every entry in `projects`, and executes test files from every package that has a configured `vitest.config.ts` in a single process

#### Scenario: Project environment isolation is preserved
- **WHEN** the root Vitest run executes tests from `packages/toolbelt` (node env) and `packages/design-system` (jsdom env) in the same invocation
- **THEN** each package's tests run under its declared environment and setup files without cross-contamination

### Requirement: Root-level test scripts
The root `package.json` SHALL provide `test`, `test:coverage`, and `test:watch` scripts that execute tests in a single root Vitest process rather than delegating test execution to Turborepo's fan-out.

Because cross-package imports resolve through each package's `exports` map to built `dist/` output, these scripts SHALL first build the workspace library packages (via a `build:packages` script delegating to `turbo build --filter='./packages/*'`). Turborepo is therefore still used to satisfy the build prerequisite; it is not used to run the tests.

#### Scenario: Root test scripts work on a clean checkout
- **WHEN** `yarn test` is executed at the monorepo root with no `dist/` directories present
- **THEN** the workspace library packages are built first, and every test file resolves its cross-package imports rather than failing with `Failed to resolve import`

#### Scenario: Root test script runs the full suite
- **WHEN** `yarn test` is executed at the monorepo root
- **THEN** a single `vitest run` process executes tests across every configured project and exits with code 0 when all tests pass

#### Scenario: Root watch script watches all projects
- **WHEN** `yarn test:watch` is executed at the monorepo root
- **THEN** Vitest starts in watch mode and re-runs tests in any project when a source or test file in that project (or a transitive dependency) changes

## MODIFIED Requirements

### Requirement: Full test suite passes via Turborepo
Running `yarn test` from the monorepo root SHALL execute the full unit-test suite via a single root-level `vitest run` process (not via Turborepo fan-out) and report results, after building the workspace library packages the suite depends on. Turborepo's `test` task SHALL remain functional for direct invocation as `yarn turbo test`, but SHALL NOT be the primary entry point used by CI or documented root scripts.

#### Scenario: Root test command succeeds
- **WHEN** `yarn test` is executed at the monorepo root
- **THEN** a single `vitest run` process executes tests across every project defined in the root `vitest.config.ts` and exits with code 0 when all tests pass

#### Scenario: Turbo test remains functional
- **WHEN** `yarn turbo test` is executed at the monorepo root
- **THEN** Turborepo fans out to each package's `test` script and each package's `vitest run` executes independently, exiting with code 0 when all tests pass
