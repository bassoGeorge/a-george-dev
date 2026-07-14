## Why

Features today can only postprocess `DerivedStats` via `statMod`, but many real feature effects belong on the raw `Character` itself — species/background/subclass proficiencies, feat ability-score bumps, Fleet of Foot's +5 speed, Bard's Bonus Proficiencies. These are currently hand-baked into the authored character data with an "already considered in this sheet" note in the feature description, which duplicates truth and drifts.

## What Changes

- **BREAKING** Replace `Feature.statMod` with `Feature.effects: Effect[]`.
- Introduce a two-kind `Effect` union: `{ kind: 'character', mod: (c: Character) => Character }` and `{ kind: 'derived', mod: (args: { character, stats }) => DerivedStats }`.
- Collapse the three existing `statMod` variants (`static-skill-additions`, `skill-function`, `generic-derived`) into the two-kind `Effect` union. Remove `skill-function` entirely (already redundant with `generic-derived`).
- Rework `calculateStats` (or introduce a companion) to run in phases: gather effects → fold character-effects → compute base stats → fold derived-effects.
- Expose the post-effect `effectiveCharacter` through `useCharacter().character` so all existing consumers automatically see the correct values.
- Add a small MVP helper set: `addSpeed`, `bumpAbility`, `grantSkillProficiency`, `grantSkillExpertise`, `addSkillBonus`, `characterEffect`, `derivedEffect`. Helpers throw on invalid stacking (duplicate proficiency grant, expertise without proficiency).
- Migrate all `statMod` usages in `apps/game-tools/src/data/dnd-characters/` (common-feats, talia-orien, zoynari-2, saora-embervale) to the new `effects` shape in the same change.

## Capabilities

### New Capabilities

- None

### Modified Capabilities

- `dnd-character-sheet-package` — the feature/stat-calculation surface changes shape (new field on `Feature`, changes to how derived stats are computed, new post-effect character view exposed through the context).

## Impact

- **`packages/dnd-character-sheet/src/lib/models/feature.ts`** — replace `statMod` union with `effects: Effect[]`; add `Effect` type.
- **`packages/dnd-character-sheet/src/lib/calculate-derived-stats.ts`** — split into effect gathering + character-effect fold + base stat calc + derived-effect fold.
- **`packages/dnd-character-sheet/src/lib/effects/`** (new) — helper functions (`addSpeed`, `bumpAbility`, `grantSkillProficiency`, `grantSkillExpertise`, `addSkillBonus`, `characterEffect`, `derivedEffect`).
- **`packages/dnd-character-sheet/src/components/CharacterSheet.tsx`** — expose effective character (mutated by effects) via context. No API shape change on the context value, but the `character` reference is now the effective view.
- **`packages/dnd-character-sheet/src/index.ts`** — export new helpers and `Effect` type.
- **`apps/game-tools/src/data/dnd-characters/common/common-feats.ts`**, **`talia-orien.ts`**, **`zoynari-2.ts`**, **`saora-embervale.ts`** — migrate `statMod` → `effects`. Delete "already considered in this sheet" hand-baked values from base data (skill proficiencies, expertise, speed bumps) and express them as effects.
- **Tests**: `calculate-derived-stats.test.ts` updates to cover new effects pipeline (character effects, ordering, dedup errors).
- No consumer component changes required — they already read from `useCharacter().character`.
