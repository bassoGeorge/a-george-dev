## Context

The game-tools app (`apps/game-tools`) uses TanStack Router with file-based routing. The shared layout at `_public.tsx` renders a header bar with nav links and a theme switcher. Individual character sheet pages (`example.tsx`, `omarin-kenate.tsx`) currently live flat inside `characters/` with no sub-layout. The `StandardCharacterSheet` component already renders correctly for 2-page A4 print — no print CSS changes are needed.

## Goals / Non-Goals

**Goals:**
- Surface a Print button in the existing header bar, visible only on individual character sheet pages
- Keep implementation client-only (`window.print()`)
- Preserve all existing URLs

**Non-Goals:**
- PDF generation or download (no html2canvas, jsPDF, etc.)
- Print layout changes to `StandardCharacterSheet`
- iOS Safari print UX improvements

## Decisions

### 1. Pathless layout route (`_sheet.tsx`) to group character pages

A `_sheet.tsx` layout route is created at `characters/_sheet.tsx` with TanStack Router's pathless (`_`-prefixed) convention. Character files move into `_sheet/`. The `index.tsx` list page stays in `characters/` and is unaffected.

**Why over alternatives:**
- Adding the button to every individual character file would require updating each file every time a new character is added
- A wrapper component (not a route) would not integrate with `useChildMatches()` in the header

### 2. `useChildMatches()` to detect active character sheet in the header

The header in `_public.tsx` calls `useChildMatches()` and checks whether any match's `routeId` includes `_sheet`. If so, the Print button is rendered.

**Why over alternatives:**
- URL pattern matching (`pathname.startsWith('/dnd/characters/')`) is fragile — it would also match the list page
- React context from `_sheet.tsx` works but adds unnecessary plumbing when the router already has the structural information

### 3. `window.print()` with no extra dependencies

The existing Tailwind print utilities (`print:hidden`) and the pre-tuned layout are sufficient. The Print button itself carries `print:hidden` so it disappears from the printed output.

## Risks / Trade-offs

- **Route ID coupling** → The header checks for `_sheet` in the route ID. If the layout file is renamed, the check must be updated. Mitigation: the check is a single `includes('_sheet')` string in one place.
- **Route tree regeneration** → Moving files triggers TanStack Router's route tree regeneration (`routeTree.gen.ts`). This is automatic via the dev server but must be confirmed before committing. Mitigation: run dev server once after the move to verify.

## Open Questions

<!-- none — all decisions resolved during exploration -->
