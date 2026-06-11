## Context

The monorepo already has a working TanStack Start app (`apps/ageorgedev`) with a proven stack: Vite + `@tanstack/react-start` plugin, Tailwind v4 via `@tailwindcss/vite`, file-based routing, and the `@ageorgedev/design-system` theming system. The `dnd-character-sheet` package is a library of React components and character data that was being tested via a throwaway route on the main site.

The new `game-tools` app mirrors this setup almost exactly — the main differences are scope (only TTRPG packages sourced), port, and the route tree.

## Goals / Non-Goals

**Goals:**
- Scaffold `apps/game-tools` as a close sibling of `apps/ageorgedev` (same vite/tsconfig/styling patterns)
- Render `ExampleSheet` at `/dnd/characters/example` with no layout (print-friendly)
- Wire the app into the monorepo (Yarn workspace, Turborepo, TypeScript)
- Clean up `apps/ageorgedev`: remove `char-test` route, drop `dnd-character-sheet` dependency and its `@source` entry

**Non-Goals:**
- A character list/index page (future work)
- Dynamic routing (`/dnd/characters/:id`) — the only character right now is the example
- CI/Vercel project configuration (domain TBD, done separately)
- Any new `dnd-character-sheet` components or data

## Decisions

### Mirroring ageorgedev structure
Copy the following files verbatim (adjusting names/ports) rather than inventing new patterns:
- `vite.config.ts` — same plugins (`tanstackStart`, `tailwindcss`, `react`), port 3001
- `src/__root.tsx` — same shell: `THEME_INIT_SCRIPT`, `GlobalProviders`, `HeadContent`, `Scripts`
- `src/router.tsx` — same `createTanStackRouter` wiring
- `src/components/GlobalProviders.tsx` — same `ThemeProvider` wrapper
- `src/styles.css` — import `@ageorgedev/foundation-styles/tailwind.css`, then only source packages this app actually uses

**Alternative considered:** Minimal scaffold (no theming, no GlobalProviders). Rejected — the theming system costs nothing to include and future tools will need it.

### CSS @source scope
`apps/game-tools/src/styles.css` will source only the packages it uses:
```css
@import "@ageorgedev/foundation-styles/tailwind.css";

@source "../";
@source "../../../packages/design-system/src";
@source "../../../packages/dnd-character-sheet/src";
```
`reveal-framework`, `talk-tailwind`, and `brand-components` are omitted — they're not used here and would bloat the CSS scan unnecessarily.

### Route file path for /dnd/characters/example
TanStack Router file-based routing: `src/routes/_noLayout/dnd/characters/example.tsx`

- `_noLayout` is a pathless layout group (no wrapping nav shell)
- `dnd/` is a path segment, establishing the namespace for future D&D tools
- `characters/example` maps directly to the URL

**Alternative considered:** Flat route `_noLayout/dnd.characters.example.tsx` using dot notation. Rejected — nested directories make the `/dnd` namespace explicit and easier to extend with sibling tools (`/dnd/spells`, `/dnd/encounters`, etc.).

### No `_noLayout` route file needed at root
The `_noLayout` group only needs a `__root`-level route file if it needs to render an `<Outlet />`. Since every route in this app will initially be no-layout, there's no need for a separate layout file — `_noLayout` acts as a pure pathless prefix.

### Turborepo
No changes to `turbo.json` — `apps/*` is already in scope for `build`, `dev`, `test`, and `lint` tasks. The new app inherits the pipeline automatically.

## Risks / Trade-offs

- **`@source` scanning** — if future routes use components from packages not listed in `@source`, their Tailwind classes will be missing at build time. Mitigation: add `@source` entries as new packages are consumed.
- **Shared `foundation-styles` fonts** — `tailwind.css` imports font packages (`@fontsource-variable/alegreya`, etc.) that must be present in `node_modules`. Since they're already installed at the workspace root, this is fine — but worth noting if the app is ever extracted.

## Open Questions

- Final domain for the Vercel deployment (noted as TBD)
- Whether `/dnd/characters` should eventually become a list page, or if all characters will always be accessed by direct URL
