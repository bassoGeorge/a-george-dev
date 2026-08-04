## Why

The current character pack structure supports only a single hardcoded spellbook PDF, with a fixed label and icon. This limits characters who need multiple supplementary documents (e.g. a magic items sheet alongside a spellbook), and prevents customising how assets are labelled per character.

## What Changes

- Replace `spellBook?: string` on `BasePack` with `assets?: CharacterAsset[]`
- Introduce `CharacterAsset` type with `id`, optional `label`, and `url` fields
- Known `id` values: `"spellbook"` and `"magicItems"`; any string is valid for future extension
- Labels are optional — each known `id` has a hardcoded fallback label; unknown ids fall back to `"Download"`
- Icons are hardcoded per `id` (`BookOpenTextIcon` → spellbook, `SparklesIcon` → magicItems, `DownloadIcon` → fallback)
- Update `DndHeaderActions` to render a flat row of asset links, one per entry in `assets`
- Update route context to pass `assets` instead of `spellBook`
- Migrate all existing character spellbook entries to `{ id: "spellbook", url: "..." }`

## Capabilities

### New Capabilities

- `extensible-character-assets`: A typed, extensible asset array on character packs that supports multiple PDFs with per-asset IDs, optional labels, and icon mappings

### Modified Capabilities

<!-- No existing specs with requirement changes -->

## Impact

- `apps/game-tools/src/data/dnd-characters/index.ts` — `BasePack` type and all character pack definitions updated
- `apps/game-tools/src/components/DndHeaderActions.tsx` — rewritten to iterate over `assets`
- `apps/game-tools/src/routes/_public/dnd/characters/$slug.{-$level}.tsx` — `beforeLoad` context updated
- `apps/game-tools/src/type-enhancements.d.ts` — router context type updated from `spellBookUrl` to `assets`
- No changes to `packages/dnd-character-sheet` (assets are a presentation concern, not character game data)
