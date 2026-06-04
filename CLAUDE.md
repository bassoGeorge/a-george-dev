# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website mono-repo for [ageorge.dev](https://ageorge.dev), built with Nx, React 19, TanStack Start (SSG), and Tailwind CSS v4. The design system is separately deployed at [design.ageorge.dev](https://design.ageorge.dev) via Storybook.

## Commands

```bash
# Development
yarn dev                          # Start ageorgedev app (port 3000)
yarn storybook                    # Start design-system Storybook (port 4400)
yarn decap-server                 # Start local CMS server

# Build
yarn build                        # Build ageorgedev app
yarn nx build toolbelt                 # Build toolbelt lib (only buildable lib)

# Testing
yarn test                         # Run all tests
yarn nx test toolbelt                  # Run tests for a specific project
yarn nx test toolbelt --testFile=libs/toolbelt/src/lib/ramda-additions.spec.ts  # Single test file

# Linting
yarn nx lint ageorgedev                # Lint a specific project
yarn nx run-many --target=lint         # Lint all projects

# E2E
yarn nx e2e ageorgedev-e2e             # Run Cypress e2e tests

# Add shadcn components (outputs to design-system lib)
yarn shadcn add <component>
```

## Architecture

### Workspace Structure

This is an Nx monorepo with Yarn v4 workspaces:

- **`apps/ageorgedev`** — Main website, TanStack Start (SSG mode), served on Vercel
- **`apps/ageorgedev-e2e`** — Cypress e2e tests for the main site
- **`libs/design-system`** — React UI component library; Storybook at design.ageorge.dev; tagged `scope:ds, type:ui`
- **`libs/brand-components`** — Higher-level branded components (talks, presentations); tagged `scope:site`
- **`libs/toolbelt`** — Shared utilities (`cn`, ramda extensions); the only buildable lib; tagged `scope:global, type:util`
- **`libs/foundation-styles`** — Raw CSS design tokens (typography, colors, spacing, shadows); imported as implicit dependency by design-system and ageorgedev
- **`libs/reveal-framework`** — Presentation framework integration
- **`libs/talk-tailwind`** — Content lib for the "Tailwind" talk

### Module Boundary Rules (enforced by ESLint)

```
scope:global   → scope:global only
scope:ds       → scope:global, scope:ds
scope:site     → scope:global, scope:site, scope:ds
type:util      → type:util only
type:ui        → type:ui, type:util
```

### Routing

`apps/ageorgedev` uses **TanStack Router** with file-based routing in `src/routes/`:

- `__root.tsx` — Root document shell (injects theme script, CSS, global providers)
- `_public.tsx` — Layout with header + nav + `<Outlet />` for public pages
- `_public/index.tsx` — Home page
- `_public/talks.*` — Talks section
- `_noLayout/resume.tsx` — Resume page (no shared layout)

Routes are auto-generated into `routeTree.gen.ts` by the Vite plugin — never edit this file manually.

### Theming

Dark/light theme is managed in `libs/design-system`:

- `THEME_INIT_SCRIPT` — Inline script injected in `<head>` to avoid flash (reads `localStorage.theme`)
- `ThemeProvider` / `ThemeContext` — React context for runtime theme switching
- `ThemeSwitcher` — UI toggle component

CSS design tokens live in `libs/foundation-styles/src/theme.css` and sub-files. Tailwind v4 CSS-first config is used (no `tailwind.config.js`).

### Shadcn Components

`components.json` is configured to install components into `@ageorgedev/design-system/lib/ui`. Run `yarn shadcn add <component>` from the root.

### Build & Deploy

- **CI**: GitHub Actions; Nx Cloud for affected-project detection
- **Hosting**: Vercel (main site + Storybook deployed as separate projects)
- **PR workflow**: Runs lint+test on affected projects, deploys preview URLs
- **Production**: Deploys on push to `main`; hotfix branches bypass test gates

### Key Path Aliases

```
@ageorgedev/design-system   → libs/design-system/src/index.ts
@ageorgedev/toolbelt        → libs/toolbelt/src/index.ts
@ageorgedev/brand-components → libs/brand-components/src/index.ts
@ageorgedev/reveal-framework → libs/reveal-framework/src/index.ts
@ageorgedev/talk-tailwind   → libs/talk-tailwind/src/index.ts
```

### Content

Blog posts and content live as `.mdx` files in `apps/ageorgedev/src/content/`. MDX frontmatter is processed via `remark-mdx-frontmatter`.
