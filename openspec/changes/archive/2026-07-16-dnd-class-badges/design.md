## Context

`packages/dnd-character-sheet/src/icons/` already has one inline-SVG React component per `CharacterClass` (`CLASS_ICONS`), each using `fill="currentColor"` so color is controlled entirely by the consumer via `className`/text-color utilities. `CharacterRosterCard` currently receives a flattened `classes: string[]` (from `getCharacterBrief`), which loses per-class level information — needed to resolve which class is "primary" for a multiclass character. `TiltCard`'s only structural quirk is a `clip-path`-based `skewStyle`; roster cards pass no `shape`, so the clip-path resolves to a plain full-rectangle polygon (all `--t*/--b*` offset vars default to `0px`) — functionally equivalent to no clipping, so it needs no special handling.

## Goals / Non-Goals

**Goals:**
- Resolve a single "primary" class per character, defined as the highest-level class (ties broken by declaration order).
- Render that class's icon as a large, low-opacity, per-class-colored watermark behind `CharacterRosterCard`'s existing content, right-aligned and bleeding off the card edges.
- Reuse existing design tokens for per-class color, accepting that 13 classes will share a smaller number of distinct hues.

**Non-Goals:**
- Changing the existing text badge pills (still name-only, no icon, no color).
- Adding a generic "background graphic" API to `TiltCard`.
- Perfect 1:1 unique color per class — the token palette doesn't have 13 distinct hues.

## Decisions

**1. Primary-class resolution lives in `character-brief.ts`, not the route/component layer.**
`getCharacterBrief` already aggregates `character.classes` (each `{ name, level, subclass? }`) into `level` (summed) and `classes` (mapped names). It's extended to also compute `primaryClass: CharacterClass` — the entry with the highest `level`, and on a tie, the first-declared entry (`Array.prototype.reduce`, `>` not `>=` so the first max-level entry wins). This keeps the "what is primary" rule in one place, next to the only code that already has access to per-class levels. `CharacterRosterCardProps` gains `primaryClass: CharacterClass`, and the route (`_public/dnd/characters/index.tsx`) passes `c.brief.primaryClass` through alongside the existing `classes` prop.

Alternative considered: resolve primary class directly inside `CharacterRosterCard` by accepting the full `character.classes` array. Rejected — it would duplicate the level-aggregation logic that already exists in `character-brief.ts` and leak a more detailed shape (subclass, per-class level) into a presentational component that doesn't otherwise need it.

**2. `CLASS_COLORS` is a flat `Record<CharacterClass, string>` of Tailwind text-color utility classes, colocated with `CLASS_ICONS`.**
Since icons use `fill="currentColor"`, applying `CLASS_COLORS[primaryClass]` as a `text-*` class on the wrapping element sets the icon's rendered color — no changes to the icon components themselves. Values come from existing semantic/chart tokens (`packages/foundation-styles/src/lib/colors.css`), not new hex values:

| Class | Token |
|---|---|
| Artificer | `text-info-foreground` |
| Barbarian | `text-destructive-foreground` |
| Bard | `text-chart-2-surface` |
| Cleric | `text-warning-foreground` |
| Druid | `text-primary-foreground` |
| Fighter | `text-secondary-foreground` |
| Monk | `text-chart-3-surface` |
| Paladin | `text-warning-foreground-2` |
| Ranger | `text-chart-4-surface` |
| Rogue | `text-secondary-foreground-2` |
| Sorcerer | `text-info-foreground-2` |
| Warlock | `text-destructive-foreground-2` |
| Wizard | `text-primary-foreground-2` |

Alternative considered: bespoke hex per class for thematic accuracy (e.g. true D&D class-color conventions). Rejected per user decision — reusing existing tokens keeps the roster page visually consistent with the rest of the app's palette and avoids introducing colors that don't respond to future token/theme changes.

**3. Watermark is an absolutely-positioned sibling inside `CharacterRosterCard`, stacked behind text via negative `z-index`, not DOM order.**
Per CSS stacking rules, an `absolute`-positioned element with `z-index: auto` paints *above* in-flow static content, regardless of DOM order — so simply rendering the icon first in JSX would not put it behind the text. Instead:
- The card's content wrapper (the `className` passed into `TiltCard`, which becomes part of its `bg-page-1 p-6` inner div) gets `relative isolate` added.
- The icon renders as an `absolute` element with a negative z-index utility (e.g. `-z-10`), sized oversized (e.g. `h-40 w-40` or larger, exceeding the card's typical height) and positioned via `-right-6` / vertical centering so it bleeds off the right and bottom/top edges.
- `isolate` on the container creates a new stacking context scoped to the card, so the icon's negative z-index can't escape behind page-level backgrounds — it only drops behind the card's own text content, which is exactly the desired effect. No `overflow-hidden` is needed for clipping: `TiltCard`'s existing `clip-path` on that same element already clips any oversized child to the card's rectangular bounds.
- `aria-hidden="true"` (already set on every icon component) keeps the watermark out of the accessibility tree.

**4. `classes: string[]` prop and rendering stay as-is; only a new `primaryClass` prop is added.**
No existing prop is renamed or removed, so the change to `CharacterRosterCard`'s public shape is additive.

## Risks / Trade-offs

- **[Risk] 13 classes, ~8 distinct token hues → some classes share a hue family (differentiated only by shade weight, e.g. Cleric/Paladin both "warning" yellow-gold).** → Mitigation: acceptable per user decision; classes sharing a family are thematically related (e.g. both divine casters), and shade differs enough to be visually distinct within a single card.
- **[Risk] Watermark bleeding off card edges could visually collide with adjacent cards in the responsive grid if a card's `overflow` isn't actually clipped as assumed.** → Mitigation: verify via `preview_screenshot` at multiple grid widths that `TiltCard`'s `clip-path` does clip the oversized icon; if it doesn't (e.g. due to future `shape` usage changing clip-path vars), fall back to explicit `overflow-hidden` on the wrapping element.
- **[Risk] Tie-break for equal-level multiclass (e.g. Fighter 3 / Rogue 3) picks first-declared, which is somewhat arbitrary.** → Mitigation: matches existing `classes` badge ordering behavior, so it's at least consistent with what's already shown in the pills.

## Open Questions

None outstanding — resolved via grill-me session prior to this document.
