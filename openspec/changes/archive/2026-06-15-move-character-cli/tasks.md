## 1. Scaffold `apps/dnd-cli`

- [x] 1.1 Create `apps/dnd-cli/` directory structure (`src/steps/`, `src/lib/`)
- [x] 1.2 Create `apps/dnd-cli/package.json` with name `@ageorgedev/dnd-cli`, `dev` script, and dependency versions pinned to monorepo standards (`react@19.1.0`, `typescript@5.8.3`, `@types/node@18.16.9`, `@types/react@19.2.17`, plus `ink` and `tsx` from source)
- [x] 1.3 Create `apps/dnd-cli/tsconfig.json` extending `@ageorgedev/ts-config/react.json`

## 2. Copy and update source files

- [x] 2.1 Copy `src/types.ts` verbatim
- [x] 2.2 Copy `src/App.tsx` verbatim
- [x] 2.3 Copy `src/steps/IdentityStep.tsx`, `AbilitiesStep.tsx`, `CombatStep.tsx`, `ProficienciesStep.tsx`, `FilenameStep.tsx` verbatim
- [x] 2.4 Copy `src/lib/generateFile.ts` verbatim
- [x] 2.5 Copy `src/index.tsx` and update `CHARACTERS_DIR` path to `../../../packages/dnd-character-sheet/src/characters` and update the console.log message to reflect the new path

## 3. Workspace integration

- [x] 3.1 Run `yarn install` from the monorepo root to register `@ageorgedev/dnd-cli` in the workspace
- [x] 3.2 Verify `yarn dev` runs from `apps/dnd-cli` and the Ink wizard launches
- [x] 3.3 Verify a completed wizard run writes a `.data.ts` file to `packages/dnd-character-sheet/src/characters/`
