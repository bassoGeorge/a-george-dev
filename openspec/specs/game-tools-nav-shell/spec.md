## Requirements

### Requirement: App has a shared layout route with a navigation header
The app SHALL have a `_public.tsx` layout route that renders a header containing at minimum: a home link, a nav section with links to game-tool sections, and a `ThemeSwitcher`. All public pages (home, DnD section, character routes) SHALL be nested under this layout.

#### Scenario: Header renders on home page
- **WHEN** a user navigates to `/`
- **THEN** a header element is visible containing navigation links and a theme switcher

#### Scenario: Header renders on character routes
- **WHEN** a user navigates to `/dnd/characters/example`
- **THEN** the same header is visible above the character sheet content

### Requirement: Navigation header is hidden on print
The header element inside the `_public` layout SHALL carry the `print:hidden` Tailwind utility (or equivalent `@media print { display: none }` style) so it does not appear when a page is printed.

#### Scenario: Header absent in print output
- **WHEN** a user triggers browser print on any route under `_public`
- **THEN** the header is not visible in the print preview or printed output

### Requirement: Nav includes a DnD Characters link
The navigation header SHALL include a link to `/dnd/characters`.

#### Scenario: DnD Characters link navigates correctly
- **WHEN** a user clicks the DnD Characters link in the nav
- **THEN** the browser navigates to `/dnd/characters`
