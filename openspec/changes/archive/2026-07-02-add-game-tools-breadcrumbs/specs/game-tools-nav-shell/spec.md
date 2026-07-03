## ADDED Requirements

### Requirement: Navigation header renders a breadcrumb trail for the active route
The `_public` layout header SHALL render a breadcrumb trail (built from `@ageorgedev/design-system/ui/breadcrumb`) that reflects the active route hierarchy. The trail SHALL be derived from the current TanStack Router matches — not hard-coded — so that nested routes automatically contribute crumbs. The final crumb SHALL render as `BreadcrumbPage` (non-link, marked `aria-current="page"`); all preceding crumbs SHALL render as `BreadcrumbLink` that navigate to the corresponding route.

#### Scenario: Character index shows current-page crumb
- **WHEN** a user navigates to `/dnd/characters`
- **THEN** the header renders a breadcrumb trail containing exactly one crumb, `DnD Characters`, rendered as the current page (non-link, `aria-current="page"`)

#### Scenario: Character sheet shows link + leaf crumb
- **WHEN** a user navigates to `/dnd/characters/<name>` for a character whose `staticData.character.name` is `Zoynari`
- **THEN** the header renders a breadcrumb trail with `DnD Characters` as a link to `/dnd/characters` followed by `Zoynari` as the current page (non-link)

#### Scenario: Character-sheet crumb label comes from route staticData
- **WHEN** a character route defines `staticData.character.name` as `Claw`
- **THEN** the leaf breadcrumb on that route displays `Claw`

#### Scenario: Home route shows no breadcrumb trail
- **WHEN** a user navigates to `/`
- **THEN** no breadcrumb list items are rendered in the header

### Requirement: Breadcrumb link on non-leaf crumb navigates
The `BreadcrumbLink` used for non-leaf crumbs SHALL be wired to TanStack Router `Link` (via the component's `asChild` prop) so that activating the crumb performs client-side navigation to the target route.

#### Scenario: Clicking the DnD Characters crumb navigates back to the index
- **WHEN** a user is on `/dnd/characters/zoynari` and clicks the `DnD Characters` breadcrumb link
- **THEN** the app navigates to `/dnd/characters` without a full page reload
