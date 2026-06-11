## ADDED Requirements

### Requirement: Character routes render inside the shared nav layout
Character routes under `/dnd/characters/` SHALL be nested under the `_public` layout route so the navigation header is present.

#### Scenario: Character route has nav header
- **WHEN** a user navigates to `/dnd/characters/example`
- **THEN** the navigation header is rendered above the character sheet

### Requirement: Shell route exists at /dnd/characters
A route SHALL exist at `/dnd/characters` as a placeholder for the future character list page.

#### Scenario: Shell route is accessible
- **WHEN** a user navigates to `/dnd/characters`
- **THEN** the page renders without a 404 error
