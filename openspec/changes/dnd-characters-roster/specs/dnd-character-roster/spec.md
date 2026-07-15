## ADDED Requirements

### Requirement: Character list groups snapshots by level
The `/dnd/characters` route SHALL group character snapshots into sections by level, ordered ascending. A level section SHALL render only if at least one snapshot exists at that level; levels with no snapshots SHALL NOT render an empty section.

#### Scenario: Multiple levels present
- **WHEN** saved snapshots exist at levels 2, 3, and 5
- **THEN** three sections render in order: "Level 2", "Level 3", "Level 5"

#### Scenario: No snapshots at a level
- **WHEN** no snapshot exists at level 4
- **THEN** no "Level 4" section renders

### Requirement: One card per saved snapshot, not per unique character
Each saved character snapshot SHALL render as its own card. A character with snapshots saved at multiple levels SHALL appear once per level section that contains one of its snapshots.

#### Scenario: Character saved at two levels
- **WHEN** a character has snapshots saved at level 2 and level 3
- **THEN** a card for that character appears under the "Level 2" section and a separate card appears under the "Level 3" section

### Requirement: Cards within a level section sort alphabetically by name
Within a single level section, cards SHALL be ordered alphabetically by character name.

#### Scenario: Multiple characters at the same level
- **WHEN** a level section contains "Zoynari" and "Claw"
- **THEN** "Claw" renders before "Zoynari"

### Requirement: Roster card content
Each roster card SHALL display the character's name, species, one badge per class (class name only, no subclass, no color coding), and a description line.

#### Scenario: Multiclass character
- **WHEN** a character has classes Fighter and Rogue
- **THEN** the card shows two badges: "Fighter" and "Rogue"

### Requirement: Level sections render in a responsive grid layout
Cards within a level section SHALL render in a responsive grid/wrap layout, rather than a single-column list.

#### Scenario: Level section with several characters
- **WHEN** a level section contains more cards than fit in one row at the current viewport width
- **THEN** cards wrap onto additional rows within that section

### Requirement: Roster cards reuse the shared Card component
Each roster card SHALL render `packages/design-system/src/cards/Card.tsx` as its root element rather than a bespoke bordered/shadowed element, so roster cards stay visually consistent with `Card` usage elsewhere in the app.

#### Scenario: Card styling comes from the shared component
- **WHEN** a roster card is rendered
- **THEN** its border and shadow styling are inherited from `Card`, not redefined locally
