## Purpose

A game-tools home page that links into the DnD Characters section and renders inside the shared nav layout.

## Requirements

### Requirement: Home page has a DnD Characters section
The home page at `/` SHALL render a DnD Characters section that links to `/dnd/characters`.

#### Scenario: DnD section link is present
- **WHEN** a user visits `/`
- **THEN** a DnD Characters section is visible with a link that navigates to `/dnd/characters`

### Requirement: Home page renders inside the shared nav layout
The home page SHALL be a child route of `_public`, rendering with the navigation header present.

#### Scenario: Home page has nav
- **WHEN** a user visits `/`
- **THEN** the navigation header is rendered above the home page content
