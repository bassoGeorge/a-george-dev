## Context

`apps/ageorgedev` runs on TanStack Start (Vite + TanStack Router, file-based routing, React 19), deployed to Vercel with prerendering enabled (`tanstackStart({ prerender: { enabled: true } })` in `vite.config.ts`). The repo already has:

- `src/content/blogPosts/*.mdx` — two trial posts with only `title`/`description` frontmatter, read by nothing.
- `public/admin/{index.html,config.yml}` — a Decap CMS admin configured with `backend: git-gateway` (requires Netlify Identity, which this project doesn't have) and `local_backend: true`. Never wired to a render pipeline.
- `@mdx-js/loader`, `@mdx-js/react`, `remark-frontmatter`, `remark-mdx-frontmatter` already in `package.json` dependencies, but not referenced anywhere in `vite.config.ts` or the route tree.
- A precedent pattern for a content-listing page in `src/routes/_public/talks.index.tsx` (a `_public` layout route with a hand-written list of links to sub-pages) — not MDX-driven, but the closest existing analog for a `/blog` index.

Keystatic has no official adapter for TanStack Start — only Next.js, Astro, and Remix ship first-class packages. Its Remix adapter (`@keystatic/remix`) is the closest precedent: two routes, a UI splat route (`makePage` from `@keystatic/remix/ui`) and an API splat route (`handleLoader` from `@keystatic/remix/api`, used as both the `loader` and `action`). TanStack Start's own server-route conventions (`$.tsx` splat UI routes, `createAPIFileRoute` splat API routes with method handlers) are structurally close enough that this pattern can be ported directly, without a maintained package to depend on.

## Goals / Non-Goals

**Goals:**
- Replace the dead Decap scaffold with a working local-only Keystatic admin at `/keystatic`.
- Give the `blogPosts` collection a real, minimal frontmatter schema (`title`, `description`, `date`, `draft`) plus a rich `mdx` body field.
- Build a working MDX render pipeline: build-time compilation, a post loader, and `/blog` + `/blog/$slug` routes, prerendered on deploy.
- Ship samples that prove the whole path (author in Keystatic or by hand → file in repo → build → prerendered page) actually works.

**Non-Goals:**
- No GitHub/cloud-mode Keystatic storage — local filesystem mode only. Nothing about the file-based content format needs to anticipate a future hosted-editing upgrade; that would be a config-only change later against the same files.
- No RSS feed, tags/category pages, pagination, or sitemap entries for posts.
- No pre-registered Keystatic content-components. The registration pattern (schema on the `mdx` field's `components` object, mirrored in a render-time `components` map) gets established the first time a real post needs one — not spent speculatively here.

## Decisions

### 1. Body field: rich `mdx`, not plain `text`
Keystatic's `mdx` content field is confirmed (via hands-on research, not just docs) to error (`"Unhandled type mdxjsEsm"`) or crash the admin UI when it encounters unregistered component syntax it doesn't recognize — see the risk entry below. The alternative considered was a plain multiline `text` field (a raw string, never parsed as an AST, so immune to that failure mode) — rejected because the whole point of standing up Keystatic here is a real editing experience for body content, and the safety only matters if components get added carelessly. The chosen mitigation is process, not architecture: any custom component gets added through Keystatic's `components` registration (schema-declared) before it's ever used in a post — never hand-written as a bare unregistered tag. This keeps the nice editor and avoids the failure mode by construction rather than by degrading the field type.

### 2. TanStack Start integration: port the Remix adapter shape
Two hand-built server routes, following `@keystatic/remix`'s division of responsibility:
- `routes/keystatic.$.tsx` — UI splat route rendering Keystatic's admin shell (the Remix adapter's `makePage` equivalent; TanStack Start's version wraps the same underlying React admin app Keystatic ships, since only the routing glue is Remix-specific, not the admin UI itself).
- `routes/api/keystatic/$.ts` — API splat route via `createAPIFileRoute`, handling every HTTP method Keystatic's local-mode backend needs (GET for reads, POST for writes) by delegating to Keystatic's underlying request handler.

Alternative considered: wait for or request an official TanStack Start adapter. Rejected — no indication one is coming, and the Remix precedent makes the port low-risk enough to do now rather than block the whole change on it.

### 3. Content pipeline: build-time MDX compilation + glob-based loader
An MDX Vite plugin (`@mdx-js/rollup`, or equivalent, configured with `remark-frontmatter` + `remark-mdx-frontmatter` — already-installed deps) compiles `.mdx` files into components with frontmatter available as a named export. A loader module uses `import.meta.glob('/src/content/blogPosts/*.mdx', { eager: true })` (or an async variant) to enumerate all posts, expose `date`-ordered, `draft`-filtered listings for `/blog`, and resolve a single post by slug (filename, kebab-cased, minus extension) for `/blog/$slug`.

Alternative considered: runtime compilation (e.g. reading raw MDX strings and compiling on request, à la `next-mdx-remote`). Rejected — this is a fully static/prerendered site; build-time compilation is simpler, faster, and matches how `vite.config.ts` already prerenders everything else.

### 4. Prerendering: `crawlLinks` from the `/blog` index, not a hardcoded page list
`vite.config.ts`'s `tanstackStart({ prerender })` config currently has `crawlLinks` and `pages` commented out. Enabling `crawlLinks: true` lets the prerenderer discover every `/blog/$slug` path by following the links the `/blog` index already renders, so a new post needs zero prerender-config changes — just a new file.

Alternative considered: an explicit `pages` array enumerating every slug. Rejected — would need regenerating on every new post, which defeats "write in repo, deploy publishes it" as a low-friction workflow.

### 5. Existing trial posts: delete, don't migrate
`a-brave-new-world.mdx` and `serenity.mdx` predate the real schema (no `date`, no proof they render) and were never rendered by anything. Migrating them would mean inventing plausible `date` values for content that was explicitly a trial. Cleaner to delete and add fresh samples once the pipeline and schema both exist, so the samples are true end-to-end proof rather than patched-up leftovers.

## Risks / Trade-offs

- **[Risk]** The unofficial TanStack Start integration (Decision 2) could break on a future Keystatic release with no upstream migration guide to follow, since we're not depending on a maintained adapter package. → **Mitigation**: keep the adapter glue (the two route files) as thin as possible, delegating everything else to Keystatic's core packages, so any breakage is localized and easy to diff against the Remix adapter's current source.
- **[Risk]** Even with the "always register components properly" process (Decision 1), a future contributor could hand-write an unregistered component tag directly into an `.mdx` file outside the admin UI, then open that file in Keystatic and hit the crash. → **Mitigation**: document this constraint directly in the `blogPosts` collection's Keystatic config (a comment) and in the repo's content-authoring notes; the render pipeline itself doesn't need to enforce it since the crash only happens inside the admin UI, not at build time.
- **[Risk]** Whether Keystatic's collection schema even permits an alternative content-field type was left unconfirmed by the docs during exploration — moot now that Decision 1 commits to the rich `mdx` field regardless, but worth noting this wasn't independently re-verified since it's no longer load-bearing.
- **[Trade-off]** Local-mode-only Keystatic (Decision, Non-Goals) means content can only be edited by someone with local repo access and a running dev server — this is explicitly the point (no online editing wanted), not an oversight.

## Migration Plan

1. Remove Decap: delete `public/admin/{index.html,config.yml}`, remove the `decap-server` script from the root `package.json`.
2. Delete the two trial posts.
3. Add Keystatic config (`keystatic.config.ts`) defining the `blogPosts` collection and local-mode storage.
4. Add the two TanStack Start server routes (admin UI splat + local-mode API splat).
5. Wire the MDX Vite plugin into `vite.config.ts`; add the post-loader module.
6. Add `/blog` and `/blog/$slug` routes under `_public`.
7. Enable `crawlLinks` in the existing prerender config.
8. Add two new sample posts (via Keystatic or by hand) matching the final schema; verify they render and prerender correctly.

No rollback complexity beyond normal git revert — nothing here touches production data or external services (local filesystem storage only).

## Open Questions

None outstanding — all forks resolved during the grilling session preceding this document (see `proposal.md`). The only carried-forward verification item is the crash-avoidance process in Decision 1's mitigation, which is a documentation/discipline task, not an open technical decision.
