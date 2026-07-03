## Context

`apps/game-tools/src/routes/_public.tsx` currently owns four concerns in a single ~115-line file:

1. The layout shell (`<header>` + `<main>` + `<Outlet />`).
2. Breadcrumb derivation from `useMatches()` (`deriveCrumbs`, ~25 lines).
3. Rendering the breadcrumb trail with design-system primitives.
4. DnD-specific action icons: a spellbook download anchor (shown when any match exposes `staticData.spellBookUrl`) and a print button (shown when any match's `routeId` includes `_sheet`).

Both the breadcrumb block and the DnD action block scan `useMatches()` and could sensibly live next to the layout route. This change is a pure structural refactor triggered by developer request; there is no behavioral change to reach for.

## Goals / Non-Goals

**Goals:**
- Move breadcrumb derivation + rendering out of `_public.tsx` into a `HeaderBreadcrumbs` component.
- Move the spellbook download + print button block out of `_public.tsx` into a `DndHeaderActions` component that internally decides visibility from router matches. The parent layout should NOT need to know about `spellBookUrl` or `_sheet` route detection.
- Keep the resulting `_public.tsx` focused on shell composition (header container, brand link, actions area, `<main>`).
- Preserve all current behavior: same crumbs, same icons on the same routes, same accessibility labels, same print visibility.

**Non-Goals:**
- Changing the DOM structure or Tailwind classes of the header (a11y, print, and visual layout stay identical).
- Promoting either component to a shared package (`design-system`, `dnd-character-sheet`). They stay local to `apps/game-tools/src/routes/`.
- Introducing tests for the new components; existing e2e coverage exercises the header behavior end-to-end.
- Reworking `deriveCrumbs` logic itself — it moves as-is.

## Decisions

### Decision: Place new components in `apps/game-tools/src/components/`

The two new components live in `apps/game-tools/src/components/` (alongside the existing `GlobalProviders.tsx`), imported into `_public.tsx` via a relative path. This matches the project preference for keeping non-route components out of `src/routes/` unless there's a specific reason to colocate.

**Alternative considered**: Colocate as siblings of `_public.tsx` inside `apps/game-tools/src/routes/`. Rejected — TanStack Router's file-based routing treats any non-`-`-prefixed file in `src/routes/` as a route candidate and emits build warnings when they don't export a `Route`. Using the `-` prefix works but was disliked stylistically.

### Decision: `DndHeaderActions` reads router matches internally

The component calls `useMatches()` itself and decides:
- Render the spellbook anchor when some match has a non-empty string `staticData.spellBookUrl`.
- Render the print button when some match's `routeId` includes `_sheet`.
- If neither condition applies, render nothing (returns `null` or an empty fragment).

This matches the user's stated intent — the layout unconditionally mounts `<DndHeaderActions />` and the component itself decides whether to show anything. It also isolates the "is this a DnD character sheet route" heuristic (`routeId.includes('_sheet')`) inside the component that cares about it.

**Alternative considered**: Pass `isCharacterSheet` and `spellBookUrl` as props from `_public.tsx`. Rejected — this recreates the current coupling, just across a component boundary, and defeats the point of "internally checks if it is in a DnD character sheet or not" from the request.

### Decision: `HeaderBreadcrumbs` also reads router matches internally

Symmetric with the DnD actions component: `HeaderBreadcrumbs` calls `useMatches()`, runs `deriveCrumbs`, and renders the trail (or nothing when `crumbs.length === 0`). `deriveCrumbs` moves into the same file as a local helper (not exported) since nothing else uses it.

### Decision: No prop surface / no tests for the new components

Because both components are internal to a single call site and derive their state from router hooks, they take no props. Adding tests for them would require a router-provider harness; the existing e2e tests already cover the observable behavior (breadcrumb text, print-button visibility, spellbook download visibility), so this refactor rides on that coverage.

## Risks / Trade-offs

- **Risk: introducing a regression in header behavior during the move** → Mitigation: keep the move mechanical (copy JSX and helper verbatim into the new files; no logic edits), and rely on the existing e2e suite (`character-sheet-print`, `character-spellbook-download`, `game-tools-nav-shell` scenarios) to catch drift.
- **Risk: TanStack Router file-based routing picking up the new files as routes** → Mitigation: name them without a leading `_` or route-shaped prefix (`HeaderBreadcrumbs.tsx`, `DndHeaderActions.tsx`), which the router's `routes/` convention ignores. Verify by inspecting `routeTree.gen.ts` after the move — no new entries should appear.
- **Trade-off: two extra files for a small app** → Accepted: `_public.tsx` becomes materially smaller and each new file has a single, obvious job.
