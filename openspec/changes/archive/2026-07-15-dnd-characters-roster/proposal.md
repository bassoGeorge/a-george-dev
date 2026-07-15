## Why

The `/dnd/characters` list today is a flat, single-column list of link cards showing just name and a flavor-text description. Players picking a character for the next session need to scan by level first — the current list gives no level structure, no class/species at a glance, and doesn't surface that some characters (e.g. Zoynari) have multiple playable level snapshots.

## What Changes

- Character list page groups characters into **level sections** (ascending, e.g. "Level 2", "Level 3"), rendering only levels that have at least one character — no empty placeholders for unused levels
- Each saved character **snapshot** (not each unique character) gets its own card — a character saved at two levels (e.g. Zoynari at 2 and 3) appears once under each level section
- Within a level section, cards sort **alphabetically by name**
- Cards render in a **responsive grid/wrap** layout instead of the current single-column list
- Each card shows: **name**, **species**, one **class badge per class** (simple text pill, no color coding), and a **description** line
- `getCharacterBrief()` is extended to also return `species` and `classes` (class names only, for badges)
- The default (non-overridden) description computation changes: instead of `${species} ${classes.map(c => c.subclass || c.name).join(' / ')}`, it becomes `${species}` followed by only the **subclasses** present (classes without a subclass are omitted, since the class name itself is now shown via badge). The existing `character.customDescription` override still takes precedence when set.
- The existing `game-tools-character-routes` spec is corrected to match reality: it currently describes the list as being built from route-level `staticData.character` metadata, which no code in this repo implements — character data has always come from the centralized data map. That stale requirement is removed and replaced with one describing the actual (and still-current) data source.

## Capabilities

### New Capabilities

- `dnd-character-roster`: A level-grouped, card-grid view of all saved character snapshots on `/dnd/characters`, letting players scan by level and see species/class at a glance.

### Modified Capabilities

- `dnd-unit-tests`: the existing `getCharacterBrief` requirement is updated — the summary object gains `species` and `classes` fields, and the default `description` fallback format changes to species + subclasses only (no plain class names, since those are now shown separately as badges).
- `game-tools-character-routes`: the "Character list route at /dnd/characters" requirement is corrected to describe the centralized-data-map source instead of the never-implemented `staticData.character` mechanism; the "Character routes declare staticData metadata" requirement is removed outright as it describes a mechanism that doesn't exist in the codebase.

## Impact

- `packages/dnd-character-sheet/src/lib/character-brief.ts` — extend return shape and change default description format
- `apps/game-tools/src/routes/_public/dnd/characters/index.tsx` — rewrite to group by level, render grid of cards with badges
- New UI: a roster card component (name, species, class badges, description), built on top of `packages/design-system/src/cards/TiltCard.tsx` (`interactive`, no `shape` — not a bespoke bordered `div`), colocated under `apps/game-tools/src/components/` per existing convention
- No changes to `apps/game-tools/src/data/dnd-characters/index.ts` (already has one entry per saved snapshot, keyed appropriately) or to the underlying `Character` model
