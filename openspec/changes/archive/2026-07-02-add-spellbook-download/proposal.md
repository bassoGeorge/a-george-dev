## Why

Some D&D characters (e.g., Zoynari at level 2) have a companion spellbook PDF that supplements the character sheet. The character route already declares `staticData.spellBookUrl` for these characters, but there is no UI to access the file — players have to know the URL exists. A download button in the header, alongside the existing print button, gives players a one-click way to grab the spellbook for the character they are currently viewing.

## What Changes

- Add a Spellbook Download button to the `_public.tsx` header in `apps/game-tools`, rendered beside the existing Print button.
- The button SHALL only appear when the active character route exposes a `staticData.spellBookUrl` value.
- Activating the button SHALL trigger a browser download of the referenced PDF (using an anchor tag with `download` attribute), not open it inline.
- The button SHALL be hidden during printing (matches the existing `print:hidden` header behaviour).
- The button SHALL be hidden on non-character-sheet routes and on character-sheet routes that lack a spellbook URL.

## Capabilities

### New Capabilities
- `character-spellbook-download`: Header-level control that surfaces a downloadable spellbook PDF for the currently viewed character sheet when one is defined in route static data.

### Modified Capabilities
<!-- None — the existing character-sheet-print and game-tools-nav-shell specs continue to hold; the new button is additive. -->

## Impact

- **Code**: `apps/game-tools/src/routes/_public.tsx` (add button + staticData lookup). No new packages required — `@phosphor-icons/react` is already used for the print icon.
- **Data**: Relies on the pre-existing `staticData.spellBookUrl` field declared in `apps/game-tools/src/type-enhancements.d.ts`. No route data changes required beyond what already exists (e.g., `zoynari.2.tsx`).
- **APIs / Dependencies**: None.
- **Accessibility**: Button needs an `aria-label` (e.g., "Download spellbook PDF") consistent with the print button.
