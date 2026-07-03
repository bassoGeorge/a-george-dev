## Context

`apps/game-tools/src/routes/_public.tsx` currently renders a flat header (home link, nav links, optional print button, theme switcher). As the DnD character list grows there is no in-app indicator of "where am I in the tree." The design system already ships a `Breadcrumb` primitive at `packages/design-system/src/ui/breadcrumb.tsx` (added on `feat/pdfs`, commit `a8ade94`) exporting `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`. It's headless-ish (data-slot styling, Tailwind classes) and integrates cleanly with TanStack Router via the `asChild` prop on `BreadcrumbLink`.

The route tree we need to reflect:

- `/` (home)
- `/dnd/characters` (character index)
- `/dnd/characters/<name>` (character sheet, under `_sheet` sub-layout)

Character sheet routes carry `staticData: { character: { name, level, description } }` — the same source already consumed by `_public/dnd/characters/index.tsx`. This is the label source of truth.

## Goals / Non-Goals

**Goals:**

- Show a breadcrumb trail inside the existing header row of `_public.tsx`.
- Trail derives from active router matches at render time — no hard-coded per-route tables.
- Character sheet leaf uses `staticData.character.name`.
- Reuse the design-system `Breadcrumb` primitives without modification.

**Non-Goals:**

- No changes to the design-system `Breadcrumb` component.
- No global route-metadata refactor. We introspect matches ad-hoc in `_public.tsx`.
- No breadcrumbs on the home route (`/`) — nothing meaningful to show.
- No separate print handling: breadcrumbs live inside the `print:hidden` header.

## Decisions

### Decision 1: Placement — inline in the header row (not a second row)

Breadcrumbs replace the current standalone `Game Tools` home link as the app's location indicator on the left of the header. The home link becomes the root of the breadcrumb trail (either as `BreadcrumbLink`s implicit root, or dropped entirely per user answer: "DnD Characters / <Name>" — no explicit Home crumb).

**Rationale**: user explicitly chose "Inside the header row". Keeps vertical space tight, no CLS on nav transitions.

**Alternative considered**: second row under header — rejected by the user.

### Decision 2: Trail derivation from `useChildMatches()` / `useMatches()`

Read the current match tree via TanStack Router hooks (already used in the file for `useChildMatches`). Filter to matches whose `routeId` corresponds to a user-visible segment (`_public/dnd/characters/`, `_public/dnd/characters/_sheet/$name`) and map each to `{ label, to }`:

- `_public/dnd/characters/` → `{ label: 'DnD Characters', to: '/dnd/characters' }`
- `_public/dnd/characters/_sheet/$name` → `{ label: match.staticData.character.name, to: match.pathname }`

The last entry renders as `BreadcrumbPage` (non-link, current page); earlier entries render as `BreadcrumbLink` with `asChild` wrapping `<Link>` from `@tanstack/react-router`.

**Rationale**: keeps the mapping in one place and driven by the router — new nested routes just plug in.

**Alternative considered**: a static per-route lookup table. Rejected: duplicates knowledge already in the route tree, drifts easily.

### Decision 3: Home route shows no breadcrumbs

On `/`, the derived list is empty and the whole `<Breadcrumb>` block renders nothing (or renders a bare "Game Tools" wordmark as today). This avoids a single-item crumb which reads as noise.

### Decision 4: Header wordmark

Retain "Game Tools" as a plain link on the left, then render breadcrumbs to its right when non-empty (visually: `Game Tools │ DnD Characters / Zoynari`). This keeps a stable brand anchor. Separator between wordmark and breadcrumbs is a subtle vertical divider or a normal `BreadcrumbSeparator`.

## Risks / Trade-offs

- **Character label depends on `staticData.character`** → if a future character route omits it, the leaf crumb falls back to a humanised route param (e.g. `zoynari` → `Zoynari`). Mitigation: derivation function has an explicit fallback path; add a test scenario.
- **Header horizontal space on small viewports** → deep trails could wrap awkwardly. Mitigation: `BreadcrumbList` already uses `flex-wrap` and `text-sm`; acceptable for game-tools (desktop-oriented). Revisit if we add more nesting.
- **Coupling `_public.tsx` to specific route ids** → the derivation switch references `_public/dnd/characters/*` strings. Mitigation: acceptable at current scale (one section); revisit when a second top-level section is added.

## Migration Plan

Pure additive change to one file. No data migration, no feature flag. Ship on `feat/pdfs` alongside other in-flight work.
