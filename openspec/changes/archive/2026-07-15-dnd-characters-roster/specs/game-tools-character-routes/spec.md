## REMOVED Requirements

### Requirement: Character routes declare staticData metadata
**Reason**: No route in this codebase declares `staticData` — character data is centrally aggregated in `apps/game-tools/src/data/dnd-characters/index.ts`, not discovered by inspecting sibling route files. This requirement never matched the actual implementation.
**Migration**: N/A — character data is added by creating/updating an entry in `apps/game-tools/src/data/dnd-characters/index.ts`, not by declaring route `staticData`.

## MODIFIED Requirements

### Requirement: Character list route at /dnd/characters
A route SHALL exist at `/dnd/characters` that renders all available character snapshots, sourced from the centralized character data map at `apps/game-tools/src/data/dnd-characters/index.ts` — no hardcoded list, and no reliance on route-level `staticData`.

Presentation details (level grouping, sort order, card content, layout) are specified by the `dnd-character-roster` capability.

#### Scenario: Character list renders known characters
- **WHEN** a user navigates to `/dnd/characters`
- **THEN** a card is shown for each character snapshot present in the centralized character data map
