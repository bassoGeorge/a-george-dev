## MODIFIED Requirements

### Requirement: All original components and types are exported
The package SHALL preserve the public API surface that was present in the original `@dnd-tooling/character-sheet` package and SHALL additionally export the public creature types needed for consumers to author associated creature data.

#### Scenario: Public exports are accessible
- **WHEN** a consumer imports from `@ageorgedev/dnd-character-sheet`
- **THEN** all previously exported symbols (CharacterSheet, StandardCharacterSheet, component primitives, types, calculateStats) are available

#### Scenario: Creature types are accessible
- **WHEN** a consumer authors associated creature data
- **THEN** the creature and creature-entry types are importable from `@ageorgedev/dnd-character-sheet`

