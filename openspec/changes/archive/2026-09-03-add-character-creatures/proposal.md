## Why

Characters such as druids, artificers, and familiar users can depend on associated creatures whose combat statistics are currently unavailable from their character sheet. Adding compact, printable creature stat blocks keeps those frequently used rules alongside the character without forcing creatures through player-character calculation models.

## What Changes

- Add an optional collection of display-only creatures to the character data model.
- Define a small creature interface that reuses existing ability, skill, size, and hit-point concepts where appropriate while keeping all properties except the creature name optional.
- Support common creature statistics, flexible summary notation, generic secondary-detail rows, and shared named-description entries for traits and action categories.
- Render associated creatures as compact stat blocks on additional printable pages after the standard character sheet, without changing sheets for characters that have no creatures.
- Add a 2024 SRD Black Bear to package example data and test fixtures to exercise the creature presentation without changing an existing character's canon.

## Capabilities

### New Capabilities

- `character-creature-stat-blocks`: Associates lightweight creature data with a character and presents those creatures as compact, printable stat blocks.

### Modified Capabilities

- `dnd-character-sheet-package`: The package's public character model and assembled standard sheet gain optional creature data and rendering.
- `character-sheet-print`: Printed character sheets conditionally include associated-creature pages after the existing character pages.

## Impact

- Affects the public TypeScript API and exports in `packages/dnd-character-sheet`.
- Adds creature stat-block components to the assembled `StandardCharacterSheet`.
- Extends package examples and unit tests using data adapted from the official 2024 SRD 5.2.1 Black Bear.
- Does not add dependencies, alter routes, or involve creatures in character effects, derived statistics, resources, or text enrichment.
