## Context

`packages/dnd-character-sheet` defines its own color tokens in `src/styles/tokens.css` (4 custom properties: `--color-sheet-red`, `--color-sheet-dark`, `--color-sheet-parchment`, `--color-sheet-border`) and uses raw Tailwind color classes directly in component JSX. The package exports `tokens.css` as a public CSS entrypoint, which `apps/ageorgedev/src/styles.css` imports globally.

The foundation-styles package provides two tiers of color tokens: semantic Tailwind classes (e.g. `text-neutral-strong`, `bg-destructive-surface-2`) and raw swatch CSS custom properties (e.g. `--s-parchment-400`). These are already globally available in `apps/ageorgedev` via the existing foundation-styles import chain.

## Goals / Non-Goals

**Goals:**
- Replace all raw Tailwind color classes in dnd-character-sheet with foundation-styles equivalents
- Remove `tokens.css` and its custom properties entirely
- Clean up the `tokens.css` export from the package and its import in `apps/ageorgedev/src/styles.css`
- Prefer semantic Tailwind classes; fall back to swatch arbitrary-value syntax only where no semantic match exists

**Non-Goals:**
- Adding dark mode support to the character sheet
- Migrating non-color styles (spacing, typography, layout)
- Moving color declarations from JSX classes into CSS Modules
- Adding `@ageorgedev/foundation-styles` as an explicit package dependency (tokens are globally available via the app's CSS pipeline)

## Decisions

### Decision 1: Semantic classes over swatch tokens
**Choice:** Use semantic Tailwind classes (`text-neutral-strong`, `bg-destructive-surface-2`) where a match exists; use `[var(--s-*)]` arbitrary syntax only for parchment border color.

**Rationale:** Semantic classes are theme-aware and don't require updating if the design system palette shifts. The character sheet's neutral grays, red headers, and green death-save indicators map cleanly to the existing semantic vocabulary. Only the tan border (`--color-sheet-border`) has no semantic equivalent.

**Alternative considered:** Swatch-only approach — rejected because it loses theme-awareness for neutral colors and requires more future churn.

### Decision 2: Remove tokens.css entirely (no deprecation shim)
**Choice:** Delete `tokens.css`, remove its export from `package.json`, and remove its import from `apps/ageorgedev/src/styles.css` in the same change.

**Rationale:** The only consumer of `tokens.css` is `apps/ageorgedev` — a single file, within the same monorepo. No external consumers. A deprecation shim adds noise with no benefit.

**Alternative considered:** Keep `tokens.css` as an empty file — rejected as unnecessary indirection.

### Decision 3: No explicit foundation-styles dependency in dnd-character-sheet
**Choice:** Do not add `@ageorgedev/foundation-styles` to `dnd-character-sheet`'s `package.json`.

**Rationale:** The semantic Tailwind classes and swatch CSS variables are resolved at build time by the consuming app (`apps/ageorgedev`), which already imports foundation-styles. The character sheet package ships TSX/CSS — it doesn't need to own the token resolution.

## Risks / Trade-offs

- **Visual regression on sheet-red headers** → The mapping from `--color-sheet-red` (#8b1a1a) to `bg-destructive-surface-2` should be visually verified; destructive surface values are theme-driven and may shift slightly in future design updates. Mitigation: manual visual check after migration.
- **`bg-page-0` background** → `page-0` is the site's base page background, which is warm off-white in light mode. If the page theme changes, the sheet background will change with it. This is acceptable and intentional.
- **Parchment border uses swatch fallback** → `border-[var(--s-parchment-400)]` is not theme-aware. If the palette is ever renamed or removed, this will silently break. Mitigation: document in a follow-up to assign a semantic token for this use case.

## Migration Plan

1. Update all component files in `packages/dnd-character-sheet/src/components/` — replace color classes per the mapping table in `proposal.md`
2. Delete `packages/dnd-character-sheet/src/styles/tokens.css`
3. Remove the `tokens.css` export from `packages/dnd-character-sheet/package.json`
4. Remove the `@import "@ageorgedev/dnd-character-sheet/dist/styles/tokens.css"` line from `apps/ageorgedev/src/styles.css`
5. Build and visually verify the character sheet route (`/char-test`)

**Rollback:** Revert the branch. No database or infrastructure changes involved.
