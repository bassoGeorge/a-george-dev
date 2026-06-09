## ADDED Requirements

### Requirement: Vitest is configured in packages/toolbelt
`packages/toolbelt` SHALL have a `vitest.config.ts` that runs spec files with the `node` environment and its `package.json` `test` script SHALL invoke `vitest run`.

#### Scenario: Toolbelt tests execute
- **WHEN** `yarn turbo test --filter=@ageorgedev/toolbelt` is run
- **THEN** all `.spec.ts` files in `packages/toolbelt/src/` are discovered and executed by Vitest

#### Scenario: ramda-additions spec passes
- **WHEN** Vitest runs `ramda-additions.spec.ts`
- **THEN** all `mapKeys` test cases pass without errors

### Requirement: Vitest is configured in packages/design-system
`packages/design-system` SHALL have a `vitest.config.ts` that runs spec files with the `jsdom` environment, includes `@testing-library/jest-dom` setup, and its `package.json` `test` script SHALL invoke `vitest run`.

#### Scenario: Design-system tests execute
- **WHEN** `yarn turbo test --filter=@ageorgedev/design-system` is run
- **THEN** all `.spec.tsx` files in `packages/design-system/src/` are discovered and executed by Vitest

#### Scenario: Component specs pass
- **WHEN** Vitest runs any `.spec.tsx` component test
- **THEN** React components render in JSDOM and `@testing-library/jest-dom` matchers such as `toBeInTheDocument` and `toHaveClass` resolve without import errors

### Requirement: Jest-specific APIs are replaced with Vitest equivalents
All spec files that reference `jest.*` globals SHALL be updated to use `vi.*` equivalents from Vitest's API.

#### Scenario: vi.mock replaces jest.mock
- **WHEN** a spec file previously called `jest.mock('../path/to/module')`
- **THEN** the same file SHALL call `vi.mock('../path/to/module')` and the module is correctly mocked at test runtime

### Requirement: Full test suite passes via Turborepo
Running `yarn test` from the monorepo root SHALL execute tests in all packages with configured test scripts and report results.

#### Scenario: Root test command succeeds
- **WHEN** `yarn test` is executed at the monorepo root
- **THEN** Turborepo runs the `test` pipeline, Vitest executes in both `toolbelt` and `design-system`, and the command exits with code 0 when all tests pass
