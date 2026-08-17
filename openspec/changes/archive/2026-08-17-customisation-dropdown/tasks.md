## 1. User Preferences Context

- [x] 1.1 Create `apps/game-tools/src/context/UserPrefsContext.tsx` with `UserPrefs` type, `DEFAULT_USER_PREFS`, context, provider (reads/writes `localStorage` key `game-tools:userPrefs`), and `useUserPrefs` hook
- [x] 1.2 Add `UserPrefsProvider` to `GlobalProviders` wrapping children alongside `ThemeProvider`

## 2. Customisation Dropdown

- [x] 2.1 Add "Customise" trigger button and `DropdownMenu` to `DndHeaderActions`, using `SlidersIcon` (or `GearSixIcon`) from `@phosphor-icons/react`, styled to match existing action buttons
- [x] 2.2 Add `DropdownMenuLabel` "Beginner Help" group with `DropdownMenuCheckboxItem` entries for `showActionsInCombat` and `showWeaponMasteries`, wired to `useUserPrefs`

## 3. StandardCharacterSheet Integration

- [x] 3.1 Add `SheetUserPreferences` type and `userPreferences?: SheetUserPreferences` prop to `StandardCharacterSheet` in `packages/dnd-character-sheet`
- [x] 3.2 Replace `{!data.spellcasting && <ActionsInCombat />}` with `{userPreferences?.showActionsInCombat && <ActionsInCombat />}`
- [x] 3.3 Replace `{!data.spellcasting && <WeaponMasteries />}` with `{userPreferences?.showWeaponMasteries && <WeaponMasteries />}`
- [x] 3.4 Update the character sheet route (`$slug.{-$level}.tsx`) to read `useUserPrefs()` and pass the result as `userPreferences` to `StandardCharacterSheet`
