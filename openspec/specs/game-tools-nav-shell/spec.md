## Purpose

The shared navigation layout for game-tools — header, breadcrumbs, and DnD-specific header actions (print/spellbook) — used by all public routes, with the header hidden on print.

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

### Requirement: Navigation header renders a breadcrumb trail for the active route
The `_public` layout header SHALL render a breadcrumb trail (built from `@ageorgedev/design-system/ui/breadcrumb`) that reflects the active route hierarchy. The trail SHALL be derived from the current TanStack Router matches — not hard-coded — so that nested routes automatically contribute crumbs. The final crumb SHALL render as `BreadcrumbPage` (non-link, marked `aria-current="page"`); all preceding crumbs SHALL render as `BreadcrumbLink` that navigate to the corresponding route. The layout SHALL delegate this rendering to a dedicated `HeaderBreadcrumbs` component that reads `useMatches()` internally, so that `_public.tsx` itself does not derive or render breadcrumb items.

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

#### Scenario: Breadcrumb rendering is encapsulated in a dedicated component
- **WHEN** a developer inspects `apps/game-tools/src/routes/_public.tsx`
- **THEN** the file mounts a `HeaderBreadcrumbs` component instead of calling `useMatches()` or deriving crumbs inline, and the breadcrumb derivation and JSX live in a sibling file that owns them

### Requirement: Breadcrumb link on non-leaf crumb navigates
The `BreadcrumbLink` used for non-leaf crumbs SHALL be wired to TanStack Router `Link` (via the component's `asChild` prop) so that activating the crumb performs client-side navigation to the target route.

#### Scenario: Clicking the DnD Characters crumb navigates back to the index
- **WHEN** a user is on `/dnd/characters/zoynari` and clicks the `DnD Characters` breadcrumb link
- **THEN** the app navigates to `/dnd/characters` without a full page reload

### Requirement: DnD-specific header actions are encapsulated in a dedicated component
The `_public` layout SHALL delegate rendering of DnD-specific header controls (the spellbook download link and the character-sheet print button) to a dedicated `DndHeaderActions` component. The layout SHALL mount this component unconditionally; the component itself SHALL read `useMatches()` and decide, per-control, whether to render — the layout SHALL NOT compute `isCharacterSheet`, `spellBookUrl`, or any equivalent flag on behalf of the component. When neither control applies to the active route, the component SHALL render no visible output.

#### Scenario: Layout does not compute DnD-action visibility itself
- **WHEN** a developer inspects `apps/game-tools/src/routes/_public.tsx`
- **THEN** the file mounts a `DndHeaderActions` component with no props derived from router matches, and the file itself contains no logic inspecting `staticData.spellBookUrl` or `_sheet` route identifiers

#### Scenario: Component renders nothing on non-DnD routes
- **WHEN** a user navigates to `/` (a route with no `spellBookUrl` and no `_sheet` in its route id)
- **THEN** `DndHeaderActions` produces no visible header controls, while the rest of the header (brand link, breadcrumbs area, theme switcher) is unaffected

#### Scenario: Component still honors existing print and spellbook visibility rules
- **WHEN** a user navigates to a character sheet route whose match hierarchy exposes a `staticData.spellBookUrl` and whose `routeId` includes `_sheet`
- **THEN** `DndHeaderActions` renders both the spellbook download link and the print button, matching the behavior described in the `character-sheet-print` and `character-spellbook-download` capabilities
