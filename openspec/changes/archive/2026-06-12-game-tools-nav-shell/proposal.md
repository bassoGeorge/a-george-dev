## Why

The `game-tools` app has a bare stub home page and no navigation shell, making it hard to browse between tools. Adding a nav layout and a home page gives the app a usable entry point as more game tools are added.

## What Changes

- Add a `_public` layout route wrapping shared pages (home, future tool sections) with a sticky header nav and `ThemeSwitcher`
- Rework the home page to list game-tool sections, starting with a DnD Characters section that links to the current character sheet
- Move character sheet routes from `_noLayout` to a new `_withNav` layout that shows the nav shell but hides it on print via `@media print` (Tailwind `print:hidden`)
- Add a shell character list route at `/dnd/characters` as a placeholder for future character index pages

## Capabilities

### New Capabilities
- `game-tools-nav-shell`: Shared navigation layout (`_public`) with header, section links, and ThemeSwitcher; applied to home and future non-print routes
- `game-tools-home-page`: Home page with a DnD Characters section card linking to `/dnd/characters/example`
- `game-tools-character-routes`: Character routes under a nav-aware layout that hides navigation on print

### Modified Capabilities
- `dnd-character-viewer`: Character sheet routes gain a nav shell; the existing "no navigation" requirement changes to "navigation is hidden on print"

## Impact

- `apps/game-tools/src/routes/` — new `_public.tsx` layout, updated `index.tsx`, new `_public/dnd/` placeholder, reworked character routes from `_noLayout` to a nav-aware layout
- `openspec/specs/dnd-character-viewer/spec.md` — requirement update: nav present but `print:hidden`, not absent
- No package changes; consumes existing `@ageorgedev/design-system` components (`ThemeSwitcher`, `TiltCard`, `ShortNameLogo` or equivalent)
