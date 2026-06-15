## ADDED Requirements

### Requirement: CLI wizard runs from monorepo
The `@ageorgedev/dnd-cli` app SHALL be executable via `yarn dev` from the `apps/dnd-cli` directory, launching the interactive Ink terminal wizard.

#### Scenario: Developer runs the CLI
- **WHEN** a developer runs `yarn dev` in `apps/dnd-cli`
- **THEN** the 5-step character creation wizard launches in the terminal

### Requirement: Generated files land in dnd-character-sheet
The CLI SHALL write generated `.data.ts` character files into `packages/dnd-character-sheet/src/characters/` using the filename provided in the final wizard step.

#### Scenario: Wizard completes successfully
- **WHEN** the user completes all 5 steps and confirms a filename
- **THEN** a `.data.ts` file is written to `packages/dnd-character-sheet/src/characters/<filename>`
- **THEN** the terminal prints a confirmation message showing the written path

#### Scenario: Output directory does not exist
- **WHEN** `packages/dnd-character-sheet/src/characters/` does not exist
- **THEN** the CLI creates the directory before writing the file

### Requirement: Generated file uses correct import path
Generated character files SHALL use a relative import (`"../types/character"`) that resolves correctly from within `packages/dnd-character-sheet/src/characters/`.

#### Scenario: Generated file is valid TypeScript
- **WHEN** a `.data.ts` file is generated
- **THEN** the file contains `import type { Character } from "../types/character"` as its import

### Requirement: Package follows monorepo conventions
The `apps/dnd-cli` package SHALL conform to monorepo package conventions: `@ageorgedev/` scope, pinned dependency versions matching the workspace, and a `dev` script.

#### Scenario: Package is registered in workspace
- **WHEN** `yarn install` is run at the monorepo root
- **THEN** `@ageorgedev/dnd-cli` is resolved as a workspace package
