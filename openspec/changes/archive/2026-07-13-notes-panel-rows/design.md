## Context

`NotesPanel` currently renders with a hardcoded `lineCount={10}`. `VisualAdjustmentsContext` already has `inventoryRows` for the same purpose on the inventory panel — `notesRows` follows the exact same pattern. The `StandardCharacterSheet` is the only place that renders `NotesPanel`.

## Goals / Non-Goals

**Goals:**
- Add `notesRows: number` to `FullVisualAdjustments` with default `10`
- `NotesPanel` reads `notesRows` from context instead of hardcoding
- `StandardCharacterSheet` omits `NotesPanel` entirely when `notesRows === 0`

**Non-Goals:**
- Any other changes to `NotesPanel` layout or styling
- Adding a notes panel to the first page

## Decisions

### 1. `notesRows: 0` suppresses the panel via conditional render in `StandardCharacterSheet`

The panel suppression happens in `StandardCharacterSheet` (the consumer) rather than inside `NotesPanel` itself. This keeps `NotesPanel` a pure presentational component — it renders what it's told, and the sheet decides whether to render it at all.

**Alternative considered**: `NotesPanel` returns `null` when `notesRows === 0`. Rejected because it makes a layout component responsible for its own omission, which is harder to reason about from the sheet level.

### 2. Default stays at `10` to preserve existing behaviour

`DEFAULT_VISUAL_ADUSTMENTS` sets `notesRows: 10`, matching the current hardcoded value. No existing character sheets change appearance unless they explicitly set `notesRows`.

## Risks / Trade-offs

- **`flex-1` layout gap** — `NotesPanel` currently has `outerClasses="flex-1"` in `StandardCharacterSheet`, which fills remaining vertical space on page 2. Removing it may leave a visible gap. Mitigation: characters suppressing the notes panel (e.g. Talia with an overflowing spell list) won't have spare space anyway.
