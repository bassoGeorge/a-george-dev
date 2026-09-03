## MODIFIED Requirements

### Requirement: Coverage output includes application and package source
The root Vitest coverage configuration SHALL restrict `coverage.include` to an explicit, enumerated list of the projects that have a `vitest.config.ts` registered in the root `projects` array. A project without a Vitest configuration SHALL NOT appear in `coverage.include`, because it has no test runner and therefore cannot register a covered line. The list SHALL be enumerated literally rather than derived from a wildcard, so that adding a new package requires a deliberate edit to `vitest.config.ts`.

The enumerated projects SHALL be:
- `packages/brand-components/src/**/*.{ts,tsx}`
- `packages/design-system/src/**/*.{ts,tsx}`
- `packages/dnd-character-sheet/src/**/*.{ts,tsx}`
- `packages/reveal-framework/src/**/*.{ts,tsx}`
- `packages/toolbelt/src/**/*.{ts,tsx}`
- `apps/ageorgedev/src/**/*.{ts,tsx}`
- `apps/game-tools/src/**/*.{ts,tsx}`

The globs SHALL be restricted to source extensions rather than matching all files under `src`, so that the v8 provider does not attempt to parse non-JavaScript content (`.mdx`, `.csv`) and emit parse errors.

`coverage.exclude` SHALL cover file kinds that cut across the included projects:
- test files (`**/*.{test,spec}.{ts,tsx}`), `dist/**`, `node_modules/**`, `storybook-static/**`, `apps/*-e2e/**`, `apps/design-docs/**`
- `**/*.generated.ts` and `**/*.gen.ts` — generated sources, including TanStack Router route trees
- `**/*.stories.tsx` — Storybook stories, which no configured test runner executes
- `**/src/routes/**`, `**/src/router.tsx`, `**/src/components/GlobalProviders.tsx`, `**/src/mdx-components.tsx` — router framework wiring, exercised by Playwright e2e rather than unit tests
- `apps/game-tools/src/data/dnd-characters/*/**` — per-character data directories and shared `common/` data
- `packages/dnd-character-sheet/src/characters/**` — example character fixtures

The exclusion of `apps/game-tools/src/data/dnd-characters/*/**` SHALL use a single-segment wildcard so that `apps/game-tools/src/data/dnd-characters/index.ts` remains included. That file is a character registry containing slug derivation and lookup logic, not declarative data.

#### Scenario: Untested but included source counts against coverage
- **WHEN** `yarn test:coverage` runs and a source file under an enumerated project's `src/` is not imported by any test
- **THEN** that file appears in the coverage report with 0% coverage rather than being omitted

#### Scenario: Non-source files do not produce parse errors
- **WHEN** `yarn test:coverage` runs and the repo contains `.mdx` and `.csv` files under an included `src` directory
- **THEN** the run completes without `Failed to parse` / `RolldownError` messages for those files

#### Scenario: Excluded directories do not appear in the report
- **WHEN** `yarn test:coverage` runs
- **THEN** files under `node_modules`, `dist`, `storybook-static`, `apps/*-e2e`, and `apps/design-docs` do not appear in the coverage report

#### Scenario: A package without a Vitest project is not measured
- **WHEN** `yarn test:coverage` runs and `packages/talk-tailwind` has no `vitest.config.ts` and is absent from the root `projects` array
- **THEN** no file under `packages/talk-tailwind/src/` appears in the coverage report

#### Scenario: Storybook stories are not measured
- **WHEN** `yarn test:coverage` runs
- **THEN** no `*.stories.tsx` file appears in the coverage report

#### Scenario: Generated route trees are not measured
- **WHEN** `yarn test:coverage` runs
- **THEN** neither `apps/ageorgedev/src/routeTree.gen.ts` nor `apps/game-tools/src/routeTree.gen.ts` appears in the coverage report

#### Scenario: Router wiring is not measured
- **WHEN** `yarn test:coverage` runs
- **THEN** no file under `apps/*/src/routes/`, nor `router.tsx`, `GlobalProviders.tsx`, or `mdx-components.tsx`, appears in the coverage report

#### Scenario: Character data is excluded but the registry is not
- **WHEN** `yarn test:coverage` runs
- **THEN** files under `apps/game-tools/src/data/dnd-characters/claw/`, `.../common/`, and the other per-character directories do not appear in the coverage report
- **AND** `apps/game-tools/src/data/dnd-characters/index.ts` does appear in the coverage report

