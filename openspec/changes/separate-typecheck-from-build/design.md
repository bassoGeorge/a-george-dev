## Context

`packages/reveal-framework` failed CI with:

```
src/components/slide-components.test.tsx(68,22): error TS2322:
Type '"scooped"' is not assignable to type
'"trapRight" | "trapLeft" | "triUpperRight" | "triUpperLeft" | undefined'
```

The literal fix was one word. What matters is why it survived to CI at all — three mechanisms lining up:

1. Every building package runs `build: tsc && cpx ...` against `tsconfig.json` with `include: ["src"]`. `tsc` therefore **compiles test files**, and a type error in one fails the build.
2. `turbo.json`'s `build` task **excludes** `*.test.*`, `*.spec.*`, `*.stories.*`, and `__snapshots__` from its `inputs`. Adding or editing a test therefore does **not** invalidate the build cache.
3. Vitest transforms through rolldown, which strips types without checking them.

So the error was unreachable locally: `tsc` never re-ran (cached), and Vitest never type-checked. `dist/` still held compiled output for the two *older* test files and none for the two newly added ones — visible evidence the build had not re-run since they were written. A clean CI runner had no cache, ran `tsc` for real, and failed immediately.

The same `include: ["src"]` means published bundles carry test and story output: 132 test artifacts (design-system 48, dnd-character-sheet 63, reveal-framework 12, toolbelt 6, brand-components 3) and 24 story artifacts in design-system.

Two further gaps found while investigating:

- `packages/toolbelt` has a `check-types: tsc --noEmit` script that is in no turbo task and no workflow. It is dead.
- `apps/ageorgedev` and `apps/game-tools` build with `vite build`, which does not typecheck. Their source and tests are checked by nothing at all.

All six building packages share the identical shape (`build: tsc && cpx`, `include: ["src"]`, `exclude: ["node_modules", "dist"]`), so one pattern applies uniformly.

## Goals / Non-Goals

**Goals:**

- Make a type error in a test file fail fast and deterministically, independent of cache state.
- Stop shipping test, story, mock, and snapshot output in published `dist/`.
- Keep turbo's `build` cache exclusions, and make them *true* rather than merely convenient.
- Close the "checked by nothing" gap for `testing-config` and for both apps.

**Non-Goals:**

- No change to what any test asserts, and no new tests. The `"scooped"` fix already landed separately.
- No change to runtime or production code.
- No move away from `tsc` for package builds, and no change to `vite build` for apps.
- Not a general strictness increase — no new compiler flags. This changes *what is checked*, not *how strictly*.

## Decisions

### A separate `tsconfig.build.json`, not exclusions in `tsconfig.json`

Three options were considered.

*Add the exclusions to `packages/ts-config/base.json`,* inherited by everything. Rejected as a trap: tsconfig `exclude` does **not** merge across `extends` — a child declaring its own `exclude` overrides the parent's outright, and all six packages declare `exclude: ["node_modules", "dist"]`. The edit would appear correct and do nothing.

*Add the exclusions to each package's `tsconfig.json`.* Works, but makes one file serve two audiences: the editor and typecheck want tests included, the build wants them excluded. Collapsing both into one file is what produced this bug.

*A `tsconfig.build.json` per package, extending `tsconfig.json`.* Chosen. The two audiences get two files. `tsconfig.json` stays the complete view — what your editor loads and what `typecheck` runs against; `tsconfig.build.json` is strictly narrower and answers only "what ships".

### The two exclusion lists are deliberately identical

`tsconfig.build.json`'s excludes and `turbo.json`'s `build.inputs` excludes now name the same files for different reasons: one decides what is compiled, the other what invalidates the cache. They must agree — turbo asserting a file cannot affect build output is only safe if that file genuinely is not compiled.

That invariant is invisible in the code, so `build.inputs` carries a comment naming the dependency. This coupling, undocumented, is precisely what caused the original bug.

### Typecheck is a turbo task keyed on the files build ignores

`typecheck` runs `tsc --noEmit` against the full `tsconfig.json`, so tests and stories are checked but never emitted. It declares `dependsOn: ["^build"]` because packages resolve each other through generated `dist/*.d.ts`, and its `inputs` **include** test files — the exact inverse of `build`. Editing a test invalidates `typecheck` and not `build`, which is the correct division.

A single root-level `tsc --noEmit` was the alternative. Rejected: no root tsconfig spans all projects today, and it forfeits per-package caching and parallelism that turbo already provides.

### Non-building packages are in scope

`testing-config` and `ts-config` produce no build output and are checked by nothing. `testing-config` is not incidental — it ships the setup file every Vitest project in the repo loads, so a type error there affects every suite while being compiled by no build. Including them costs two scripts.

### CI gets a step, not a job

The typecheck step goes into the existing `Test` job ahead of `yarn test:coverage`. It reuses the install that job already performs and fails before the multi-minute suite. A parallel job would surface typecheck and test results independently, but at the cost of a second full install for a check measured in seconds.

### Apps are in scope but sequenced last

Both apps are currently unchecked, and turning on `tsc --noEmit` over previously-unchecked code typically surfaces pre-existing errors. Their count is unknown until measured, so app coverage is the final task rather than interleaved. If the count is large, the app portion can be split into its own change without redoing any earlier task. The count gets measured and reported before that call is made.

## Risks / Trade-offs

**Excluding stories may break Storybook** → `apps/design-docs` runs `build:storybook` with `dependsOn: ["^build"]`. If it resolves `design-system` stories through built `dist` rather than through source via Vite, removing story output breaks it. Storybook conventionally globs source, so this is expected to be fine — but it is expected, not known. The mitigation is a `build:storybook` run before and after the exclusion, as an explicit task. If it does break, that is a blocker to resolve, not a reason to quietly re-include stories.

**Apps may carry a large pile of pre-existing errors** → Measured before committing to fixing them in this change; splitting remains available.

**`typecheck` adds wall-clock time to CI** → It is cached by turbo and runs before the suite, so a type error now saves the multi-minute test run it used to fail after.

**Cross-package deep imports into excluded paths would break** → Verified none exist: `__mocks__` is resolved intra-package by Vitest's `vi.mock` convention and is never imported across a package boundary. `design-system` exports `./*` → `./dist/*.js`, so such an import would be *possible*; it simply isn't done today.

**Two configs per package is more surface** → Accepted. `tsconfig.build.json` extends `tsconfig.json` and adds only an `exclude`, so the duplication is one key.

## Migration Plan

1. Per package: add `tsconfig.build.json`, point `build` at it, rebuild clean, confirm `dist/` is free of test/story/mock/snapshot output and that dependants still compile.
2. Verify `build:storybook` still succeeds.
3. Add `typecheck` scripts, rename `toolbelt`'s `check-types`, add the turbo task, confirm the cache split behaves (test edit invalidates `typecheck`, not `build`).
4. Wire the CI step; verify it catches a deliberately introduced type error in a test file.
5. Measure app errors, report the count, then fix or split.

Rollback is per-package and independent: point `build` back at `tsconfig.json`.

## Open Questions

Whether `apps/ageorgedev` and `apps/game-tools` carry enough pre-existing type errors to justify splitting them into a separate change. Deliberately left open — it is a measurement, taken during implementation, not a judgement to make now.
