## Purpose

Establishes `apps/game-tools` as its own TanStack Start workspace app on port 3001, with the same theming and prerendering setup as the main site.

## Requirements

### Requirement: App exists as a Turborepo workspace package
The `apps/game-tools` directory SHALL be a valid Yarn workspace package named `@ageorgedev/game-tools`, included in the monorepo's workspace glob.

#### Scenario: Package is discoverable by Yarn
- **WHEN** `yarn workspaces list` is run from the repo root
- **THEN** `@ageorgedev/game-tools` appears in the output

### Requirement: App runs on port 3001 in development
The dev server SHALL start on port 3001 to avoid conflicts with `apps/ageorgedev` (port 3000).

#### Scenario: Dev server starts on correct port
- **WHEN** `yarn dev` is run inside `apps/game-tools`
- **THEN** the app is served at `http://localhost:3001`

### Requirement: App uses TanStack Start with prerendering
The app SHALL use `@tanstack/react-start` with the Vite plugin and prerendering enabled, matching the `apps/ageorgedev` configuration.

#### Scenario: App builds to static output
- **WHEN** `yarn build` is run inside `apps/game-tools`
- **THEN** the build completes without errors and produces a prerendered output

### Requirement: App includes design-system theming
The app SHALL include `THEME_INIT_SCRIPT`, `ThemeProvider`, and `GlobalProviders`, preventing a flash of unstyled theme on load.

#### Scenario: Theme is applied before first paint
- **WHEN** the app loads in a browser with `localStorage.theme = "dark"`
- **THEN** the `dark` class is present on `<html>` before any React hydration

### Requirement: App Tailwind sources are scoped to used packages
The app's `styles.css` SHALL include `@source` directives only for packages it actually consumes: the app itself, `design-system`, and `dnd-character-sheet`.

#### Scenario: Tailwind classes from dnd-character-sheet render correctly
- **WHEN** a route renders a component from `@ageorgedev/dnd-character-sheet`
- **THEN** all Tailwind utility classes used by that component are present in the built CSS
