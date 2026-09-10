## 1. Remove old Decap scaffold

- [x] 1.1 Delete `apps/ageorgedev/public/admin/index.html` and `apps/ageorgedev/public/admin/config.yml`
- [x] 1.2 Remove the `decap-server` script from the root `package.json`
- [x] 1.3 Delete `apps/ageorgedev/src/content/blogPosts/a-brave-new-world.mdx` and `apps/ageorgedev/src/content/blogPosts/serenity.mdx`
- [x] 1.4 Search the repo for any other Decap references (docs, CI, README) and remove them

## 2. Add Keystatic

- [x] 2.1 Add `@keystatic/core` and the packages needed for a framework-agnostic React admin mount to `apps/ageorgedev/package.json`
- [x] 2.2 Create `apps/ageorgedev/keystatic.config.ts` defining local-mode storage and the `blogPosts` collection: `title` (text, required), `description` (text, required), `date` (date, required), `draft` (boolean, default `false`), `body` (mdx field, empty `components` object), path `src/content/blogPosts`, format `frontmatter`, extension `mdx`
- [x] 2.3 Add a code comment on the `mdx` field noting: never hand-write an unregistered component tag into a post that will be opened in the admin UI — register it as a content-component first (see design.md Decision 1 / Risk 2)

## 3. TanStack Start admin routes

- [x] 3.1 Verify/spike: confirm Keystatic's core request-handling can be driven directly (outside the Next/Astro/Remix wrappers) with a plain Request/Response, following the shape of `@keystatic/remix`'s `handleLoader` — confirmed via source inspection: `makeGenericAPIRouteHandler({config})` from `@keystatic/core/api/generic` takes a duck-typed `Request` (`headers.get`, `method`, `url`, `json()`) and returns `{body, headers, status}`; local-mode resolves to a Node fs-backed handler automatically. No wrapping needed.
- [x] 3.2 Add `apps/ageorgedev/src/routes/keystatic.$.tsx` — splat UI route rendering the Keystatic admin shell
- [x] 3.3 Add `apps/ageorgedev/src/routes/api/keystatic.$.ts` using the installed TanStack Start's current `server.handlers` API on `createFileRoute` (not `createAPIFileRoute`, which doesn't exist in this version)
- [x] 3.4 Run the dev server, open `/keystatic`, confirm the `blogPosts` collection lists and a new entry can be created and saved to disk — verified in-browser: collection lists both sample posts, opened `a-second-post`, edited its body, saved, and confirmed the change landed in the `.mdx` file on disk

## 4. MDX build pipeline

- [x] 4.1 Add an MDX Vite plugin (e.g. `@mdx-js/rollup`) to `apps/ageorgedev/vite.config.ts`, configured with `remark-frontmatter` + `remark-mdx-frontmatter`
- [x] 4.2 Add a post-loader module (e.g. `src/content/posts.ts`) that uses `import.meta.glob('/src/content/blogPosts/*.mdx', { eager: true })` to enumerate posts, derive each slug from its filename, and expose: a `date`-descending, `draft`-filtered list for the index, and a single-post lookup by slug
- [x] 4.3 Add a shared MDX render-components module (e.g. `src/components/mdx/index.tsx`) starting empty, to be the mirror of `keystatic.config.ts`'s `mdx` field `components` object when the first content-component is added

## 5. Blog routes

- [x] 5.1 Add `apps/ageorgedev/src/routes/_public/blog.index.tsx` rendering the post list (title, description, date, link to `/blog/$slug`), reusing existing design-system typography components (matching the `talks.index.tsx` pattern)
- [x] 5.2 Add `apps/ageorgedev/src/routes/_public/blog.$slug.tsx` rendering a single post's frontmatter and compiled MDX body, returning a not-found result for unknown slugs
- [x] 5.3 Enable `crawlLinks: true` in the `tanstackStart({ prerender })` config in `vite.config.ts`

## 6. Sample content and verification

- [x] 6.1 Author two new sample posts (via the Keystatic admin or by hand) matching the final schema, with distinct `date` values
- [x] 6.2 Run a full build; confirm `/blog` lists both posts ordered by date and each `/blog/$slug` page is prerendered
- [x] 6.3 Set one sample post's `draft` to `true`; confirm it disappears from `/blog` but its route still renders if visited directly (per spec) and is not prerendered as a discoverable link — confirmed: prerender count dropped from 9 to 8 pages with the draft post's link no longer crawled; the app ships a live server bundle (not a pure static export), so a direct visit still resolves via SSR rather than 404ing
- [x] 6.4 Confirm typecheck, lint, and existing test suites still pass after the removals and additions — `yarn typecheck`, `yarn lint:ci`, and `yarn test` (501 tests) all pass
