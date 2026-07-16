## ADDED Requirements

### Requirement: Roster card renders a primary-class background watermark
Each roster card SHALL render the primary class's icon (from `CLASS_ICONS`, resolved per the `dnd-class-icons` primary-class rule) as a large, low-opacity background graphic, colored using that class's `CLASS_COLORS` entry. The icon SHALL be positioned so it bleeds off the card's right-hand edge and SHALL render behind the card's existing text content (name, description, class badges) without obscuring readability of that text.

#### Scenario: Single-class character shows that class's icon
- **WHEN** a roster card is rendered for a character whose only class is Bard
- **THEN** the card renders the Bard icon as a background watermark, colored with the Bard `CLASS_COLORS` value

#### Scenario: Multiclass character shows the primary class's icon only
- **WHEN** a roster card is rendered for a character with Monk (level 2) and Fighter (level 3)
- **THEN** the card renders only the Fighter icon as the background watermark, not the Monk icon

#### Scenario: Watermark does not obscure card text
- **WHEN** a roster card renders its background watermark
- **THEN** the character's name, description, and class badges remain fully legible, unobstructed by the watermark

#### Scenario: Watermark does not overflow the card's visible bounds
- **WHEN** a roster card renders its oversized background watermark
- **THEN** the watermark is clipped to the card's rectangular bounds and does not visibly overlap neighboring cards in the grid

### Requirement: Class badge pills remain unchanged
The existing per-class text badges SHALL continue to render class name only, with no icon and no per-class color coding, unaffected by the addition of the background watermark.

#### Scenario: Badges stay text-only
- **WHEN** a roster card with a background watermark is rendered
- **THEN** its class badge pills still render as plain text pills with the existing shared badge styling, not per-class colors or icons
