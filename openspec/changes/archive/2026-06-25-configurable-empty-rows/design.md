## Context

`StandardCharacterSheet` renders a two-page D&D character sheet. Page 2 contains a `SpellcastingBlock` (which renders `SpellList`) and an `Inventory`. Both leaf components use hardcoded numbers to fill remaining vertical space with empty rows/lines. The sheet is printed, so pixel-perfect fill matters — but the correct value depends on runtime content (multi-line spell names, equipment count).

`SpellList` is two levels deep from `StandardCharacterSheet` (`SpellcastingBlock → SpellList`), making prop threading awkward. `Inventory` is direct but the `lineCount` lives on `HandWrittenNotes` inside it.

## Goals / Non-Goals

**Goals:**
- Let `StandardCharacterSheet` control `spellRows` and `inventoryRows` without threading props through intermediate components
- Keep defaults that preserve current behaviour for all existing usages
- Keep the context internal to the `dnd-character-sheet` package (not exported)

**Non-Goals:**
- Dynamically computing the correct row count at runtime (CSS/JS measurement) — caller sets it manually
- Making any other layout values configurable (margins, font sizes, etc.)
- Exporting `VisualAdjustmentsContext` for external consumers

## Decisions

### 1. React Context over prop threading

**Decision:** Introduce a `VisualAdjustmentsContext` that `StandardCharacterSheet` provides and leaf components consume directly.

**Why:** `SpellList` is two hops away from `StandardCharacterSheet` via `SpellcastingBlock`. Adding a pass-through prop to `SpellcastingBlock` gives it knowledge it doesn't own. Context is the idiomatic React solution for layout/display configuration that crosses component boundaries without touching intermediaries.

**Alternative considered:** Thread as props (`StandardCharacterSheet → SpellcastingBlock → SpellList`). Rejected because `SpellcastingBlock` has no reason to know about row counts.

### 2. Single grouped prop `visualAdjustments` on `StandardCharacterSheet`

**Decision:** One optional prop `visualAdjustments?: { spellRows?: number; inventoryRows?: number }` rather than two flat props.

**Why:** Groups related layout-tuning concerns under one namespace, keeping the component API tidy. Easy to extend with future layout values without adding more top-level props.

### 3. Defaults match current hardcoded values

**Decision:** Context defaults are `spellRows: 30` and `inventoryRows: 10` — the current magic numbers.

**Why:** Zero-change upgrade path for all existing character sheet usages.

## Risks / Trade-offs

- **Stale defaults** → If sheet layout changes (e.g. font size bump shrinks available rows), the defaults will need manual updates. Mitigation: the values are now visible and documented in one place rather than buried in leaf components.
- **Context coupling** → Leaf components now depend on a context that must be provided by an ancestor. Mitigation: context has built-in defaults, so components are safe if used outside `StandardCharacterSheet`.
