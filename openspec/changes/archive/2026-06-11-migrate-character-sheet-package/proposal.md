## Why

The `@dnd-tooling/character-sheet` React component library exists in a separate repository and needs to live alongside the personal site's design system and brand components so it can be iterated on and eventually rendered within the ageorge.dev site. Consolidating it here removes repo-switching overhead and aligns it with the monorepo's build, lint, and deploy pipeline.

## What Changes

- **New package** `@ageorgedev/dnd-character-sheet` added at `packages/dnd-character-sheet/` — a React component library with 30+ components for rendering D&D 5.5e character sheets
- Build system changed from Vite to `tsc + cpx` to match monorepo conventions; Tailwind utility scanning delegated to the consumer app via `@source`
- Google Fonts CDN import removed — fonts are already loaded via `@fontsource` packages in `foundation-styles`
- Font token references updated: `--font-serif` → `--font-heading`, `--font-sans` → `--font-body`, `--font-sc` → `--font-interface`
- Local `cn.ts` utility replaced with `@ageorgedev/toolbelt` import
- Package-scoped design tokens (`sheet-red`, `sheet-parchment`, `sheet-dark`, `sheet-border`) retained locally in `src/styles/tokens.css` (design language migration to foundation-styles colors is deferred to a future change)
- Consumer app `apps/ageorgedev/src/styles.css` updated with `@source` path to scan the new package

## Capabilities

### New Capabilities

- `dnd-character-sheet-package`: The `@ageorgedev/dnd-character-sheet` package itself — package structure, build config, TypeScript config, workspace registration, and Tailwind integration with the monorepo

### Modified Capabilities

- `foundation-styles-integration`: No requirement changes — the existing `@source` pattern in the consumer app is extended to cover the new package

## Impact

- `packages/dnd-character-sheet/` — new directory (copied and adapted from `../dnd-tooling/packages/character-sheet/`)
- `apps/ageorgedev/src/styles.css` — add `@source` directive for the new package
- Root `package.json` / `turbo.json` — no changes needed; Turborepo auto-discovers workspace packages
- `@ageorgedev/toolbelt` — added as a dependency of the new package (already in workspace)
