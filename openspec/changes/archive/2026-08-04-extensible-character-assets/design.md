## Context

Character packs in `apps/game-tools/src/data/dnd-characters/index.ts` use a `BasePack` type that bundles a `Character` data model with optional presentation-layer additions. Currently `spellBook?: string` is the only asset slot. The download UI in `DndHeaderActions.tsx` is hardcoded for this single field. As characters accumulate supplementary PDFs (magic item sheets, backstory docs, etc.), the one-field approach doesn't scale.

Assets are a presentation concern — they live in game-tools, not in the `dnd-character-sheet` package.

## Goals / Non-Goals

**Goals:**
- Support an ordered list of downloadable PDF assets per character pack
- Each asset has a stable `id`, optional override `label`, and a `url`
- Known ids (`spellbook`, `magicItems`) map to specific icons and label fallbacks
- Unknown ids render with a generic download icon and "Download" label
- Migrate all existing spellbook entries to the new shape without functional regression

**Non-Goals:**
- Runtime upload or CMS management of assets (all assets are static, imported at build time)
- Per-asset icons specified in data (icons are hardcoded in the UI layer by id)
- Supporting non-PDF asset types
- Pagination or overflow handling for large numbers of assets

## Decisions

### 1. Replace `spellBook` with `assets` array (no alias)

Rather than keeping `spellBook` as a legacy alias, replace it entirely. All character packs live in the same repo, so the migration is a one-shot find-and-replace with no cross-team coordination needed. A dual-field approach would require the rendering logic to merge two sources, adding complexity for no benefit.

### 2. `id` as a plain string, not a union enum

```ts
type AssetId = "spellbook" | "magicItems" | (string & {});
```

Using `(string & {})` keeps autocomplete hints for known ids while allowing arbitrary strings for future assets without a type change. The icon/label mapping in the UI is a simple `Record<string, ...>` lookup with a fallback — new ids just need a UI entry added, not a type change.

### 3. Label is optional, not required

Requiring a label for every asset would force authors to repeat the obvious for common ids. The UI resolves labels in priority order: `asset.label ?? ASSET_DEFAULTS[asset.id]?.label ?? "Download"`. This keeps character pack definitions concise while still allowing overrides.

### 4. Icons hardcoded in UI by id, not stored in data

Storing icon names or component references in data would couple the data layer to the UI library. Instead, `DndHeaderActions` maintains a small lookup object mapping known ids to lucide-react icon components:

```ts
const ASSET_DEFAULTS: Record<string, { label: string; icon: LucideIcon }> = {
  spellbook: { label: "Spellbook", icon: BookOpenTextIcon },
  magicItems: { label: "Magic Items", icon: SparklesIcon },
};
const FALLBACK_ICON = DownloadIcon;
```

### 5. Route context field renamed from `spellBook` to `assets`

`beforeLoad` in the character slug route currently returns `{ spellBook: pack.spellBook }`. This becomes `{ assets: pack.assets }`. The type augmentation in `type-enhancements.d.ts` is updated accordingly (`spellBookUrl` → `assets`). The rename is contained to one route file and one type file.

## Risks / Trade-offs

- **Migration typos** — manually converting ~5 character packs could introduce a bad URL. Mitigation: TypeScript will catch shape mismatches; a brief visual check of each character's header after migration is sufficient.
- **Order sensitivity** — assets render in array order, giving authors control but no automatic sorting. Non-issue for the current small asset counts.

## Migration Plan

1. Add `CharacterAsset` type to `index.ts`
2. Update `BasePack` — remove `spellBook`, add `assets?`
3. For each character pack that had `spellBook`, replace with `assets: [{ id: "spellbook", url: <previous value> }]`
4. Update `beforeLoad` in the slug route
5. Update `type-enhancements.d.ts`
6. Rewrite `DndHeaderActions` to iterate over `assets`
7. Verify each character's sheet renders the correct asset links
