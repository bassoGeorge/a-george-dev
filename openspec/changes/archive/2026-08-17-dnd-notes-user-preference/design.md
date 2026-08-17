## Context

Character sheets currently use `notesRows` from `VisualAdjustments` (a per-character, design-time setting) both to configure how many rows the Notes panel has AND as an implicit visibility gate (`notesRows > 0`). The `VisualAdjustments` type is a structural/layout concern, not a user preference — it's typically set in character data or defaults, not toggled at runtime. The existing user preferences system (`UserPrefsContext`, `SheetUserPreferences`) is the right home for runtime on/off toggles.

## Goals / Non-Goals

**Goals:**
- Add `showNotes` as a runtime boolean in `SheetUserPreferences` and `UserPrefsContext`
- Remove `notesRows` from `VisualAdjustments` entirely; `NotesPanel` hardcodes `lineCount={10}`
- Expose a Notes toggle in the Customise dropdown, grouped outside "Beginner Help"
- Default `showNotes` to `true` so existing sheets are unaffected

**Non-Goals:**
- Making the row count itself a user preference
- Migrating any other `VisualAdjustments` fields to user prefs

## Decisions

### `showNotes` defaults to `true`

Currently notes render by default (default `notesRows: 10`). Defaulting `showNotes: true` preserves this behaviour so no existing character sheet loses its notes panel on first load.

**Alternative considered**: default `false` (opt-in). Rejected — would silently remove notes for all existing users until they toggle it on.

### Notes toggle is placed before the "Beginner Help" group in the dropdown

The Beginner Help items (`showActionsInCombat`, `showWeaponMasteries`) are reference content aimed at new players. Notes is a general layout preference, not beginner-specific. Placing it before the group with its own label (or as an unlabelled standalone item) makes the grouping semantics clear.

**Alternative considered**: a separate "Layout" group after Beginner Help. Overkill for one item — a single separator above "Beginner Help" is sufficient.

### `StandardCharacterSheet` still uses `userPreferences` prop (no context)

The sheet package is context-free by design; prefs are injected from the route layer. This change follows the same pattern already used for `showActionsInCombat` / `showWeaponMasteries`.

### `notesRows` is removed, not replaced

The only consumer of `notesRows` beyond the default was one character (`dnd-characters/index.ts`) using `notesRows: 0` to suppress notes. That intent is now expressed via `showNotes: false` passed from the route. Removing the field simplifies the `VisualAdjustments` surface; there's no value in keeping a configurable row count that no character actually overrides to anything other than 0.

**Alternative considered**: keep `notesRows` as a pure row-count field (no visibility semantics). Rejected — the only real-world use of it was the `=0` visibility hack; without that use case the field has no callers.

## Risks / Trade-offs

- **Stale localStorage** → Users with `showNotes` absent from localStorage get the default `true` via spread-merge in `readFromStorage`. No migration needed.
- **Breaking change on `VisualAdjustments`** → Any external consumer passing `notesRows` in `visualAdjustments` will get a TypeScript error. Acceptable — the type is internal to this monorepo; one call site to fix (`dnd-characters/index.ts`).
