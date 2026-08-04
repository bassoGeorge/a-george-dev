## 1. Type Definitions

- [x] 1.1 Add `CharacterAsset` type (`id`, optional `label`, `url`) to `apps/game-tools/src/data/dnd-characters/index.ts`
- [x] 1.2 Replace `spellBook?: string` with `assets?: CharacterAsset[]` on `BasePack`

## 2. Character Pack Migration

- [x] 2.1 Migrate claw's spellbook entry to `assets: [{ id: "spellbook", url: clawSpellBook }]`
- [x] 2.2 Migrate elnorin's spellbook entry to `assets: [{ id: "spellbook", url: elnorinSpellBook }]`
- [x] 2.3 Migrate rusty's spellbook entry to `assets: [{ id: "spellbook", url: rustySpellBook }]`
- [x] 2.4 Migrate saora's spellbook entry to `assets: [{ id: "spellbook", url: saoraSpellBook }]`
- [x] 2.5 Migrate zoynari's spellbook entries (zoynari-2 and zoynari-3) to `assets` array

## 3. Route Context Update

- [x] 3.1 Update `beforeLoad` in `$slug.{-$level}.tsx` to return `assets: pack.assets` instead of `spellBook: pack.spellBook`
- [x] 3.2 Update `type-enhancements.d.ts` — replace `spellBookUrl?: string` with `assets?: CharacterAsset[]` in `StaticDataRouteOption` (import type from data index or inline)

## 4. UI — DndHeaderActions

- [x] 4.1 Define `ASSET_DEFAULTS` record mapping known ids to `{ label, icon }` with lucide-react icons (`BookOpenTextIcon`, `SparklesIcon`)
- [x] 4.2 Rewrite `DndHeaderActions` to read `assets` from route context and render a flat row of links
- [x] 4.3 Apply label resolution: `asset.label ?? ASSET_DEFAULTS[asset.id]?.label ?? "Download"`
- [x] 4.4 Apply icon resolution: `ASSET_DEFAULTS[asset.id]?.icon ?? DownloadIcon`
- [x] 4.5 Ensure each link has `target="_blank"` and `rel="noopener noreferrer"`
