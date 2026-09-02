## ADDED Requirements

### Requirement: The build compiles only what ships
Each package whose `build` script invokes `tsc` SHALL compile through a dedicated `tsconfig.build.json` rather than through its general `tsconfig.json`. The build config SHALL extend the package's `tsconfig.json` and SHALL exclude:

- `**/*.test.*` and `**/*.spec.*`
- `**/*.stories.*`
- `**/__mocks__/**`
- `**/__snapshots__/**`

The package's `build` script SHALL point at that config (`tsc -p tsconfig.build.json`).

This exclusion set SHALL match the set already excluded by the `build` task's `inputs` in `turbo.json`. The two lists exist for different reasons — one decides what is compiled, the other what invalidates the cache — but they SHALL be kept identical, because a file that turbo believes cannot affect build output must genuinely not be compiled into it.

#### Scenario: Test output does not reach the published bundle
- **WHEN** a package is built from a clean `dist/`
- **THEN** no file under `dist/` derives from a `*.test.*` or `*.spec.*` source file

#### Scenario: Stories, mocks, and snapshots do not reach the published bundle
- **WHEN** a package is built from a clean `dist/`
- **THEN** no file under `dist/` derives from a `*.stories.*` source file, a file under `__mocks__/`, or a file under `__snapshots__/`

#### Scenario: Source modules are still emitted
- **WHEN** a package is built from a clean `dist/`
- **THEN** every non-excluded module under `src/` has corresponding `.js` and `.d.ts` output, and packages depending on it compile against those declarations

#### Scenario: Editing a test does not change build output
- **WHEN** a test file is edited and the package is rebuilt
- **THEN** the contents of `dist/` are byte-identical to the previous build

### Requirement: Every TypeScript project has a typecheck script
Every package and app containing a `tsconfig.json` SHALL define a `typecheck` script running `tsc --noEmit` against that full `tsconfig.json` — the config that still includes test, story, and mock files.

This SHALL include projects that produce no build output, specifically `packages/testing-config` and `packages/ts-config`. `testing-config` supplies the setup file loaded by every Vitest project in the repo, so a type error in it affects every suite while being compiled by nothing.

The script SHALL be named `typecheck` in every project. `packages/toolbelt`'s existing `check-types` script SHALL be renamed to `typecheck` rather than left alongside it.

#### Scenario: A type error in a test file is reported
- **WHEN** a test file assigns a value that does not satisfy the type of the prop or parameter it targets, and `typecheck` runs for that package
- **THEN** `tsc` reports the error and exits non-zero

#### Scenario: A type error in a non-building package is reported
- **WHEN** `packages/testing-config` contains a type error and its `typecheck` script runs
- **THEN** the error is reported, despite the package having no `build` script

#### Scenario: Only one script name exists
- **WHEN** the repository's `package.json` files are inspected
- **THEN** no `check-types` script remains, and every project with a `tsconfig.json` defines `typecheck`

### Requirement: Typecheck is a cached turbo task keyed on test files
`turbo.json` SHALL define a `typecheck` task that:

- declares `dependsOn: ["^build"]`, because packages resolve each other's types through generated `dist/*.d.ts`
- declares `inputs` that **include** test, story, and mock files, so that editing one invalidates this task even though it cannot invalidate `build`
- declares no `outputs`, since `tsc --noEmit` produces none

The `build` task's existing input exclusions SHALL be retained and SHALL carry a comment recording that they are sound only while `tsconfig.build.json` excludes the same files.

#### Scenario: Editing a test invalidates typecheck but not build
- **WHEN** a test file is edited and both tasks are run
- **THEN** `typecheck` re-executes
- **AND** `build` reports a cache hit

#### Scenario: Typecheck resolves cross-package types
- **WHEN** `typecheck` runs for a package that imports another workspace package
- **THEN** the dependency has been built first and the import resolves against its `dist/*.d.ts` without error

#### Scenario: An unchanged tree is fully cached
- **WHEN** `typecheck` runs twice with no intervening edit
- **THEN** the second run is served entirely from cache

### Requirement: CI fails on a type error before running tests
`.github/workflows/tests.yml` SHALL run the `typecheck` task in the existing `Test` job, positioned before the `yarn test:coverage` step, so that a type error fails the job without waiting for the full suite. It SHALL NOT be a separate job, so that the existing dependency install is reused.

#### Scenario: A type error fails CI
- **WHEN** the `tests.yml` workflow runs against a commit containing a type error in any checked project
- **THEN** the `Test` job fails at the typecheck step and `yarn test:coverage` does not run

#### Scenario: The regression that motivated this change is caught
- **WHEN** a test file passes a string literal that is not a member of the target prop's union type
- **THEN** CI reports it at the typecheck step, rather than only when a cold `tsc` build happens to recompile that file

#### Scenario: A clean tree passes through to the tests
- **WHEN** the workflow runs against a commit with no type errors
- **THEN** the typecheck step succeeds and the coverage run proceeds as before

### Requirement: Application source is typechecked
`apps/ageorgedev` and `apps/game-tools` SHALL be covered by the `typecheck` task. Their `build` script is `vite build`, which performs no type checking, so neither their source nor their tests are currently checked by any tool.

Their `build` scripts SHALL remain `vite build`; typechecking SHALL be a separate task and SHALL NOT be added to the app build.

#### Scenario: App source is typechecked
- **WHEN** `typecheck` runs across the repository
- **THEN** `apps/ageorgedev` and `apps/game-tools` are included, and a type error in either app's `src/` fails the task

#### Scenario: App builds are unchanged
- **WHEN** either app is built
- **THEN** the command is still `vite build` with no typecheck step added to it
