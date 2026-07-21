## Purpose

The character roster page at `/dnd/characters` groups saved character snapshots by level and renders them as cards in a responsive grid, reusing the shared TiltCard component.

## Requirements

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
Each roster card SHALL display the character's name, species, one badge per class (class name only, no subclass), colored per that class's `DndClassColors` entry, and a description line.

#### Scenario: Multiclass character
- **WHEN** a character has classes Fighter and Rogue
- **THEN** the card shows two badges: "Fighter" and "Rogue", each colored with its own class's `DndClassColors` surface/text

### Requirement: Level sections render in a responsive grid layout
Cards within a level section SHALL render in a responsive grid/wrap layout, rather than a single-column list.

#### Scenario: Level section with several characters
- **WHEN** a level section contains more cards than fit in one row at the current viewport width
- **THEN** cards wrap onto additional rows within that section

### Requirement: Roster cards reuse the shared TiltCard component
Each roster card SHALL render `packages/design-system/src/cards/TiltCard.tsx` as its root element, with `interactive` enabled and no `shape` set (rendering as a plain rectangle), rather than a bespoke bordered/shadowed element — so roster cards stay visually consistent with `TiltCard` usage elsewhere in the app.

#### Scenario: Card styling comes from the shared component
- **WHEN** a roster card is rendered
- **THEN** its border, shadow, and hover-lift styling are inherited from `TiltCard`, not redefined locally

#### Scenario: Roster card has no skewed shape
- **WHEN** a roster card is rendered
- **THEN** no `shape` prop is passed to `TiltCard`, so the card renders as a plain rectangle

### Requirement: Roster card renders a primary-class background watermark
Each roster card SHALL render the primary class's icon (from `CLASS_ICONS`, resolved per the `dnd-class-icons` primary-class rule) as a large, low-opacity background graphic, colored using that class's `DndClassColors` entry. The icon SHALL be positioned so it bleeds off the card's right-hand edge and SHALL render behind the card's existing text content (name, description, class badges) without obscuring readability of that text.

#### Scenario: Single-class character shows that class's icon
- **WHEN** a roster card is rendered for a character whose only class is Bard
- **THEN** the card renders the Bard icon as a background watermark, colored with the Bard `DndClassColors` value

#### Scenario: Multiclass character shows the primary class's icon only
- **WHEN** a roster card is rendered for a character with Monk (level 2) and Fighter (level 3)
- **THEN** the card renders only the Fighter icon as the background watermark, not the Monk icon

#### Scenario: Watermark does not obscure card text
- **WHEN** a roster card renders its background watermark
- **THEN** the character's name, description, and class badges remain fully legible, unobstructed by the watermark

#### Scenario: Watermark does not overflow the card's visible bounds
- **WHEN** a roster card renders its oversized background watermark
- **THEN** the watermark is clipped to the card's rectangular bounds and does not visibly overlap neighboring cards in the grid

### Requirement: Class badges are colored per class, without icons
Each per-class text badge SHALL render its class name only (no subclass, no icon), with its background/text colors set from that class's `DndClassColors` entry (`surface` background, `onSurfaceText` foreground). This is independent of the primary-class background watermark.

#### Scenario: Badges are text-only but color-coded
- **WHEN** a roster card with a background watermark is rendered
- **THEN** its class badge pills render as plain text (no icon), each colored per its own class's `DndClassColors` entry, not a single shared neutral color

#### Scenario: Different classes render with different badge colors
- **WHEN** a roster card shows badges for two classes in different `DndClassColors` groups (e.g. Fighter and Monk)
- **THEN** the two badges render with visibly different background/text color classes
