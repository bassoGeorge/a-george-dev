## 1. Extend character-brief

- [x] 1.1 Add `species` and `classes` (class names only, in `character.classes` order) to `getCharacterBrief()`'s return shape in `packages/dnd-character-sheet/src/lib/character-brief.ts`
- [x] 1.2 Change the default `description` fallback (used when `customDescription` is unset) to `species` followed by only the subclasses present (omit classes with no subclass); preserve the `customDescription` override as-is
- [x] 1.3 Audit existing character data files for reliance on the old fallback format vs. explicit `customDescription`, so card text doesn't regress unexpectedly — only `zoynari-3.ts` has an active `customDescription` override; `omarin-kenate.ts` has one commented out (unused). All other characters fall back to the new computed format; none produce an empty description (species is always present)

## 2. Build the roster card component

- [x] 2.1 Create a roster card component under `apps/game-tools/src/components/` (name, species, one badge per class, description), following existing convention of keeping non-route components out of `src/routes/` — `apps/game-tools/src/components/dnd/CharacterRosterCard.tsx`
- [x] 2.2 Build it on `packages/design-system/src/cards/TiltCard.tsx` as the root element (`interactive`, no `shape`) — do not reimplement border/shadow/hover styling; pass a `className` for the internal flex layout (name/species/badge-row/description)
- [x] 2.3 Render class badges as simple text pills (no color coding)

## 3. Rewrite the character list page

- [x] 3.1 In `apps/game-tools/src/routes/_public/dnd/characters/index.tsx`, group snapshots by level ascending, rendering a section only for levels with at least one snapshot
- [x] 3.2 Within each level section, sort snapshots alphabetically by name
- [x] 3.3 Render each level section's cards in a responsive grid/wrap layout
- [x] 3.4 Confirm multi-snapshot characters (e.g. Zoynari at levels 2 and 3) render as separate cards under their respective level sections — verified in browser preview: Zoynari appears once under "Level 2" and once under "Level 3" (with its `customDescription` override showing correctly)

## 4. Spec correction

- [x] 4.1 Correct `game-tools-character-routes` spec delta (in this change) to remove the never-implemented `staticData.character` requirement and describe the actual centralized-data-map source — applied automatically when this change archives, no separate code change needed
