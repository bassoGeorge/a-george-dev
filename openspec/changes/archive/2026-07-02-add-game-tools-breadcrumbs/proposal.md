## Why

The game-tools app currently offers no in-context wayfinding once a user drills into a nested route (e.g. an individual character sheet). Adding breadcrumbs to the header gives users a clear sense of location within the app and a one-click path back to parent sections.

## What Changes

- Add a breadcrumb trail to the header inside `apps/game-tools/src/routes/_public.tsx`, positioned inline with the existing header row (alongside the current "Game Tools" home link).
- Consume the `Breadcrumb*` primitives from `@ageorgedev/design-system/ui/breadcrumb`.
- Derive breadcrumb items from the active TanStack Router matches:
  - Home route (`/`): no breadcrumbs (or just root marker).
  - `/dnd/characters`: `DnD Characters` (current page).
  - `/dnd/characters/<name>`: `DnD Characters` (link) → `<Character Name>` (current page, from route `staticData.character.name`).
- Breadcrumbs live inside the existing header, so they inherit the `print:hidden` behavior automatically — no additional print handling needed.

## Capabilities

### New Capabilities

_(none — this extends existing nav shell behavior)_

### Modified Capabilities

- `game-tools-nav-shell`: header now also renders a breadcrumb trail reflecting the active route hierarchy.

## Impact

- **Code**: `apps/game-tools/src/routes/_public.tsx` (add breadcrumb rendering + route-match derivation).
- **Dependencies**: uses existing `@ageorgedev/design-system` `Breadcrumb` components (already available on `feat/pdfs`); no new package deps.
- **Routes touched (read only)**: `_public/dnd/characters/index.tsx` and `_public/dnd/characters/_sheet.tsx` (their `staticData.character.name` is read for labels — no changes to their contract).
- **Tests**: existing `game-tools-nav-shell` scenarios still hold; new scenarios added for breadcrumb presence and labels.
