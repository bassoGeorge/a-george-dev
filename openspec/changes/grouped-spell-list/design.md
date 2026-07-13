## Context

The `SpellList` component renders all spells as a dense table optimised for characters with a small, curated spell list (wizards, warlocks). Clerics prepare from a large pool each day — Talia has 25+ spells across four levels — making the table hard to scan. A grouped, columnar view trades column-level detail for scannability across the full pool.

The existing `VisualAdjustmentsContext` is already the canonical mechanism for per-character display overrides. All new display flags belong there.

## Goals / Non-Goals

**Goals:**
- Add `spellListMode: 'table' | 'grouped'` to `VisualAdjustments`
- New `GroupedSpellList` component: spells grouped by level, 3-column grid, compact per-cell layout
- `SpellcastingBlock` selects which component to render based on context
- No changes to the data model (`Spell`, `Spellcasting`)

**Non-Goals:**
- Runtime toggle between views (this is a print-time layout choice set in character data)
- Scroll containers or pagination for overflow — let it overflow naturally
- Showing the full class spell list (only spells in `character.spellcasting.spells` are rendered)

## Decisions

### 1. Flag lives in `VisualAdjustments`, not on `Spellcasting`

Putting display preferences in the character data model (`Spellcasting`) couples presentation to data. `VisualAdjustments` is already the established separation point — all display overrides live there and are passed as a separate prop to `StandardCharacterSheet`.

**Alternative considered**: flag on `Spellcasting` — rejected because it conflates data and presentation.

### 2. New component (`GroupedSpellList`) rather than branching inside `SpellList`

The two views have fundamentally different structure (table vs grid). A single component with heavy conditional logic would be hard to maintain. A separate `GroupedSpellList.tsx` alongside `SpellList.tsx` keeps both clean and independently testable.

**Alternative considered**: conditional rendering inside `SpellList` — rejected due to structural divergence.

### 3. Per-cell layout: single row with inline extras

Each spell cell: `[checkbox / AP] [name] [notes subdued below] [free-use circles] [CRM letters]`

- Checkbox area: `CircleCheck` for preparable spells, `"AP"` italic text for `alwaysPrepared`, nothing for cantrips
- Notes and `alternativeAbility`: rendered below the name in subdued smaller text, only when present
- Free uses: `EmptyCheckList` circles preserved (actionable during play)
- CRM: only truthy letters, comma-separated (e.g. `C, M`) — nothing shown if none apply

### 4. Level group headers are minimal

Just `"Cantrips"`, `"Level 1"`, `"Level 2"`, etc. Slot counts already appear in `SpellSlotsPanel` above; duplicating them adds noise.

### 5. Sorting within groups

Within each level group, `alwaysPrepared` spells sort first (consistent with current `compareSpells`), then alphabetically. This keeps domain spells visually grouped at the top of each level.

## Risks / Trade-offs

- **Page overflow** — the grouped view has no fixed height. For a cleric with many level-1 spells this will overflow the second page, pushing `NotesPanel` off. Acceptable for now; layout can be tuned per character.
- **3-column density** — long spell names may wrap awkwardly at narrow column widths. CSS `break-inside: avoid` on cells will prevent mid-cell page breaks on print.
