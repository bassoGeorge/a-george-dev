## Context

`apps/game-tools` currently has a bare `index.tsx` (stub home page), a `__root.tsx` (document shell with theming), and a single character sheet route under `_noLayout`. The `_noLayout` prefix is a TanStack Router pathless layout group that renders children with no surrounding chrome — matching the pattern used in `apps/ageorgedev` for the print-only resume.

The `apps/ageorgedev` pattern provides a reference: `_public.tsx` is a layout route that renders a header + `<Outlet />`, and pages nest inside `_public/`. The design-system already provides `TiltCard`, `ThemeSwitcher`, and `ShortNameLogo` (or text equivalent) for composing a header consistent with the main site.

## Goals / Non-Goals

**Goals:**
- Single shared layout route (`_public.tsx`) wrapping all pages including character routes
- Header nav with `print:hidden` so character sheets print cleanly without any UI chrome
- Home page with a DnD Characters section card that links to the existing character route
- Shell route at `/dnd/characters` as a placeholder for a future character list
- Consistent look-and-feel with `apps/ageorgedev` using shared design-system components

**Non-Goals:**
- Building the character list page (content and data are out of scope)
- Creating new character data or routes beyond the existing example
- Changing the DnD character sheet package
- Authentication, persistence, or server-side logic

## Decisions

### One layout for all routes, nav is `print:hidden`

**Decision**: Use a single `_public.tsx` layout for home AND character routes. The `<header>` element gets `print:hidden`. Character routes are moved from `_noLayout/dnd/characters/` to `_public/dnd/characters/`.

**Alternatives considered**:
- Keep `_noLayout` for character routes and add a separate `_public` for other pages. This avoids changing existing character route paths and file locations, but requires two parallel layout groups and a more complex file tree.
- Use a `_withNav` layout group separate from `_public`. Adds unnecessary indirection — the print behavior is just one CSS rule, not a reason for a separate layout.

**Rationale**: Simpler file tree, one layout to maintain, print hiding via Tailwind `print:hidden` is the standard approach. The URL `/dnd/characters/example` is unchanged regardless of which layout group the file lives in (TanStack Router pathless groups don't affect URLs).

### Home page structure: section cards, not a full grid

**Decision**: The home page renders a simple section heading + a card for each game system (currently just DnD). Each section card links to the primary route for that system.

**Rationale**: The DnD section links directly to the example character route for now. When a character list page is built, the link destination changes — the card structure stays the same. Avoids over-engineering the layout before there's more than one character.

### Character list shell route at `/dnd/characters`

**Decision**: Add `_public/dnd/characters/index.tsx` as a placeholder (e.g. "Coming soon" text or redirect to example for now).

**Rationale**: The home page DnD section should link to a logical index URL rather than directly to the example character. The shell route establishes the URL early; it can be fleshed out when a real character list is built.

## Risks / Trade-offs

- **Moving character route file location** → URL is unchanged (pathless group); TanStack Router re-generates `routeTree.gen.ts` automatically on next dev/build run. Low risk.
- **`print:hidden` relies on Tailwind CSS** → Already used throughout the design system; no new dependency. Low risk.
- **Home page links to `/dnd/characters` shell route** → If shell route is skipped, the link 404s. Mitigation: create the shell route in the same change.

## Open Questions

None — scope is well-defined. Character list page content is deferred to a future change.
