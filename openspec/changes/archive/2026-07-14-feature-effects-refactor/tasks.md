## 1. Model & type changes

- [x] 1.1 Add `Effect` type to `packages/dnd-character-sheet/src/lib/models/feature.ts` as a two-kind discriminated union (`character` | `derived`). Import `Character` from `./character` (may need to break a circular import; use a `type` import).
- [x] 1.2 Add `effects?: Effect[]` to `Feature`. Leave `statMod` in place temporarily for step 2's plumbing swap.
- [x] 1.3 Export `Effect` from `packages/dnd-character-sheet/src/index.ts`.

## 2. Effects pipeline

- [x] 2.1 Create `packages/dnd-character-sheet/src/lib/apply-effects.ts` exporting `applyCharacterEffects(rawCharacter: Character): Character` which folds all `kind: 'character'` effects from `features`, `speciesTraits`, and `feats` (in that order) over the raw character.
- [x] 2.2 Refactor `calculate-derived-stats.ts` so `calculateStats(character)` is renamed/restructured: (a) call `applyCharacterEffects` to produce `effectiveCharacter`, (b) compute base stats from `effectiveCharacter`, (c) fold derived-effects with `{ character: effectiveCharacter, stats }`.
- [x] 2.3 Change the return type of the top-level entry point to `{ character: Character; stats: DerivedStats }` (or expose both via a new function like `computeCharacterAndStats`) so `CharacterSheet.tsx` can consume the effective character.
- [x] 2.4 Delete `finaliseSkillBonus` and the `skill-function` branch. Delete `static-skill-additions` handling. Delete `generic-derived` handling from the old fold. Replace with the new derived-effect fold.
- [x] 2.5 Update `CharacterSheet.tsx` to consume the new return shape: `character` in the context becomes the effective character. `computeResources` receives effective character + final stats (already correct once effective character flows through).

## 3. Helper functions

- [x] 3.1 Create `packages/dnd-character-sheet/src/lib/effects/helpers.ts` exporting `addSpeed`, `bumpAbility`, `grantSkillProficiency`, `grantSkillExpertise`, `addSkillBonus`, `characterEffect`, `derivedEffect`.
- [x] 3.2 `grantSkillProficiency` throws when the skill is already present in the (in-progress-fold) `character.skillProficiencies`. `grantSkillExpertise` throws when the skill is not present in `character.skillProficiencies` *at the time it runs*. Order of application (features → speciesTraits → feats) means: to expertise a skill granted by a species trait, both effects work as long as the grant runs before the expertise. Document this in helper comments.
- [x] 3.3 Export helpers from `packages/dnd-character-sheet/src/index.ts`.

## 4. Tests

- [x] 4.1 Update `calculate-derived-stats.test.ts` — remove tests keyed on `statMod` variants; add tests for character-effect ordering, skill-proficiency grant → derived stats reflect proficiency bonus, ability bump → downstream modifiers/DCs update.
- [x] 4.2 Add a test verifying `derived` effect's `args.character` is the post-mutation view (e.g., bump speed then read speed in a derived effect).
- [x] 4.3 Add a test verifying `computeResources` reflects effect-bumped abilities for `kind: 'ability'` resources.
- [x] 4.4 Add tests for the throw cases: duplicate skill proficiency grant; expertise on a skill without proficiency.

## 5. Migrate data files

- [x] 5.1 `apps/game-tools/src/data/dnd-characters/common/common-feats.ts` — Alert: `statMod` → `effects: [derivedEffect(({ stats }) => ({ ...stats, initiative: stats.initiative + stats.proficiencyBonus }))]`.
- [x] 5.2 `apps/game-tools/src/data/dnd-characters/talia-orien/talia-orien.ts` — Divine Order: Thaumaturge: `statMod` → `effects: [addSkillBonus(Skill.Arcana, 4), addSkillBonus(Skill.Religion, 4)]`.
- [x] 5.3 `apps/game-tools/src/data/dnd-characters/zoynari/zoynari-2.ts` — Divine Order: Thaumaturge: `statMod` → `effects: [addSkillBonus(Skill.Arcana, 3), addSkillBonus(Skill.Religion, 3)]`.
- [x] 5.4 `apps/game-tools/src/data/dnd-characters/saora-embervale/saora-embervale.ts` — Jack of all trades: `statMod` → `effects: [derivedEffect(({ stats }) => ...same mapObjIndexed body... )]`.

## 6. Migrate "already considered in this sheet" cases (opt-in scope)

The following are the highest-value non-`statMod` migrations — features whose text says "already considered in this sheet" but whose real effect was hand-baked into `Character` fields. Doing these validates that the new system actually solves the driving problem. Scope may be trimmed if implementation drags.

- [x] 6.1 `saora-embervale.ts` — Bonus Proficiencies (Bard): remove the 3 hand-baked entries from `character.skillProficiencies` and express them via `grantSkillProficiency` on the Bonus Proficiencies feature. Reword the feature description to remove "already considered in this sheet".
- [x] 6.2 `saora-embervale.ts` — Bard Expertise (Insight, Deception): update the `expertise` common helper (`apps/game-tools/src/data/dnd-characters/common/common-class-features.ts`) to accept `Skill[]` and emit `grantSkillExpertise` effects. Update `expertise('Insight and Deception')` call site to `expertise([Skill.Insight, Skill.Deception])`. Remove the 2 hand-baked entries from `character.skillExpertise`.
- [x] 6.3 Audit any character with baked-in extra speed (species with +5 speed, Fleet of Foot feat) and migrate via `addSpeed`. Grep for `speed:` values that are non-standard (i.e., not 25/30/40/35) to find candidates.

## 7. Cleanup & verification

- [x] 7.1 Remove `statMod` field from `Feature`, and any remaining references (types, imports, index re-exports).
- [x] 7.2 Run `yarn format-and-lint:fix`.
- [x] 7.3 Run `yarn test` and confirm all tests pass.
- [x] 7.4 Run `yarn turbo build --filter=@ageorgedev/game-tools` — verify no type errors.
- [x] 7.5 Start `yarn turbo dev --filter=@ageorgedev/game-tools` and visually verify each of the 4 migrated character sheets renders identically (skills panel, initiative, speed, proficiencies).
