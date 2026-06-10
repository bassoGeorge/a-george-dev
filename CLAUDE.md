# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website mono-repo for [ageorge.dev](https://ageorge.dev), built with Turborepo, React 19, TanStack Start (SSG), and Tailwind CSS v4. The design system is separately deployed at [design.ageorge.dev](https://design.ageorge.dev) via Storybook (`apps/design-docs`).

## Commands

```bash
# Development
yarn dev                                # Start ageorgedev app (port 3000)
yarn storybook                          # Start design-docs Storybook
yarn decap-server                       # Start local CMS server

# Build
yarn build                              # Build ageorgedev app
yarn turbo build --filter=@ageorgedev/toolbelt  # Build a specific package

# Testing
yarn test                               # Run all tests (via Turborepo)
yarn turbo test --filter=@ageorgedev/toolbelt   # Run tests for a specific package

# Linting / Formatting (Biome)
yarn format-and-lint                    # Check all files
yarn format-and-lint:fix                # Auto-fix issues

# E2E
yarn turbo e2e --filter=@ageorgedev/ageorgedev-e2e  # Run Cypress e2e tests

# Add shadcn components (outputs to design-system lib)
yarn shadcn add <component>
```

## Architecture

### Workspace Structure

This is a Turborepo monorepo with Yarn v4 workspaces:

- **`apps/ageorgedev`** — Main website, TanStack Start (SSG mode), served on Vercel
- **`apps/ageorgedev-e2e`** — Playwright e2e tests for the main site
- **`apps/design-docs`** — Storybook app for the design system; deployed at design.ageorge.dev
- **`packages/design-system`** — React UI component library
- **`packages/brand-components`** — Higher-level branded components (talks, presentations)
- **`packages/toolbelt`** — Shared utilities (`cn`, ramda extensions)
- **`packages/foundation-styles`** — Raw CSS design tokens (typography, colors, spacing, shadows); imported by design-system and ageorgedev
- **`packages/ts-config`** — Shared TypeScript configurations (`base.json`, `react.json`)
- **`packages/reveal-framework`** — Presentation framework integration
- **`packages/talk-tailwind`** — Content lib for the "Tailwind" talk

### Routing

`apps/ageorgedev` uses **TanStack Router** with file-based routing in `src/routes/`:

- `__root.tsx` — Root document shell (injects theme script, CSS, global providers)
- `_public.tsx` — Layout with header + nav + `<Outlet />` for public pages
- `_public/index.tsx` — Home page
- `_public/talks.*` — Talks section
- `_noLayout/resume.tsx` — Resume page (no shared layout)

Routes are auto-generated into `routeTree.gen.ts` by the Vite plugin — never edit this file manually.

### Theming

Dark/light theme is managed in `packages/design-system`:

- `THEME_INIT_SCRIPT` — Inline script injected in `<head>` to avoid flash (reads `localStorage.theme`)
- `ThemeProvider` / `ThemeContext` — React context for runtime theme switching
- `ThemeSwitcher` — UI toggle component

CSS design tokens live in `packages/foundation-styles/src/theme.css` and sub-files. Tailwind v4 CSS-first config is used (no `tailwind.config.js`).

### Shadcn Components

`components.json` is configured to install components into `@ageorgedev/design-system/lib/ui`. Run `yarn shadcn add <component>` from the root.

### Build & Deploy

- **CI**: GitHub Actions; Turborepo for task orchestration and caching (GitHub Actions workflows pending update)
- **Hosting**: Vercel (main site + design-docs/Storybook deployed as separate projects)
- **PR workflow**: Runs lint+test on affected projects, deploys preview URLs
- **Production**: Deploys on push to `main`; hotfix branches bypass test gates
- **Linting**: Biome (replaces ESLint) — run `yarn format-and-lint` locally, `yarn lint:ci` in CI

### Key Path Aliases

```
@ageorgedev/design-system   → packages/design-system/src/index.ts
@ageorgedev/toolbelt        → packages/toolbelt/src/index.ts
@ageorgedev/brand-components → packages/brand-components/src/index.ts
@ageorgedev/reveal-framework → packages/reveal-framework/src/index.ts
@ageorgedev/talk-tailwind   → packages/talk-tailwind/src/index.ts
```

### Content

Blog posts and content live as `.mdx` files in `apps/ageorgedev/src/content/`. MDX frontmatter is processed via `remark-mdx-frontmatter`.
