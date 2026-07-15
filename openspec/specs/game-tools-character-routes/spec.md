## Purpose

Routes the D&D character list and individual character sheets under the game-tools app's shared navigation layout, sourced from a centralized character data map.

## Requirements

### Requirement: Character routes render inside the shared nav layout
Character routes under `/dnd/characters/` SHALL be nested under the `_public` layout route so the navigation header is present.

#### Scenario: Character route has nav header
- **WHEN** a user navigates to `/dnd/characters/example`
- **THEN** the navigation header is rendered above the character sheet

### Requirement: Character list route at /dnd/characters
A route SHALL exist at `/dnd/characters` that renders all available character snapshots, sourced from the centralized character data map at `apps/game-tools/src/data/dnd-characters/index.ts` — no hardcoded list, and no reliance on route-level `staticData`.

Presentation details (level grouping, sort order, card content, layout) are specified by the `dnd-character-roster` capability.

#### Scenario: Character list renders known characters
- **WHEN** a user navigates to `/dnd/characters`
- **THEN** a card is shown for each character snapshot present in the centralized character data map