## ADDED Requirements

### Requirement: Coverage is gated by an enforced threshold
The root Vitest coverage configuration SHALL declare `coverage.thresholds` that fail the run when coverage falls below a floor. The threshold SHALL gate `lines` and `statements` only. `branches` and `functions` SHALL continue to be reported but SHALL NOT be gated, because the v8 provider counts implicit branches (optional chaining, default parameters) that produce failures unrelated to test quality.

The floor SHALL be set to the coverage figure actually achieved once the new tests in this change have landed, reduced by approximately 2 percentage points, so that unrelated changes are not blocked by an exact-match ratchet. The threshold SHALL be global; `perFile` thresholds SHALL NOT be enabled while any included file remains at 0% coverage. `thresholds.autoUpdate` SHALL NOT be enabled, because rewriting configuration during a test run produces a dirty working tree in CI and raises the floor without review.

#### Scenario: Coverage below the floor fails the run
- **WHEN** `yarn test:coverage` runs and line or statement coverage is below the configured threshold
- **THEN** Vitest exits with a non-zero status and reports which metric fell below its threshold

#### Scenario: Coverage at or above the floor passes
- **WHEN** `yarn test:coverage` runs and both line and statement coverage are at or above the configured threshold
- **THEN** Vitest exits with status 0

#### Scenario: Branch coverage below the line threshold does not fail the run
- **WHEN** `yarn test:coverage` runs, line and statement coverage are above their thresholds, and branch coverage is lower than either
- **THEN** the run exits with status 0 and branch coverage is reported without being enforced

#### Scenario: CI enforces the threshold without a workflow change
- **WHEN** the `tests.yml` reusable workflow runs `yarn test:coverage` on a pull request
- **THEN** the threshold configured in the root `vitest.config.ts` is applied, and a below-floor result fails the job

### Requirement: Previously untested units have unit-test coverage
The units listed below SHALL have co-located Vitest unit tests following the repository's `write-unit-tests` conventions (`<Name>.test.{ts,tsx}` beside the source file, Vitest APIs rather than Jest globals, `@testing-library/react` for components).

- `packages/design-system`: `theming/ThemeProvider.tsx`, `ui/button.tsx`, `ui/breadcrumb.tsx`, `ui/dropdown-menu.tsx`, `color-utils.ts`, `theming/theme-init-script.ts`
- `packages/dnd-character-sheet`: `components/SpellcastingBlock/{SpellcastingBlock,SpellAbilityPanel,SpellSlotsPanel,GroupedSpellList}.tsx`, `components/feature-blocks/{FeatureEntry,FeatureList,SpeciesAndFeatsCombined}.tsx`, `lib/data/with-spell-mods.ts`
- `packages/reveal-framework`: `components/slide-components.tsx`, `components/slide-types.tsx`
- `apps/game-tools`: `components/HeaderBreadcrumbs.tsx`, `data/dnd-characters/index.ts`

#### Scenario: The character registry resolves a character by slug
- **WHEN** `getCharacterBySlugAndLevel` is called with a slug derived from a character's name
- **THEN** it returns the matching character pack

#### Scenario: The character registry reports an unknown slug
- **WHEN** `getCharacterBySlugAndLevel` is called with a slug that matches no character
- **THEN** it throws an error naming the unknown slug

#### Scenario: The character registry reports an unknown level
- **WHEN** `getCharacterBySlugAndLevel` is called with a known slug and a level no entry for that slug has
- **THEN** it throws an error naming both the slug and the level

#### Scenario: The character registry defaults to the first entry when no level is given
- **WHEN** `getCharacterBySlugAndLevel` is called with a known slug and no level
- **THEN** it returns the first pack registered for that slug

#### Scenario: Vendored UI primitives are covered by snapshot tests
- **WHEN** the design-system test suite runs
- **THEN** `button.tsx`, `breadcrumb.tsx`, and `dropdown-menu.tsx` each have a snapshot test that renders the component in a representative composed state, including the open state for portal-rendered content

#### Scenario: The real ThemeProvider is exercised
- **WHEN** the design-system test suite runs
- **THEN** `theming/ThemeProvider.tsx` is executed directly by its own test rather than only through `theming/__mocks__/ThemeProvider.tsx`
