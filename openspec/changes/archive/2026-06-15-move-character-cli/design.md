## Context

The character-cli is an Ink/React terminal wizard that guides users through a 5-step flow to generate D&D character `.data.ts` files. It currently lives in `dnd-tooling/packages/character-cli` and writes files to `dnd-tooling/packages/character-sheet/src/characters/` via a relative path computed from `__dirname`.

In this monorepo the equivalent target is `packages/dnd-character-sheet/src/characters/`. The app will live at `apps/dnd-cli`, placing `src/index.tsx` three levels from the monorepo root, so the relative path needs updating accordingly.

## Goals / Non-Goals

**Goals:**
- Migrate all source files from `dnd-tooling/packages/character-cli/src/` into `apps/dnd-cli/src/` verbatim
- Update `CHARACTERS_DIR` path in `index.tsx` to correctly target `packages/dnd-character-sheet/src/characters/` from the new location
- Align `package.json` (name, versions, scripts) to monorepo conventions
- App is runnable via `yarn dev` from `apps/dnd-cli` or `turbo dev --filter=@ageorgedev/dnd-cli`

**Non-Goals:**
- No Vite build setup — CLI runs directly via `tsx`
- No `build` pipeline entry in `turbo.json`
- No changes to `packages/dnd-character-sheet` source code
- No changes to `generateFile.ts` import path (generated files use relative `"../types/character"` which is correct once written into the character-sheet package)

## Decisions

### New app at `apps/dnd-cli`, not a package

The CLI is a runnable tool, not a library. Placing it in `apps/` (alongside `game-tools`) matches the monorepo convention — apps are things you run, packages are things you import.

### Keep `tsx` as the runtime, no bundling

Alternatives considered: compile to `dist/` with `tsc`, bundle with Vite. Both add complexity for no benefit — `tsx` executes TypeScript directly, Ink apps have no need for a production bundle, and the CLI is a dev/local tool only.

### `dev` script, no `build` script

The Turborepo `build` pipeline is for artifacts that other packages consume. This CLI produces no such artifact. Omitting `build` means `turbo build` simply skips it, which is correct. A `dev` script is consistent with the convention used by other apps in this monorepo.

### Hardcoded `CHARACTERS_DIR` path

The CLI has one job: write files into `packages/dnd-character-sheet/src/characters/`. A configurable output path would add complexity (arg parsing, validation) with no use case. The updated relative path from `apps/dnd-cli/src/` is:
```
../../../packages/dnd-character-sheet/src/characters
```

### Pin versions to monorepo standards

The source uses TypeScript 6.0.3; the monorepo is on 5.8.3. React version aligns to `19.1.0` (same as `game-tools`). `@types/node` pins to `18.16.9`, `@types/react` to `19.2.17`. `tsx` and `ink` are new to the monorepo — use the versions from the source package.

## Risks / Trade-offs

- **`tsx` version drift** → The monorepo has no other `tsx` consumer, so there's no conflict risk now. If a second tsx consumer is added later, versions should be aligned then.
- **Relative path fragility** → If `apps/dnd-cli` or `packages/dnd-character-sheet` is ever moved/renamed, the hardcoded path breaks silently at runtime. Acceptable trade-off given the tool's scope.
- **No tsconfig** → The source package has no `tsconfig.json`; `tsx` runs without one. This is fine for a dev-only CLI but means no type-checking via `tsc`. Add `tsconfig.json` extending `@ageorgedev/ts-config/react.json` for editor support and future-proofing.
