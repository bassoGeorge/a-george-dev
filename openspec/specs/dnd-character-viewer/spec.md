## Requirements

### Requirement: Character sheet route exists at /dnd/characters/example
The app SHALL serve a route at `/dnd/characters/example` that renders the `ExampleSheet` component from `@ageorgedev/dnd-character-sheet`.

#### Scenario: Route is accessible
- **WHEN** a user navigates to `/dnd/characters/example`
- **THEN** the page renders the example character sheet without errors

### Requirement: Character sheet route has no navigation shell
The route SHALL render with a navigation header supplied by the `_public` layout, but that header SHALL be hidden during printing via `print:hidden` so only the character sheet content appears on a printed page.

#### Scenario: No nav elements present
- **WHEN** the `/dnd/characters/example` page is printed
- **THEN** there are no `<nav>`, header, or footer elements visible in the printed output

### Requirement: Character sheet route is print-friendly
The route SHALL be suitable for printing — the navigation header is hidden via CSS so only the character sheet content is printed.

#### Scenario: Print layout is clean
- **WHEN** the user triggers browser print on `/dnd/characters/example`
- **THEN** only the character sheet content is visible, with no navigation or UI chrome
