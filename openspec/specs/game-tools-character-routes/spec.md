## Requirements

### Requirement: Character routes render inside the shared nav layout
Character routes under `/dnd/characters/` SHALL be nested under the `_public` layout route so the navigation header is present.

#### Scenario: Character route has nav header
- **WHEN** a user navigates to `/dnd/characters/example`
- **THEN** the navigation header is rendered above the character sheet

### Requirement: Character list route at /dnd/characters
A route SHALL exist at `/dnd/characters` that renders a list of all available character sheets. The list SHALL be dynamically built by inspecting sibling routes that carry a `staticData.character` object — no hardcoded list.

#### Scenario: Character list renders known characters
- **WHEN** a user navigates to `/dnd/characters`
- **THEN** a link is shown for each character route that declares `staticData.character` metadata

#### Scenario: Character link shows name and description
- **WHEN** the character list renders
- **THEN** each entry displays the character's `name`, `level`, and `description` from its `staticData.character` metadata

### Requirement: Character routes declare staticData metadata
Each individual character route SHALL declare a `staticData` object with a `character` key containing at minimum `name`, `level`, and `description`. This enables the character list to discover and display characters without a central registry.

#### Scenario: Route appears in character list
- **WHEN** a route file under `/dnd/characters/` exports a route with `staticData: { character: { name, level, description } }`
- **THEN** that character appears as a link on the `/dnd/characters` index page
