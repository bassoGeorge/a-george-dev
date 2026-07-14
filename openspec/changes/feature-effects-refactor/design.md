## Context

The current model treats a `Feature` as capable of postprocessing `DerivedStats` only, via a single `statMod` field with three tagged variants (`static-skill-additions`, `skill-function`, `generic-derived`). Anything that logically alters the base `Character` — extra skill proficiencies, ability score bumps, +5 speed from a species — must be hand-baked into the authored character data, with the feature description carrying an "already considered in this sheet" disclaimer. This duplicates the source of truth and drifts.

Current call sites of `statMod` (only 4):
- `apps/game-tools/src/data/dnd-characters/common/common-feats.ts` — Alert (generic-derived, initiative + PB)
- `apps/game-tools/src/data/dnd-characters/talia-orien/talia-orien.ts` — Divine Order: Thaumaturge (static-skill-additions, +4 Arcana/Religion)
- `apps/game-tools/src/data/dnd-characters/zoynari/zoynari-2.ts` — Divine Order: Thaumaturge (static-skill-additions, +3 Arcana/Religion)
- `apps/game-tools/src/data/dnd-characters/saora-embervale/saora-embervale.ts` — Jack of all trades (generic-derived, +1 to normal skills)

`skill-function` has zero call sites — it exists but is unused; `Jack of all trades` (the case it was designed for) uses `generic-derived` instead.

## Goals / Non-Goals

**Goals:**
- Uniform way for a feature to express changes to both the raw `Character` and the computed `DerivedStats`.
- The authored character data file should contain only "base" data (base ability scores, base speed, base proficiencies from initial choices); species/background/subclass/feat bonuses become effects.
- Keep the ergonomics of authoring characters high — helpers for the boring hot path.
- Preserve all downstream component code without changes (`useCharacter().character` continues to expose one flat view).
- Migrate the 4 existing `statMod` call sites in the same change (hard swap, no dual-path plumbing).

**Non-Goals:**
- Provenance tracking (rendering "base 30 + 5 from Fleet of Foot"). Add later if wanted; the model does not preclude it.
- Declarative/serializable effect DSL (was considered as Option C during design; rejected in favor of function-based effects with helpers). Any future move to tagged data is a mechanical refactor over the helper call sites.
- Helpers for spellcasting mutations (extra cantrips, granted spells). Rare and one-off enough to write as escape-hatch `characterEffect(fn)` closures.
- Character-editor / builder UI use cases.

## Decisions

### Two-kind Effect union

```ts
type Effect =
  | { kind: 'character'; mod: (c: Character) => Character }
  | { kind: 'derived';   mod: (args: { character: Character; stats: DerivedStats }) => DerivedStats };
```

**Alternative considered — Option A (two separate fields `characterMod` / `statMod`)**: rejected because a feature that does both would author two functions and the ordering rule stays the same.

**Alternative considered — Option B (unified `mod` returning `Partial<{character, stats}>`)**: rejected because `stats` shown to a character-mutating branch is stale/meaningless, and returning partials complicates the fold.

**Alternative considered — Option C (declarative tagged effect variants)**: rejected — proven data (`common-feats` Alert, `saora` Jack of all trades) already needs escape-hatch closures, and the tagged union would grow unbounded. Helpers over functions gives the same authoring feel without the taxonomy burden.

### Derived effect receives effective character

The `derived` mod's `character` argument is the post-mutation view, not the raw authored data. This is the only defensible invariant: if a species grants +5 speed and a hypothetical derived effect reads speed, it must see 35, not 30. Consequence: derived effects should never mutate `character`; the type signature enforces that (return type is `DerivedStats`).

### Pipeline

```
rawCharacter
  → gatherEffects (features + speciesTraits + feats)
  → fold character-effects  →  effectiveCharacter
  → calculateBaseStats(effectiveCharacter)
  → fold derived-effects (each sees effectiveCharacter + running stats)
  → finalStats
  → computeResources(effectiveCharacter, finalStats)
```

`useCharacter().character` returns `effectiveCharacter`. `useCharacter().derived` returns `finalStats`. The existing `CharacterContextValue` shape is unchanged.

### Ordering and invariants

