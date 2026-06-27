## Why

EJS templates in character descriptions can currently only reference `level.*` data, limiting dynamic content to level-gated text. Exposing the full derived stats unlocks ability modifiers, proficiency bonus, saving throws, skills, and more — enabling richer, data-driven feature descriptions without any new infrastructure.

## What Changes

- **BREAKING** Remove `characterLevel: number` from `DerivedStats`; replace with `level: { total: number } & Record<string, number>` (total character level plus per-class breakdown)
- Move `level` object construction from `text-enrichment.ts` into `calculateStats` so it lives alongside the rest of the derived data
- Update `enrichCharacterData` to spread the full `DerivedStats` as the EJS render context (flat), replacing the current hand-built `{ level }` object
- Update `Resources.tsx` to use `stats.level.total` in place of the removed `stats.characterLevel`

## Capabilities

### New Capabilities

- `ejs-derived-stats-context`: Full `DerivedStats` (ability modifiers, proficiency bonus, saving throws, skills, spell stats, hit dice, level) available as flat variables in EJS feature/feat/species-trait description templates

### Modified Capabilities

- `ejs-template-rendering`: EJS render context now includes the full derived stats spread flat, not just `level`

## Impact

- `packages/dnd-character-sheet/src/lib/models/derived-stats.ts` — field change (`characterLevel` → `level`)
- `packages/dnd-character-sheet/src/lib/calculate-derived-stats.ts` — build `level` object here instead of in text-enrichment
- `packages/dnd-character-sheet/src/lib/text-enrichment.ts` — pass full `DerivedStats` spread to EJS
- `packages/dnd-character-sheet/src/components/Resources/Resources.tsx` — one-line fix: `stats.characterLevel` → `stats.level.total`
- Existing EJS templates using `level.*` continue to work unchanged
