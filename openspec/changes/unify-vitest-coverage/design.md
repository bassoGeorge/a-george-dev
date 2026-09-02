## Context

Today `turbo test` fans out to seven package-level `vitest run` invocations. Each package has its own `vitest.config.ts` (mix of `node` and `jsdom` environments, some with a shared `@ageorgedev/testing-config` setup file). PR CI runs `turbo test --affected` to prune to the changed dependency slice. There is no coverage configuration in any package.

We explored two industry-consensus paths:

- **Camp A** — keep `turbo --affected` for tests, add Codecov with carryforward flags to handle partial coverage uploads.
- **Camp B** — collapse to a single root Vitest process using `projects`, always run everything, get merged coverage natively without a SaaS dependency.

The proposal picked Camp B. This design captures the how.

## Goals / Non-Goals

**Goals:**
- One command, one report: `yarn test:coverage` at the root produces a single pass/fail and a single HTML/lcov coverage report covering every package with tests.
- Preserve per-package environment isolation (jsdom vs node, package-specific setup files, include globs).
- Keep local watch DX excellent: `yarn test:watch` reacts to any file in any package.
- CI publishes an `lcov.info` artifact so a future reporting integration (Codecov, PR comment bot, etc.) can be bolted on without further config work.

**Non-Goals:**
- Codecov, Coveralls, or any third-party coverage SaaS integration.
- Coverage thresholds enforced as PR gates.
- e2e (Playwright) test coverage in `apps/*-e2e`.
- Removing `turbo test` entirely — the turbo task stays functional for anyone who wants per-package invocation. It is only demoted from primary CI entry point.

## Decisions

### Root config uses Vitest `projects`, not `workspace`

Vitest's `workspace` field is deprecated as of Vitest 3; `projects` is the current API. We already use Vitest 4.1.8, so this is the only choice.

Each project entry is a string path to the existing per-package `vitest.config.ts`. No content changes needed in package configs beyond ensuring they remain valid standalone configs (which they already are — they're already invoked directly by `vitest run` today).

**Alternative considered:** inline every project's config in the root file. Rejected — it would fork the source of truth. Keeping per-package configs as-is means `yarn workspace @ageorgedev/toolbelt vitest` still works for targeted local runs.

### Coverage provider: `@vitest/coverage-v8`

V8's native coverage is faster than istanbul instrumentation and requires no source transform. Both providers support the same reporters (`text`, `html`, `lcov`, `json`). V8 has minor edge cases around branch coverage precision, but for the "is my code exercised?" question it's the accepted default in the Vitest ecosystem.

**Alternative considered:** `@vitest/coverage-istanbul`. Rejected as the default — slower and requires transforms — but nothing prevents switching later since Vitest treats the provider as pluggable.

### Coverage config lives in the root config only

Per Vitest projects semantics, `coverage` set in project-level configs is ignored — coverage runs across the merged run and must be configured at the root. This is fine for our purposes: we want one unified report, not per-package thresholds.

Root coverage config:
- `provider: 'v8'`
- `reporter: ['text', 'html', 'lcov']`
- `reportsDirectory: './coverage'`
- `include`: `packages/*/src/**`, `apps/ageorgedev/src/**`, `apps/game-tools/src/**`
- `exclude`: test files, `dist/**`, `node_modules/**`, `storybook-static/**`, generated files (spells CSV output), `apps/*-e2e/**`, `apps/design-docs/**`

### CI invokes the root script, not turbo

`.github/workflows/tests.yml` switches from `yarn turbo test ${{ inputs.command_arg }} -- --passWithNoTests` to `yarn test:coverage` (with `--coverage` behind a workflow input if we want to keep it toggleable). The `command_arg` input becomes unused for tests and is removed from `pull-request.yml`'s call to `tests.yml`.

The `generate:spells:check` step continues to run via `turbo` — unrelated to test execution.

The `lcov.info` file is uploaded as a workflow artifact named `coverage-lcov` for downstream consumers.

### Local scripts

Root `package.json` gains:
- `"test": "vitest run"` — one-shot, no coverage.
- `"test:coverage": "vitest run --coverage"` — one-shot with merged report.
- `"test:watch": "vitest"` — cross-project watch mode.

The existing root `"test"` script (`turbo test -- --passWithNoTests`) is replaced. Anyone who still wants the turbo path can call `yarn turbo test` directly; it will keep working because per-package `test` scripts stay in place.

### Per-package `test` scripts stay

Each package retains `"test": "vitest run"`. This gives targeted local runs (`yarn workspace @ageorgedev/toolbelt test`) and keeps `turbo test` working. Removing them would be a bigger, riskier scope for no gain.

## Risks / Trade-offs

- **[Risk] Full test run on every PR is slower than `--affected`.** → Mitigation: current suite is small (7 packages of unit tests, no integration). Revisit if PR test time exceeds ~3 minutes. Vitest's parallelism across projects tends to be at least as fast as turbo's parallel fan-out because there is no per-package process startup overhead.
- **[Risk] Root-level coverage config cannot express per-package thresholds.** → Mitigation: out of scope per Goals. If future needs demand per-package gates, revisit with Codecov flags or a custom threshold script.
- **[Risk] A broken vitest config in one package fails the whole root run.** → Mitigation: same failure surface as `turbo test` when `--affected` includes that package; the difference is only in blast radius framing, not correctness.
- **[Risk] Some IDEs' Vitest integrations expect a per-package config.** → Mitigation: per-package configs still exist. VS Code's Vitest extension supports `projects` natively as of recent versions.
- **[Trade-off] We give up turbo caching for the test task.** → Accepted. Vitest's module dep graph provides finer-grained incremental behavior in watch mode; CI runs are one-shot and would not benefit from turbo's remote cache without additional infra we don't have.

## Migration Plan

1. Add `@vitest/coverage-v8` to `@ageorgedev/testing-config` (or root devDependencies).
2. Create root `vitest.config.ts` referencing every package's config via `projects`.
3. Add root `test`, `test:coverage`, `test:watch` scripts.
4. Verify locally: `yarn test`, `yarn test:coverage`, `yarn test:watch`.
5. Update `.github/workflows/tests.yml` to call `yarn test:coverage` and upload the lcov artifact.
6. Update `.github/workflows/pull-request.yml` to drop the `command_arg: --affected` input from the tests job.
7. Land on `develop`, watch one full PR CI run, then merge to `main`.

Rollback: revert the PR. Per-package configs and turbo `test` task remain intact throughout, so rollback restores the previous behavior with no data or config migration.

## Open Questions

- Do we want CI to also run `yarn test` (without coverage) as a fast-fail step before the coverage run, or is one combined `test:coverage` run acceptable? Current lean: one combined run — coverage overhead on this suite is small and the extra step buys little.
- Should coverage `include` list live in the root config or in a `coverage.config.ts` shared helper? Current lean: inline in root config until it grows large enough to warrant extraction.
