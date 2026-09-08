## Purpose

Defines lightweight creature data associated with a D&D character and its compact, printable stat-block presentation.

## Requirements

### Requirement: Characters can carry associated creature data
The character model SHALL expose an optional ordered `creatures` collection. Each creature MUST require only a name; all identity, combat, ability, secondary-statistic, and rules-section properties MUST be optional.

#### Scenario: Character has no associated creatures
- **WHEN** character data omits `creatures` or provides an empty collection
- **THEN** the character remains valid and its rendered sheet contains no creature stat blocks

#### Scenario: Character has multiple associated creatures
- **WHEN** character data contains multiple creatures
- **THEN** the rendered stat blocks preserve the creatures' authored order

#### Scenario: Minimal creature is authored
- **WHEN** a creature contains only a name
- **THEN** it is valid creature data and renders without placeholder values for omitted properties

### Requirement: Creature data supports compact monster statistics
The creature model SHALL support optional size, creature type, alignment, armor class, initiative, speed, hit points, ability scores, saving throw modifiers, skill modifiers, senses, languages, challenge information, proficiency bonus, and generic labelled detail rows. It SHALL reuse the package's `Ability`, `Skill`, and `Size` types where applicable, allow partial ability maps, and accept display-ready string notation for armor class, speed, and challenge rating.

#### Scenario: Rich creature summary is rendered
- **WHEN** a creature supplies core combat values, six abilities, skill modifiers, senses, languages, and challenge information
- **THEN** the stat block presents each supplied value using compact monster-stat-block notation

#### Scenario: Creature uses flexible notation
- **WHEN** armor class is `"15 (natural armor)"`, speed is `"30 ft., Fly 60 ft."`, or challenge rating is `"1/2"`
- **THEN** the supplied notation is displayed without numeric coercion or loss of annotation

#### Scenario: Creature supplies an uncommon detail
- **WHEN** a creature includes a generic detail row such as `{ label: "Resistances", value: "Fire" }`
- **THEN** the labelled value is displayed with the creature's other secondary statistics

### Requirement: Creature rules use shared named entries
The creature model SHALL support optional traits, actions, bonus actions, and reactions collections whose entries share a minimal name and rich-text description structure.

#### Scenario: Creature has actions and reactions
- **WHEN** a creature supplies named entries under actions and reactions
- **THEN** each collection renders under its corresponding heading and each entry renders its name followed by its description

#### Scenario: Creature omits a rules category
- **WHEN** a creature has no entries for a rules category
- **THEN** the stat block omits that category's heading

### Requirement: Creature data remains display-only
Creature data SHALL NOT participate in character effects, derived-stat calculation, resource calculation, or character text enrichment.

#### Scenario: Creature has complete combat statistics
- **WHEN** a character with associated creatures is processed by the character-sheet calculation pipeline
- **THEN** the character's effective data, derived statistics, and resources are unchanged by creature data

### Requirement: Associated creatures render in compact stat blocks
The standard character sheet SHALL render each associated creature in a compact, responsive stat block after the normal character content, with only populated fields and sections visible.

#### Scenario: Creature has partial data
- **WHEN** an associated creature omits abilities, challenge information, and reactions
- **THEN** its stat block renders the supplied fields without empty labels or reserved blank sections for the omitted data

#### Scenario: Multiple creature blocks fit the display
- **WHEN** a character has multiple associated creatures
- **THEN** their stat blocks flow responsively in authored order without overlapping or clipping content

### Requirement: Package examples demonstrate a 2024 creature
Package example data and component test fixtures SHALL include the Black Bear stat block adapted from the official 2024 SRD 5.2.1, without associating it with an existing game-tools character.

#### Scenario: Example sheet is rendered
- **WHEN** the package example character sheet is rendered
- **THEN** it demonstrates the Black Bear as an associated creature using the new stat-block presentation

