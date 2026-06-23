# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
yarn test                                        # Run all tests (via Turborepo)
yarn turbo test --filter=@ageorgedev/toolbelt    # Run tests for a specific package

# Linting / Formatting (Biome)
yarn format-and-lint                             # Check all files
yarn format-and-lint:fix                         # Auto-fix issues

# E2E (Playwright)
yarn turbo e2e --filter=@ageorgedev/ageorgedev-e2e

# Add shadcn components (outputs to design-system lib)
yarn shadcn add <component>
```

## Architecture

### Workspace Structure

Turborepo monorepo with Yarn v4 workspaces:

**Apps**
- **`apps/ageorgedev`** — Main website, TanStack Start (SSG mode), served on Vercel
- **`apps/ageorgedev-e2e`** — Playwright e2e tests for the main site
- **`apps/design-docs`** — Storybook app for the design system; deployed at design.ageorge.dev
- **`apps/game-tools`** — D&D character sheet viewer and game tooling; TanStack Start, port 3001

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

### Theming

Dark/light theme is managed in `packages/design-system`:

- `THEME_INIT_SCRIPT` — Inline script injected in `<head>` to avoid flash (reads `localStorage.theme`)
- `ThemeProvider` / `ThemeContext` — React context for runtime theme switching
- `ThemeSwitcher` — UI toggle component

CSS design tokens live in `packages/foundation-styles/src/theme.css`. Tailwind v4 CSS-first config is used (no `tailwind.config.js`). `apps/game-tools` also sources `packages/dnd-character-sheet/src` for Tailwind class scanning.

### Shadcn Components

`components.json` installs components into `@ageorgedev/design-system/lib/ui`. Run `yarn shadcn add <component>` from the root.

### Build & Deploy

- **CI**: GitHub Actions + Turborepo; PR workflow runs lint+test on affected projects, deploys preview URLs consolidated into a single PR comment
- **Hosting**: Vercel (main site + design-docs/Storybook as separate projects)
- **Production**: Deploys on push to `main`
- **Linting**: Biome — run `yarn format-and-lint` locally, `yarn lint:ci` in CI

### Key Path Aliases

```
@ageorgedev/design-system        → packages/design-system/src/index.ts
@ageorgedev/dnd-character-sheet  → packages/dnd-character-sheet/src/index.ts
@ageorgedev/toolbelt             → packages/toolbelt/src/index.ts
@ageorgedev/brand-components     → packages/brand-components/src/index.ts
@ageorgedev/reveal-framework     → packages/reveal-framework/src/index.ts
@ageorgedev/talk-tailwind        → packages/talk-tailwind/src/index.ts
```

### Content

Blog posts and content live as `.mdx` files in `apps/ageorgedev/src/content/`. MDX frontmatter is processed via `remark-mdx-frontmatter`.
