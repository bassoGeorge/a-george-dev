# AGeorgeDev
## Overview

Personal website mono-repo for [ageorge.dev](https://ageorge.dev), built with Turborepo, React 19, TanStack Start (SSG), and Tailwind CSS v4. The design system is separately deployed at [design.ageorge.dev](https://design.ageorge.dev) via Storybook (`apps/design-docs`). A separate `apps/game-tools` app hosts D&D character sheets and related tooling.

## Commands

```bash
# Development
yarn dev                                         # Start ageorgedev app (port 3000)
yarn storybook                                   # Start design-docs Storybook
yarn decap-server                                # Start local CMS server

# game-tools runs separately
yarn turbo dev --filter=@ageorgedev/game-tools   # Start game-tools app (port 3001)

# Build
yarn build                                       # Build ageorgedev app
yarn turbo build --filter=@ageorgedev/toolbelt   # Build a specific package

# Testing
yarn test                                        # Run all unit tests (one root Vitest run)
yarn test:coverage                               # Same, plus a merged report in coverage/
yarn test:watch                                  # Watch mode across every package
yarn turbo test --filter=@ageorgedev/toolbelt    # Run tests for a specific package
yarn vitest run --project @ageorgedev/toolbelt   # Same, without the Turborepo fan-out

# Linting / Formatting (Biome)
yarn format-and-lint                             # Check all files
yarn format-and-lint:fix                         # Auto-fix issues

# E2E (Playwright)
yarn turbo e2e --filter=@ageorgedev/ageorgedev-e2e # Run e23 for specific repo. Make sure main app is running beforehand

```

## Architecture

### Workspace Structure

Turborepo monorepo with Yarn v4 workspaces:

**Apps**
- **`apps/ageorgedev`** — Main website, TanStack Start (SSG mode), served on Vercel
- **`apps/ageorgedev-e2e`** — Playwright e2e tests for the main site
- **`apps/design-docs`** — Storybook app for the design system; deployed at design.ageorge.dev
- **`apps/game-tools`** — D&D character sheet viewer and game tooling; TanStack Start, port 3001
- **`apps/game-tools-e2e`** — Playwright e2e tests for the game tools

**Packages**
- **`packages/design-system`** — React UI component library
- **`packages/dnd-character-sheet`** — D&D character sheet components and data models
- **`packages/brand-components`** — Higher-level branded components (talks, presentations)
- **`packages/toolbelt`** — Shared utilities (`cn`, ramda extensions)
- **`packages/foundation-styles`** — Raw CSS design tokens (typography, colors, spacing, shadows)
- **`packages/testing-config`** — Shared Vitest/jsdom setup
- **`packages/ts-config`** — Shared TypeScript configurations (`base.json`, `react.json`)
- **`packages/reveal-framework`** — Presentation framework integration
- **`packages/talk-tailwind`** — Content lib for the "Tailwind" talk

### Routing

Both `apps/ageorgedev` and `apps/game-tools` use **TanStack Router** with file-based routing. Routes are auto-generated into `routeTree.gen.ts` — never edit this file manually.

**`apps/ageorgedev`** (`src/routes/`):
- `__root.tsx` — Root document shell
- `_public.tsx` — Layout with header + nav
- `_public/index.tsx` — Home page
- `_public/talks.*` — Talks section
- `_noLayout/resume.tsx` — Resume page (no shared layout)

**`apps/game-tools`** (`src/routes/`):
- `__root.tsx` — Root document shell
- `_public.tsx` — Shared nav layout (hidden on print via `print:hidden`)
- `_public/index.tsx` — Home page with links to game tool sections
- `_public/dnd/characters/index.tsx` — Dynamic character list (reads `staticData.character` from sibling routes)
- `_public/dnd/characters/<name>.tsx` — Individual character sheets (must declare `staticData: { character: { name, level, description } }`)

### Theming & tailwind conventions

CSS design tokens live in `packages/foundation-styles/src/theme.css`. Tailwind v4 CSS-first config is used (no `tailwind.config.js`). `apps/game-tools` also sources `packages/dnd-character-sheet/src` for Tailwind class scanning.
The projects use a modified tailwind configuration. The following lists critical differences from standard tailwind patterns

1. Spacing uses an exponential scale. Refer `packages/foundation-styles/src/lib/spacing.css`
2. Colors are theme-aware by default. AVOID setting `dark:<>` variants, instead rely on contextual theme aware colors. Refer to `packages/foundation-styles/src/lib/colors.css` and `apps/design-docs/stories/colors.stories.tsx`.

### Shadcn Components

`components.json` installs components into `@ageorgedev/design-system/lib/ui`. Run `yarn shadcn add <component>` from the root.

### Build & Deploy

- **CI**: GitHub Actions + Turborepo; PR workflow lints affected projects, runs the full unit-test suite with coverage, deploys preview URLs consolidated into a single PR comment
- **Hosting**: Vercel (main site, design storybook and game-tools)
- **Production**: Deploys on push to `main`
- **Linting**: Biome — run `yarn format-and-lint` locally, `yarn lint:ci` in CI

### Testing Conventions

- **Vitest unit tests** use `*.test.ts` / `*.test.tsx`, co-located next to the source file they cover.
- **Playwright e2e tests** (`apps/ageorgedev-e2e`, `apps/game-tools-e2e`) use `*.spec.ts` under `tests/` — a distinct convention from unit tests, matching Playwright's own default.