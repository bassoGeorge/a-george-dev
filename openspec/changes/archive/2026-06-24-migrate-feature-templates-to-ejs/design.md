## Context

`packages/dnd-character-sheet` uses Mustache.js to render template strings inside feature, feat, and species trait descriptions. Mustache only supports property lookups — it cannot evaluate JavaScript expressions. This blocks descriptions like `{{level.total * 10}}` (Zoynari's Mind Link telepathy range), which Mustache silently renders as empty string.

The rendering happens in `text-enrichment.ts` via `Mustache.render(description, dataValues)` where `dataValues = { level: { total, [ClassName]: classLevel } }`. The enriched descriptions are then sanitised by DOMPurify before display.

## Goals / Non-Goals

**Goals:**
- Replace Mustache with EJS as the template engine in `text-enrichment.ts`
- Migrate all existing `{{ }}` template strings in character data files to EJS `<%= %>` syntax
- Allow full EJS expressions, conditionals, and loops in descriptions

**Non-Goals:**
- Expanding the template context object (stays as `{ level: { total, [ClassName] } }`)
- Restricting EJS to expression-only mode
- Changing the `description` field type (stays `string`)

## Decisions

### EJS over other expression-capable engines (Handlebars, Nunjucks, lodash template)

EJS was chosen because:
- It executes plain JavaScript expressions with no DSL overhead — `<%= level.total * 10 %>` just works
- Browser-compatible via standard bundler (no special config needed with Vite/TanStack Start)
- Minimal API: `ejs.render(str, data)` is a drop-in for `Mustache.render(str, data)`
- Handlebars requires registering helpers for expressions; Nunjucks adds a heavier runtime; lodash template has no types

### Use `<%= %>` (HTML-escaped) output tag

All template values are numbers — escaping has no effect. `<%= %>` is the safer default. Raw `<%- %>` is available to authors if ever needed for unescaped HTML fragments, but not mandated.

### All-at-once migration (no compatibility shim)

Only ~5 template strings exist across 2 files. A dual-syntax shim (e.g. pre-processing `{{ }}` → `<%= %>`) adds complexity with no benefit at this scale. All templates are migrated in a single PR.

## Risks / Trade-offs

- **EJS executes arbitrary JS** → Only repo authors write descriptions, so no injection risk. DOMPurify still sanitises the rendered HTML output.
- **EJS bundle size** (~8kb gzipped) replaces Mustache (~2kb) → Acceptable; game-tools is not size-critical.
- **Template errors throw at runtime** → Same behaviour as Mustache; no change in error handling posture.

## Migration Plan

1. Add `ejs` + `@types/ejs` to `packages/dnd-character-sheet/package.json`; remove `mustache` + `@types/mustache`
2. Update `text-enrichment.ts`: swap `import Mustache` for `import ejs`, replace `Mustache.render(str, data)` with `ejs.render(str, data)`
3. Update all template strings in character data files: `{{var}}` → `<%= var %>`
4. Run `yarn format-and-lint:fix` and confirm no regressions

Rollback: revert the dependency swap and template strings — no data migrations involved.

## Open Questions

None — all decisions resolved during design grilling.
