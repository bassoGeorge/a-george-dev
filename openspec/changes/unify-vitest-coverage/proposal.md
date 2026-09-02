## Why

The monorepo has seven independent Vitest configurations orchestrated by `turbo test`, producing seven separate test summaries and no coverage report at all. Developers cannot answer "what's covered by unit tests?" without stitching output together, and there is no single command that yields one authoritative pass/fail plus coverage for the whole repo.

## What Changes

- Introduce a root-level `vitest.config.ts` using Vitest's `projects` field, referencing each package's existing `vitest.config.ts` as a project entry. Each project keeps its own environment (node/jsdom), setup files, and include globs.
- Move the canonical unit-test invocation from `turbo test` (fan-out over packages) to a single root `vitest run` process. Package-level `test` scripts remain functional for targeted local runs but are no longer the primary CI entry point.
- Add `@vitest/coverage-v8` and configure coverage at the root config, producing a single merged report (`text`, `html`, `lcov`) written to `coverage/` at the repo root.
- Add root `package.json` scripts: `test` (single root vitest run), `test:coverage` (same, with `--coverage`), and `test:watch` (root watch mode across all projects).
- Update `.github/workflows/tests.yml` to invoke `yarn test:coverage` (or `yarn test` when coverage is not requested) instead of `yarn turbo test`. **BREAKING** for CI: the `command_arg: --affected` input on the reusable workflow is no longer meaningful for unit tests and is removed from the tests job. `turbo test --affected` remains available and continues to work for anyone invoking it directly.
- Upload the `lcov.info` artifact from CI so it can be consumed by future reporting (Codecov, PR comment, etc.) — the reporting integration itself is out of scope for this change.

## Capabilities

### New Capabilities
- `unit-test-coverage`: Owns the coverage provider choice, thresholds (if any), report formats, and where coverage output lands. Governs both local `test:coverage` and CI coverage artifacts.

### Modified Capabilities
- `vitest-test-runner`: The requirement that "the full test suite passes via Turborepo" changes to "the full test suite passes via a single root Vitest invocation." Per-package `test` scripts remain but are demoted from the primary entry point. Adds a requirement that a root `vitest.config.ts` references every package's project config.

## Impact

- **Configs**: New `vitest.config.ts` at repo root. Each package's `vitest.config.ts` stays put and is imported by the root config; no per-package config changes required beyond ensuring they are default-exported and standalone.
- **Dependencies**: Add `@vitest/coverage-v8` at the root (or as a devDependency in `@ageorgedev/testing-config`).
- **Scripts**: Root `package.json` `test`, `test:coverage`, `test:watch` scripts added.
- **CI**: `.github/workflows/tests.yml` switches from `yarn turbo test` to `yarn test:coverage` (or `yarn test`), and uploads an `lcov.info` artifact. `pull-request.yml` no longer passes `--affected` to the tests workflow.
- **Turborepo**: `turbo test` still works for anyone who wants it, but is no longer wired to CI. The `test` task inputs in `turbo.json` are unchanged.
- **Local DX**: Developers run `yarn test:watch` at the root and get cross-project watch mode. `yarn test:coverage` gives a merged HTML report at `coverage/index.html`.
- **CI cost**: PR runs stop pruning tests by `--affected` — every PR runs the full unit-test suite. Acceptable given current suite size; revisit if runtimes grow.
- **Out of scope**: Codecov / Coveralls integration, coverage thresholds as PR gates, e2e test coverage.
