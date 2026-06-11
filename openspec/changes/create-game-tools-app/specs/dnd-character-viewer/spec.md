## ADDED Requirements

### Requirement: Character sheet route exists at /dnd/characters/example
The app SHALL serve a route at `/dnd/characters/example` that renders the `ExampleSheet` component from `@ageorgedev/dnd-character-sheet`.

#### Scenario: Route is accessible
- **WHEN** a user navigates to `/dnd/characters/example`
- **THEN** the page renders the example character sheet without errors

### Requirement: Character sheet route has no navigation shell
The route SHALL render without any surrounding navigation, header, or footer — only the character sheet component and the document shell (html/head/body).

#### Scenario: No nav elements present
- **WHEN** the `/dnd/characters/example` page is rendered
- **THEN** there are no `<nav>`, header, or footer elements wrapping the character sheet

### Requirement: Character sheet route is print-friendly
The route SHALL be suitable for printing — no interactive chrome that would appear on a printed page.

#### Scenario: Print layout is clean
- **WHEN** the user triggers browser print on `/dnd/characters/example`
- **THEN** only the character sheet content is visible, with no navigation or UI chrome
