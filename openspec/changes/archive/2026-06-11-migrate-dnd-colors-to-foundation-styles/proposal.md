## Why

The `dnd-character-sheet` package uses raw Tailwind color classes (`text-gray-400`, `bg-green-500`, etc.) and a local `tokens.css` file with hand-coded hex values, bypassing the foundation-styles design system entirely. This creates drift risk and means the sheet won't benefit from future design token updates.

## What Changes

- Remove `packages/dnd-character-sheet/src/styles/tokens.css` and all references to its custom properties (`--color-sheet-red`, `--color-sheet-dark`, `--color-sheet-parchment`, `--color-sheet-border`)
- Replace raw Tailwind color classes with foundation-styles semantic Tailwind classes where a semantic match exists
- Replace remaining colors with swatch arbitrary-value syntax (`bg-[var(--s-parchment-400)]`) where no semantic class applies
- Apply the following color mapping across all component files:

| Removed | Replacement | Type |
|---|---|---|
| `--color-sheet-dark`, `text-gray-600` | `text-neutral-strong` | semantic |
| `text-gray-400`, `text-gray-500` | `text-neutral-subdued` | semantic |
| `border-gray-300`, `border-gray-400` | `border-neutral-disabled` | semantic |
| `border-gray-500`, `bg-gray-500` | `border-neutral-subdued` / `bg-neutral-subdued` | semantic |
| `bg-green-500` | `bg-primary-surface-2` | semantic |
| `border-green-600` | `border-primary-surface-2` | semantic |
| `text-red-200` | `text-destructive-foreground` | semantic |
| `border-red-800`, `--color-sheet-red` borders | `border-destructive-surface-2` | semantic |
| `bg-sheet-red` header/button fills | `bg-destructive-surface-2 text-destructive-onsurface-2` | semantic |
| `--color-sheet-parchment` sheet background | `bg-page-0` | semantic |
| `--color-sheet-border` tan borders | `border-[var(--s-parchment-400)]` | swatch |
| `bg-white`, `text-white` | unchanged | — |

## Capabilities

### New Capabilities

- `dnd-color-migration`: Replace all color usage in `packages/dnd-character-sheet` with foundation-styles tokens, removing `tokens.css`

### Modified Capabilities

## Impact

- **`packages/dnd-character-sheet`** — all component files and `tokens.css`
- No API changes; purely visual/CSS
- Requires `packages/foundation-styles` to be available as a dependency (verify it is already wired up)
