## Why

The project has `.spec.ts` and `.spec.tsx` test files in `packages/toolbelt` and `packages/design-system` that currently do nothing — both packages stub out their `test` scripts with `echo 'temporary dummy tests'`. Introducing Vitest establishes a working test runner that integrates natively with the Vite/ESM stack already in use, enabling these tests to actually run in CI and locally.

## What Changes

- Add Vitest and supporting dependencies (`@vitest/ui`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`) to the relevant packages
- Add `vitest.config.ts` (or inline config) to `packages/toolbelt` and `packages/design-system`
- Replace `test: "echo 'temporary dummy tests'"` with `vitest run` in both packages' `package.json`
- Migrate Jest-specific APIs in existing spec files to Vitest equivalents:
  - `jest.mock(...)` → `vi.mock(...)`
  - `import '@testing-library/jest-dom'` → configure via `setupFiles` in vitest config
- Update snapshot files if needed (Vitest uses a compatible snapshot format)
- Add `@types/react` / JSDOM setup for component tests in `design-system`

## Capabilities

### New Capabilities

- `vitest-test-runner`: Vitest is configured and running across `packages/toolbelt` and `packages/design-system`, with all existing spec files passing

### Modified Capabilities

<!-- No existing spec-level requirements are changing — tests were not running before -->

## Impact

- **packages/toolbelt**: Gains `vitest` devDependency and config; `ramda-additions.spec.ts` begins passing
- **packages/design-system**: Gains `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom` devDependencies and config; all component spec files begin passing; `jest.mock` calls updated to `vi.mock`
- **Turborepo pipeline**: `turbo.json` `test` task already exists — no pipeline changes needed
- **CI**: Tests will now actually run (previously no-op); failures will block the pipeline as intended
- **No breaking changes** to public APIs or component interfaces
