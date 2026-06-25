## ADDED Requirements

### Requirement: EJS context exposes full derived stats
The EJS render context SHALL include all fields from `DerivedStats` spread flat as top-level variables, making ability modifiers, proficiency bonus, saving throws, skills, spell stats, and level data available in feature/feat/species-trait description templates.

#### Scenario: Proficiency bonus is accessible
- **WHEN** a description template references `<%= proficiencyBonus %>`
- **THEN** the rendered output contains the character's proficiency bonus as a number

#### Scenario: Ability modifier is accessible
- **WHEN** a description template references `<%= abilityModifiers.Strength %>`
- **THEN** the rendered output contains the character's Strength modifier as a number

#### Scenario: Saving throw is accessible
- **WHEN** a description template references `<%= savingThrows.Wisdom %>`
- **THEN** the rendered output contains the character's Wisdom saving throw modifier

#### Scenario: Skill modifier is accessible
- **WHEN** a description template references `<%= skills.Perception %>`
- **THEN** the rendered output contains the character's Perception skill modifier

#### Scenario: Spell save DC is accessible when character has spellcasting
- **WHEN** a description template references `<%= spellSaveDC %>` and the character has a spellcasting configuration
- **THEN** the rendered output contains the character's spell save DC as a number

### Requirement: `level` field is on DerivedStats
`DerivedStats` SHALL include a `level` field of type `{ total: number } & Record<string, number>` providing the total character level and per-class level breakdown. `characterLevel` SHALL NOT exist on `DerivedStats`.

#### Scenario: level.total reflects sum of class levels
- **WHEN** `calculateStats` is called on a character with multiple classes
- **THEN** `stats.level.total` equals the sum of all class levels

#### Scenario: level includes per-class breakdown
- **WHEN** `calculateStats` is called on a character with class "Cleric" at level 3
- **THEN** `stats.level.Cleric` equals 3

#### Scenario: characterLevel does not exist on DerivedStats
- **WHEN** `calculateStats` is called
- **THEN** the returned object does not have a `characterLevel` property