- Character-effects apply in the order `features` → `speciesTraits` → `feats` (declaration order within each list, then across lists in that sequence).
- Character-effect helpers that grant a list membership (`grantSkillProficiency`, `grantSkillExpertise`) THROW when the invariant is violated (duplicate skill proficiency; expertise on a skill the character is not proficient in *after* all character-effects apply). This surfaces authoring bugs at load-time rather than silently double-counting.
- Ability score bumps become character-effects (`bumpAbility`), so derived calculations (modifiers, save DCs, resource counts via `kind: 'ability'`, spell save DC) automatically pick them up. This is the primary correctness win.

### MVP helper set

```ts
// character-effect helpers
addSpeed(amount: number): Effect
bumpAbility(ability: Ability, amount: number): Effect
grantSkillProficiency(skill: Skill): Effect     // throws if already proficient
grantSkillExpertise(skill: Skill): Effect       // throws if not proficient (post-fold)

// derived-effect helpers
addSkillBonus(skill: Skill, amount: number): Effect  // replaces static-skill-additions

// escape hatches
characterEffect(fn: (c: Character) => Character): Effect
derivedEffect(fn: (args: { character: Character; stats: DerivedStats }) => DerivedStats): Effect
```

Enumeration is intentionally minimal — cover the immediate migration and defer anything speculative.

### Migration approach: hard swap

The `statMod` field is renamed and reshaped in the same PR that migrates all 4 call sites. No dual-path plumbing, no deprecation window. Justification: 4 call sites, all in-repo, all owned by the same author. A dual-path implementation would be strictly higher risk and cost.

## Risks / Trade-offs

- **Deep character mutations (spellcasting) are verbose.** Mitigation: no helper; author writes an inline `characterEffect(c => ...)`. Ugly but rare, and the "verbose-but-clear" spread is arguably fine at 1-2 call sites.
- **Loss of introspection.** Today's `static-skill-additions` variant is data — a UI could theoretically render "+4 Arcana" from feature metadata. After the collapse it's a closure. Mitigation: current app doesn't render effects; description text carries the human-facing signal. Tagged-data reintroduction is a mechanical refactor if ever needed.
- **`grantSkillProficiency` throwing at load-time could crash a page.** Mitigation: this is the intended behavior — it flags an authoring bug. Better than silent double-counting. The 4 files under migration are hand-checked.
- **Order sensitivity between character-effects.** No currently-planned effect is order-sensitive (all are additive or list-append). If a future feature is (e.g., "if you have Perception proficiency, ..."), the declaration-order rule gives a determinstic answer; document it.
- **The context's `character` field silently changes meaning** (raw → effective). Not a runtime break — all consumers already treat it as "the character's current state" — but worth calling out in the migration commit message.

## Migration Plan

1. Model changes in `packages/dnd-character-sheet`:
   - Add `Effect` type and `effects?: Effect[]` on `Feature`. Keep `statMod` alongside temporarily *only* long enough to make the pipeline change in isolation.
   - Introduce `packages/dnd-character-sheet/src/lib/effects/` with the 7 helpers.
   - Refactor `calculate-derived-stats.ts`: extract `gatherEffects`, fold character-effects to produce `effectiveCharacter`, refactor `calculateStats` to accept `effectiveCharacter`, then fold derived-effects.
   - Update `CharacterSheet` context to pass `effectiveCharacter` through `character`.
   - Update `calculate-derived-stats.test.ts` for the new pipeline; add tests for character-effect ordering, dedup errors, and derived-effect access to effective character.
2. Migrate 4 data files:
   - `common-feats.ts` — Alert uses `derivedEffect(...)`.
   - `talia-orien.ts` — Divine Order: Thaumaturge uses `[addSkillBonus(Skill.Arcana, 4), addSkillBonus(Skill.Religion, 4)]`.
   - `zoynari-2.ts` — same as talia with amount 3.
   - `saora-embervale.ts` — Jack of all trades uses `derivedEffect(...)`. Bonus Proficiencies express the 3 granted skills via `grantSkillProficiency(...)`; drop them from the base `skillProficiencies` list. Expertise (Insight, Deception) — the existing `expertise(...)` helper output is a `Feature`; update it to use `grantSkillExpertise(...)` internally.
3. Remove old `statMod` shape from `Feature`; delete `finaliseSkillBonus` and skill-function handling from `calculate-derived-stats.ts`.
4. Run `yarn format-and-lint:fix`, `yarn test`, and `yarn turbo build --filter=@ageorgedev/game-tools`. Visually verify each of the 4 characters' sheets render identically to before.

Rollback: revert the PR — no persisted state or external contract to unwind.

## Open Questions

- None. All resolved during grilling session.
