## Why

A type error in a test file is currently invisible until a cold CI build hits it. `reveal-framework`'s `build` is `tsc && cpx` over `include: ["src"]`, so `tsc` compiles test files — but turbo's `build.inputs` *excludes* `*.test.*`, so editing a test never invalidates the build cache. Vitest strips types without checking them. The result: a test asserting `shape="scooped"` against a prop typed `'trapRight' | 'trapLeft' | 'triUpperRight' | 'triUpperLeft'` passed locally for as long as the cache held, then failed the build on a clean CI runner and took the whole test job down with it.

The same configuration means 132 compiled test artifacts and 24 compiled Storybook stories currently ship inside published `dist/` directories.

## What Changes

- Add a `tsconfig.build.json` per building package, used by that package's `build` script (`tsc -p tsconfig.build.json`). It excludes `**/*.test.*`, `**/*.spec.*`, `**/*.stories.*`, `**/__mocks__/**`, and `**/__snapshots__/**` — the same set turbo's `build.inputs` already excludes, so the two lists mirror each other deliberately.
- Leave each `tsconfig.json` covering everything including tests. It remains the editor's view and becomes the typecheck task's view.
- Add a `typecheck` script (`tsc --noEmit`) to every package with a `tsconfig.json`, including `testing-config` and `ts-config`, which build nothing today and are consequently checked by nothing — despite `testing-config` shipping the setup file all six Vitest suites load.
- Rename `toolbelt`'s orphaned `check-types` script to `typecheck` so one name covers the repo. It is currently in no turbo task and no workflow.
- Add a `typecheck` task to `turbo.json`, depending on `^build` (packages consume each other through `dist/*.d.ts`) with test files in its `inputs`, so a test edit does invalidate *this* task's cache.
- Add a typecheck step to the existing `Test` job in `tests.yml`, ahead of `yarn test:coverage`, so a type error fails fast without a second runner.
- Extend typechecking to `apps/ageorgedev` and `apps/game-tools`, which `vite build` never typechecks, as an explicitly separate final task — their pre-existing error count is unknown until measured.
- Keep the existing exclusions in turbo's `build.inputs`, now correct rather than misleading, with a comment recording that they are only sound while `tsconfig.build.json` excludes the same files.

## Capabilities

### New Capabilities
- `typecheck-pipeline`: What `tsc` compiles and for which purpose — the split between a narrow build config that determines published `dist/` contents and a full config that determines what gets typechecked, the `typecheck` task and its cache inputs, and the CI gate that runs it.

### Modified Capabilities

None. `vitest-test-runner` owns the test runner and `unit-test-coverage` owns coverage measurement; neither makes any claim about the `tsc` build or about typechecking, so no existing requirement changes.

## Impact

- `packages/{brand-components,design-system,dnd-character-sheet,reveal-framework,talk-tailwind,toolbelt}` — a new `tsconfig.build.json`, a changed `build` script, and a new `typecheck` script each.
- `packages/{testing-config,ts-config}` — a `typecheck` script only; neither builds.
- `apps/{ageorgedev,game-tools}` — a `typecheck` script; `vite build` is unchanged.
- `turbo.json` — one new task, plus a clarifying comment on `build.inputs`.
- `.github/workflows/tests.yml` — one new step.
- Published `dist/` contents shrink: no test, story, mock, or snapshot output. Nothing imports those across package boundaries today, so no consumer breaks.
- **Risk to verify, not assume:** `apps/design-docs` runs `build:storybook` with `dependsOn: ["^build"]`. If Storybook resolves `design-system` stories through built `dist` rather than through source, excluding stories breaks it. This must be checked before the change is considered done.
- No production runtime code changes, and no change to what any test asserts.
