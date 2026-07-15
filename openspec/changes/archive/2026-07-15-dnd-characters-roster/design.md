## Context

`/dnd/characters` (`apps/game-tools/src/routes/_public/dnd/characters/index.tsx`) currently loads `AllMyCharactersInBrief` from a central data map (`apps/game-tools/src/data/dnd-characters/index.ts`) and renders one link per snapshot in a flat vertical list, sorted by however the map iterates. There are 9 snapshots today across 8 characters (Zoynari has 2, at levels 2 and 3).

The goal is browsing, not real-time triage: players peruse the roster ahead of a session and pick a character appropriate to that session's level. A character intentionally can appear more than once (once per saved level snapshot) since a lower-level snapshot of the same character is a legitimately different pick for a lower-level session.

## Goals / Non-Goals

**Goals:**
- Group snapshots by level (ascending), one card per snapshot (not deduped per character)
- Card shows name, species, one badge per class, and a computed/overridable description
- Responsive grid layout per level section
- Extend `getCharacterBrief()` with `species` and `classes` (names only)

**Non-Goals:**
- Search or text filtering (scale doesn't warrant it yet)
- Class-specific badge coloring (deferred — plain text pills for now, per explicit decision to introduce dedicated design components later)
- Status/availability/party metadata (no current use case; not part of the data model)
- Showing subclass on the badge itself (kept to plain class name; subclass moves into the description line instead)
- Changing the full-page level ladder to show empty levels (only levels with characters render)

## Decisions

### 1. Group by level, one card per snapshot, not per unique character

The roster's job is "what can I pick up for a level-N session," so level is the primary axis, and a lower-level snapshot of a character is a distinct valid pick. Grouping/deduping to "one card per character" would hide legitimate options.

**Alternative considered**: dedupe to the highest saved level per character — rejected, contradicts the stated intent to pick by session level.

### 2. `getCharacterBrief()` gains `species` and `classes`, badges are plain class names

`Character.classes` already models `{name, subclass?, level}[]`; brief only surfaced a collapsed `description` string. Extending the return shape keeps this the single "list projection" for a character, avoiding a second computation route for the same source data. Badges intentionally omit subclass to keep them scannable — subclass detail moves to the description line instead.

**Alternative considered**: badges as `"Fighter (Battlemaster)"` — rejected as too long for a compact pill; full detail remains one click away on the character sheet.

### 3. Default description format: species + subclasses only (classes without subclass dropped)

Since class names now appear as badges, repeating them in the description line would be redundant. The new default fallback (used only when `character.customDescription` is unset) is species followed by whichever classes *do* have a subclass, e.g. `Half-Elf · Battlemaster` for a Fighter(Battlemaster)/Rogue(no subclass) multiclass — the plain "Rogue" is omitted since it's already a badge.

**Alternative considered**: keep old format (`species` + all class-or-subclass names) — rejected as duplicative with the new badges.

### 4. Grid layout per level section

With badges/species added, cards carry more content than the current single-line link. A responsive wrap/grid (e.g. 2-3 per row on desktop, 1 on mobile) lets players scan more snapshots per screen within a level section than a strict single column.

### 5. Roster card is built on top of the shared `TiltCard` component, not a bare `<a>`/`<div>`

`packages/design-system/src/cards/TiltCard.tsx` already provides a bordered, shadowed, interactive card treatment (`elv-raised-md`, `bg-line` border, `interactive` hover-lift via `elv-raised-lg` + `-translate-y-2`) used elsewhere in the app (e.g. the talks list on the main site). The new roster card component SHALL render `<TiltCard>` as its root element — `interactive` enabled for the hover/press affordance, no `shape` (so it renders as a plain rectangle, since `TiltCard`'s skew classes only apply when a `shape` is set) — passing `className` for the internal flex layout (name, species, badge row, description) rather than reimplementing border/shadow/hover styling from scratch. The clickable behavior wraps a `Link` around the card so there's a single focusable/interactive element.

**Alternatives considered**:
- A bespoke card `div` with its own border/shadow classes (as sketched in the exploratory mockup) — rejected, duplicates styling that already exists in the design system.
- `packages/design-system/src/cards/Card.tsx` (a simpler bordered/shadowed `div` with no interactive hover state) — this was the original choice, corrected after the fact in favor of `TiltCard` since it already provides the interactive hover-lift affordance a clickable roster card wants, and matches the pattern already used for other link-cards in the app (e.g. `apps/ageorgedev`'s talks list).

## Risks / Trade-offs

- **Existing `dnd-character-roster` spec (`openspec/specs/game-tools-character-routes/spec.md`) already describes a `staticData.character`-driven list that doesn't match current implementation** (a centralized data map is used instead) — this proposal's spec delta will supersede/correct that drift as part of landing this change, but it's a pre-existing inconsistency independent of this feature.
- Changing `getCharacterBrief()`'s default description format is a behavior change for any character without `customDescription` set — needs a check of which current characters rely on the old fallback vs. have an explicit override, so their card text doesn't regress unexpectedly.
