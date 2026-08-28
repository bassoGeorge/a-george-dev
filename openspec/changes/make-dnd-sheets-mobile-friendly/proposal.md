## Why

Game Tools character sheets are designed for desktop and print, but their fixed multi-column layouts and single-row navigation break down on phone-sized screens. The application needs a mobile-safe, read-only companion view while preserving the existing desktop and printed sheets exactly.

## What Changes

- Make the shared Game Tools header wrap cleanly below the existing 600px `tablet` breakpoint while retaining visible labels and the complete breadcrumb trail.
- Hide the character-sheet Print action on mobile; printing from mobile browsers is explicitly unsupported.
- Make both character-sheet pages flow vertically on mobile, preserving their page boundaries, content, preferences, and existing DOM order.
- Adapt each sheet section incrementally with simple stacking, wrapping, or section-local table scrolling so the page itself does not overflow horizontally at the supported 390px viewport.
- Preserve the current layout and print presentation from 600px upward without intentional desktop refactoring.
- Follow the custom Tailwind theme: custom responsive breakpoints, exponential spacing tokens, and theme-aware colors without standard `sm`/`md` assumptions or `dark:` variants.
- Add proportionate behavioural regression coverage and manually inspect representative character-data extremes.

## Capabilities

### New Capabilities

- `mobile-dnd-character-sheet`: Defines the read-only mobile layout, stacking, wrapping, overflow, compatibility, and desktop-preservation requirements for D&D character sheets.

### Modified Capabilities

- `game-tools-nav-shell`: Adds below-600px wrapping behaviour for branding, breadcrumbs, character actions, and theme controls.
- `character-sheet-print`: Limits the visible Print action to viewports at or above 600px while retaining existing desktop print behaviour.

## Impact

- Affects the shared public layout and header components in `apps/game-tools`.
- Affects responsive layout classes and styles across `packages/dnd-character-sheet` components.
- Adds or updates focused browser and component coverage where responsive behaviour has stable observable outcomes.
- Introduces no API, character-data, dependency, editing, or persistence changes.
- Preserves the current desktop and print experience; mobile printing is not supported.
