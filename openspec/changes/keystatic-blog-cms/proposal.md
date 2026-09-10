## Why

`apps/ageorgedev` has a half-finished blog: two sample `.mdx` files sit in `src/content/blogPosts` with nothing that reads or renders them, and a Decap CMS admin (`public/admin`) configured with a `git-gateway` backend that needs Netlify Identity and was never wired to a working publish path. There is no `/blog` route, no MDX build step, and no admin UI that actually works end to end. This change replaces that dead scaffold with a working, repo-first blog: posts are authored as MDX in the repo, a local-only Keystatic admin gives a nicer editing UI for frontmatter and body, and a build-time MDX pipeline renders them as prerendered routes on deploy.

## What Changes

- **BREAKING**: Remove the Decap CMS admin (`public/admin/index.html`, `public/admin/config.yml`), the `decap-server` root script, and any other Decap-only wiring.
- **BREAKING**: Delete the existing trial posts (`a-brave-new-world.mdx`, `serenity.mdx`) — they predate the real frontmatter schema and were never rendered.
- Add Keystatic (`@keystatic/core` + a hand-built TanStack Start integration, no official adapter exists) mounted at `/keystatic`, local-mode only (reads/writes the working tree directly, no auth, no GitHub/cloud storage).
- Define a `blogPosts` collection in Keystatic with schema: `title` (text), `description` (text), `date` (date, required), `draft` (boolean, default false), and a rich `mdx` field for the body, stored as `.mdx` files with frontmatter in `src/content/blogPosts`.
- Ship the `mdx` field with zero pre-registered content-components; the pattern for adding one gets established the first time a post actually needs it.
- Build an MDX render pipeline: a Vite MDX plugin compiles `.mdx` files at build time, a loader enumerates posts via `import.meta.glob`, and `/blog` (index, ordered by `date`, excluding `draft` posts) and `/blog/$slug` routes render them, prerendered via TanStack Start.
- Add two new sample posts (matching the final schema) to prove the pipeline end to end.

## Capabilities

### New Capabilities
- `blog-content-authoring`: Keystatic-based local admin for creating/editing blog post frontmatter and MDX body content, writing directly to `src/content/blogPosts`.
- `blog-rendering`: Build-time MDX compilation and TanStack Start routes (`/blog`, `/blog/$slug`) that read posts from `src/content/blogPosts` and prerender them on deploy.

### Modified Capabilities
- None — no existing spec'd capability's requirements change.

## Impact

- **Removed**: `apps/ageorgedev/public/admin/*`, `decap-server` script in root `package.json`, `apps/ageorgedev/src/content/blogPosts/a-brave-new-world.mdx`, `apps/ageorgedev/src/content/blogPosts/serenity.mdx`.
- **Added dependencies**: `@keystatic/core`, `@keystatic/react` (or equivalent framework-agnostic package), an MDX Vite plugin (e.g. `@mdx-js/rollup`) to compile `.mdx` at build time.
- **Existing dependencies now actually used**: `@mdx-js/react`, `remark-frontmatter`, `remark-mdx-frontmatter` (already installed, previously unwired).
- **New code**: two server routes for the Keystatic admin (UI splat route + local-mode API splat route), a Keystatic config file, a post-loader module, `/blog` and `/blog/$slug` route components, two new sample MDX posts.
- **Build/deploy**: `vite.config.ts` prerender config needs the new blog routes discoverable (e.g. `crawlLinks` from the `/blog` index) so posts are prerendered on Vercel deploy without manual path registration.
- **Out of scope**: RSS feed, tags/category pages, pagination, sitemap entries, and any GitHub/cloud-mode Keystatic storage — all deferred to future changes if needed.
