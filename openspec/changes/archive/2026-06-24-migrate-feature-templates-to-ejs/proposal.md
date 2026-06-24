## Why

Mustache.js only supports simple property lookups in templates — it cannot evaluate expressions. The `Mind Link` species trait in Zoynari's character data requires `{{level.total * 10}}` (telepathy range scales with level), which Mustache silently renders as an empty string. EJS supports full JavaScript expressions inside `<%= %>` tags, unblocking this and any future logic-based template needs.

## What Changes

- Replace `mustache` dependency with `ejs` in `packages/dnd-character-sheet`
- Update `text-enrichment.ts` to call `ejs.render()` instead of `Mustache.render()`
- Migrate all existing template strings in character data files from `{{var}}` syntax to `<%= var %>` syntax
- Remove `@types/mustache` dev dependency; add `@types/ejs`

## Capabilities

### New Capabilities

- `ejs-template-rendering`: Template rendering in feature/species trait/feat descriptions using EJS, supporting full JS expressions, conditionals, and loops with the existing `level` context object

### Modified Capabilities

- `dnd-character-sheet-package`: The description field rendering mechanism changes from Mustache to EJS syntax — **BREAKING** change to template authoring syntax for any existing `{{ }}` templates (all will be migrated in this change)

## Impact

- `packages/dnd-character-sheet`: `text-enrichment.ts`, `package.json`
- `apps/game-tools`: All character route files containing template strings (`zoynari.tsx`, `omarin-kenate.tsx`)
- No API surface changes — `Character` data model types are unchanged; only the string syntax inside `description` fields changes
- No context object changes — `{ level: { total, [ClassName] } }` remains as-is
