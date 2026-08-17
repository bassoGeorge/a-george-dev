## Context

`game-tools` is a TanStack Start app with a shared layout (`_public.tsx`) and a header (`DndHeaderActions`) that sits outside the character sheet component tree. The character sheet (`StandardCharacterSheet`) already has a `VisualAdjustmentsContext` for per-character static config, but nothing for user-controlled runtime preferences. The two components need to share mutable state, which requires a common ancestor provider.

## Goals / Non-Goals

**Goals:**
- Introduce a runtime user preferences context accessible to both the app header and character sheet components
- Persist preferences to `localStorage` so they survive page refreshes
- Add a customise dropdown in the header for toggling optional reference panels
- Keep `VisualAdjustmentsContext` unchanged — it remains the per-character static config channel

**Non-Goals:**
- Per-character preference overrides (prefs are global)
- Server-side or cross-device preference sync
- Preference UI outside of `DndHeaderActions`
- Notes panel toggle (deferred to a separate change)

## Decisions

### New `UserPrefsContext` rather than extending `VisualAdjustmentsContext`

`VisualAdjustmentsContext` is set by character data authors (static, per-character). Merging user-controlled runtime state into it would conflate two distinct concerns and make it harder to reason about which values come from where. A separate context keeps the separation clean.

**Alternative considered**: Lift `VisualAdjustmentsContext` out and make it mutable. Rejected — the existing provider lives inside `StandardCharacterSheet` and is scoped to the sheet, while user prefs need to be accessible in the header above the sheet.

### Provider lives in `GlobalProviders`

`GlobalProviders` is the top-level wrapper for all app content, making it the right place for app-wide concerns. Placing the provider in `_public.tsx` layout would work but ties the prefs lifecycle to that layout segment; `GlobalProviders` is more durable and already hosts `ThemeProvider`.

### `localStorage` for persistence

Preferences like "show beginner help" are user-level settings, not session state. Using `localStorage` (same pattern as theme) means they persist across visits without any server involvement. A simple JSON-serialised object under a single key (`game-tools:userPrefs`) is sufficient.

### Granular booleans per panel

Each panel has an independent boolean (`showActionsInCombat`, `showWeaponMasteries`) rather than a grouped `beginnerHelp` flag. This lets future panels be added without changing the type shape of existing prefs, and allows individual panels to be toggled independently if needed later.

### Remove `!data.spellcasting` guard

The guard was a proxy for "panels are only relevant for martial characters." With an explicit user toggle, the user decides what they want to see — the character type is no longer the gatekeeper.

### `StandardCharacterSheet` accepts `userPreferences` as an optional prop

The `dnd-character-sheet` package defines its own `SheetUserPreferences` type and `StandardCharacterSheet` accepts it as an optional prop. When absent, all flags default to `false`. The character sheet route in `game-tools` reads from `useUserPrefs()` and passes the values down.

This keeps the package boundary clean — `dnd-character-sheet` has no knowledge of `game-tools` contexts or localStorage. The package owns its own prop types; the app owns the persistence and state management.

**Alternative considered**: `StandardCharacterSheet` reads directly from a `UserPrefsContext` provided by `game-tools`. Rejected — this inverts the dependency (package depends on app) and makes the package unusable without the app's provider.

## Risks / Trade-offs

- **`localStorage` unavailable (SSR / private browsing)** → Wrap reads in a try/catch and fall back to default prefs. TanStack Start is SSG but components hydrate client-side; the initial render will use defaults and then sync after hydration.
- **Type duplication**: `SheetUserPreferences` in `dnd-character-sheet` and `UserPrefs` in `game-tools` cover the same shape. The app type can import and re-use `SheetUserPreferences` to avoid drift.
