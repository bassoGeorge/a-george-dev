## Why

`apps/game-tools/src/routes/_public.tsx` has grown to mix three responsibilities: the layout shell, breadcrumb derivation from router matches, and DnD-specific action icons (spellbook download + print). Extracting the breadcrumbs and DnD actions into dedicated components keeps `_public.tsx` focused on layout composition and makes the DnD-specific controls easier to evolve independently from the shell.

## What Changes

- Extract the breadcrumb trail (including the `deriveCrumbs` logic) from `_public.tsx` into a new `HeaderBreadcrumbs` component colocated with the layout route.
- Extract the DnD action icons (spellbook download link + print button) into a new `DndHeaderActions` component that internally inspects the current router matches to decide whether to render the spellbook link and/or the print button. `_public.tsx` renders it unconditionally.
- No behavior changes: the header renders the same crumbs, the same conditional icons, and the same print/download interactions as today.

## Capabilities

### New Capabilities

_None._ This is a pure structural refactor; no new user-facing behavior is introduced.

### Modified Capabilities

_None._ The behavior described in `game-tools-nav-shell`, `character-sheet-print`, and `character-spellbook-download` is preserved exactly; only the internal component boundaries change.

## Impact

- **Affected code**: `apps/game-tools/src/routes/_public.tsx`; two new sibling component files (`HeaderBreadcrumbs.tsx`, `DndHeaderActions.tsx`) alongside it.
- **APIs/dependencies**: none; no public exports change, no packages added.
- **Tests**: existing e2e coverage for breadcrumbs, print, and spellbook download continues to apply unchanged.
