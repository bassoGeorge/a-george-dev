## Why

The last two commits added D&D class badge SVG assets and inline-SVG React icon components (`CLASS_ICONS`), but they aren't used anywhere yet. The roster page currently identifies a character's classes only via small text-only pills, which is functional but visually flat. Injecting the primary class's icon as a large, faded, color-coded watermark behind the card content gives each roster card an at-a-glance visual identity without disturbing the existing text content.

## What Changes

- Add a `CLASS_COLORS` map (one color per `CharacterClass`, backed by existing design-system tokens) alongside the existing `CLASS_ICONS` map in `packages/dnd-character-sheet/src/icons/`.
- Add a `getPrimaryClass` helper (or equivalent) that resolves the "primary" class for a character as the **highest-level** class among `character.classes` — not simply the first-declared one — since multiclass order of declaration doesn't always match level (e.g. Omarin Kenate: Monk lvl2 declared first, Fighter lvl3 second).
- Render the resolved primary class's icon as an absolutely-positioned background graphic inside `CharacterRosterCard`, right-aligned, oversized so it bleeds off the card edges, at low opacity, tinted with that class's `CLASS_COLORS` entry, sitting behind the name/description/badge content (`z-index` below existing content).
- No changes to the existing per-class text badge pills (still text-only, no icon, no color) and no changes to `TiltCard`'s public API — this is scoped entirely to `CharacterRosterCard`.

## Capabilities

### New Capabilities

- `dnd-class-icons`: The class icon component library — per-class inline-SVG React components (`CLASS_ICONS`), a per-class color mapping (`CLASS_COLORS`), and the primary-class resolution rule for multiclass characters.

### Modified Capabilities

- `dnd-character-roster`: Roster cards gain a faded, per-class-colored, primary-class icon rendered as a background watermark behind the existing name/description/badge content.

## Impact

- `packages/dnd-character-sheet/src/icons/` — new `CLASS_COLORS` map, new primary-class resolution helper, export updates in `index.ts`.
- `packages/dnd-character-sheet/src/lib/character-brief.ts` (or a new helper module) — expose enough class/level data for `CharacterRosterCard` to resolve the primary class (currently `brief.classes` is a flattened `string[]`, which loses level info).
- `apps/game-tools/src/components/dnd/CharacterRosterCard.tsx` — new background icon element, layout/z-index adjustments.
- No changes to `TiltCard`, no changes to the text badge pills, no route or data-file changes.
