## ADDED Requirements

### Requirement: Shared feat registry
The system SHALL provide a single module (`apps/game-tools/src/data/dnd-characters/common/common-feats.ts`) that exports every feat used by two or more character data files as a named `Feature` constant. Character data files SHALL import these constants rather than inline feat definitions.

#### Scenario: A feat used by multiple characters is imported, not duplicated
- **WHEN** two or more character files reference the same feat (e.g., "Alert")
- **THEN** the feat SHALL be defined once as an exported `Feature` constant in `common-feats.ts`
- **AND** each character file SHALL import that constant and place it directly in its `feats` array without redefining the description

#### Scenario: A feat used by only one character stays local
- **WHEN** a feat appears on only a single character today
- **THEN** the feat MAY remain inlined in that character's file, and SHALL NOT be added to the shared registry until a second character adopts it

### Requirement: Shared class-feature registry with factories for level-dependent variation
The system SHALL provide a module (`apps/game-tools/src/data/dnd-characters/common/common-class-features.ts`) that exports class features shared across characters. Features with a per-character parameter (uses-per-rest count, list of chosen weapon masteries, list of chosen maneuvers) SHALL be exposed as factory functions that return a fresh `Feature` object.

#### Scenario: An identical class feature is exported as a constant
- **WHEN** two characters of the same class+level have byte-identical text for a class feature (e.g., Second Wind for Fighter 3)
- **THEN** the feature SHALL be exported as a single named `Feature` constant
- **AND** both character files SHALL import it directly

#### Scenario: A class feature with a per-character parameter is exported as a factory
- **WHEN** two characters share a class feature that differs only in a small parameter (e.g., Weapon Mastery with different chosen masteries; Channel Divinity with different uses-per-rest)
- **THEN** the module SHALL export a factory function accepting that parameter and returning a `Feature`
- **AND** the factory SHALL return a fresh object on each call (no shared mutable reference)

### Requirement: Shared species-trait registry
The system SHALL provide a module (`apps/game-tools/src/data/dnd-characters/common/common-species-traits.ts`) that exports species traits shared across characters of the same species (or subrace-parameterised via factory).

#### Scenario: An identical species trait is imported by same-species characters
- **WHEN** two characters share a species trait with identical text (e.g., Fey Ancestry across two Elf characters)
- **THEN** the trait SHALL be defined once as a named `Feature` constant and imported by each character file

#### Scenario: A subrace-parameterised trait is exported as a factory
- **WHEN** a species trait varies only in a numeric parameter across subraces (e.g., Darkvision range)
- **THEN** it SHALL be exposed as a factory function taking that parameter and returning a `Feature`

### Requirement: Barrel export for shared character data
The `common/` directory SHALL provide an `index.ts` that re-exports the public surface of `common-feats.ts`, `common-class-features.ts`, and `common-species-traits.ts` so character files can import from `'../common'`.

#### Scenario: Character file imports from the barrel
- **WHEN** a character data file needs a shared feat, class feature, or species trait
- **THEN** it SHALL be able to import the required symbols from `'../common'` in a single import statement

### Requirement: Rendered character sheets are unchanged
Extracting duplicated features into the shared registry SHALL NOT change the rendered output of any existing character sheet. Any wording differences discovered during extraction between two "identical" entries SHALL be resolved explicitly (canonical wording chosen) before the extraction is applied.

#### Scenario: Post-refactor character sheet matches pre-refactor
- **WHEN** a character file is refactored to import shared definitions
- **THEN** its rendered sheet SHALL display the same names, descriptions, casting times, durations, costs, and resources as before the refactor

#### Scenario: Wording divergence is resolved explicitly
- **WHEN** two source characters had drifted wording for what is conceptually the same feature
- **THEN** a single canonical wording SHALL be chosen and recorded in the change's tasks before the shared constant is authored
