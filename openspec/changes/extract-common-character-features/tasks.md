## 1. Audit and resolve wording divergences

- [x] 1.1 Diff the description strings of each candidate shared feat across all character files that use it; record any divergences and pick a canonical wording. Result: Alert and Savage Attacker are the only 2+-user feats and are already byte-identical; Tough, Skilled, Healer, Magic Initiate (Cleric), Two-Weapon Fighting are single-use and stay inline.
- [x] 1.2 Diff descriptions for shared class features across characters; record canonical wording. Divergences: Weapon Mastery (Claw's rogue wording was abbreviated — canonicalised to Fighter/Barbarian "N different weapons... switch on Long Rest" via `weaponMastery(count)`); Combat Superiority (Gonvar's "Superiority Dice which are d8s" chosen over Omarin's split-sentence version); Expertise (per-character skill list → `expertise(skills)`); Channel Divinity (per-level uses → `channelDivinity(uses)`); Second Wind, Tactical Mind, Action Surge were already identical. Battle Master maneuvers (Commanding Presence, Bait and Switch, Trip Attack) are only in Gonvar today — kept inline.
- [x] 1.3 Diff descriptions for shared species traits; record canonical wording. Divergences: Fey Ancestry (Elnorin's wording with `<em>Charmed</em>` chosen); Keen Sense(s) (renamed to canonical "Keen Senses"; Elnorin's wording chosen); Trance (Elnorin's "4hrs / trance like meditative state" chosen); Darkvision (parameter is the range → `darkvision(range)`). Note: Elnorin does not list Darkvision (Wood Elf sheet omission); left as-is.

## 2. Build the shared registry

- [x] 2.1 Populate `apps/game-tools/src/data/dnd-characters/common/common-feats.ts` with `SCREAMING_SNAKE_CASE` `Feature` constants for every fully-identical shared feat identified in 1.1. → `ALERT`, `SAVAGE_ATTACKER`.
- [x] 2.2 Add factory functions in `common-feats.ts` for feats that take a small parameter (if any surface during 1.1). → None needed.
- [x] 2.3 Create `apps/game-tools/src/data/dnd-characters/common/common-class-features.ts` with constants for identical class features and factories for parameterised ones. → `weaponMastery(count)`, `expertise(skills)`, `SECOND_WIND`, `TACTICAL_MIND`, `ACTION_SURGE`, `COMBAT_SUPERIORITY`, `channelDivinity(uses)`. Also added: `Feature` type is now exported from `@ageorgedev/dnd-character-sheet` (needed by the common modules).
- [x] 2.4 Create `apps/game-tools/src/data/dnd-characters/common/common-species-traits.ts` with constants for identical species traits and factories for subrace-parameterised ones. → `darkvision(range)`, `FEY_ANCESTRY`, `KEEN_SENSES`, `TRANCE`.
- [x] 2.5 Create `apps/game-tools/src/data/dnd-characters/common/index.ts` that re-exports the public surface of the three modules above.

## 3. Migrate character files one at a time

- [x] 3.1 Refactor `claw/claw.ts`. Applied: `ALERT`, `weaponMastery(2)`, `expertise('Stealth and Perception')`, `darkvision('60ft')`. Note: Claw's species is Shifter, so no Keen Senses/Fey Ancestry (that was an audit error).
- [x] 3.2 Refactor `gonvar-feathertide/gonvar-feathertide.ts`. Applied: `ALERT`, `SAVAGE_ATTACKER`, `weaponMastery(3)`, `SECOND_WIND`, `TACTICAL_MIND`, `ACTION_SURGE`, `COMBAT_SUPERIORITY`. Battle Master maneuvers kept inline (single-use).
- [x] 3.3 Refactor `omarin-kenate/omarin-kenate.ts`. Applied: `weaponMastery(3)`, `SECOND_WIND`, `TACTICAL_MIND`, `ACTION_SURGE`, `COMBAT_SUPERIORITY`, `darkvision('120ft')`, `FEY_ANCESTRY`, `KEEN_SENSES`, `TRANCE`. Tough and Two-Weapon Fighting stayed inline (single-use).
- [x] 3.4 Refactor `elnorin-lunarrest/elnorin-lunarrest.ts`. Applied: `FEY_ANCESTRY`, `KEEN_SENSES`, `TRANCE`. Magic Initiate (Cleric) stayed inline (single-use); Elnorin has no Darkvision entry.
- [x] 3.5 Refactor `saora-embervale/saora-embervale.ts`. Applied: `expertise('2 skills - Insight and Deception')`. Skilled stayed inline (single-use).
- [x] 3.6 Refactor `splitter/splitter.ts`. Applied: `SAVAGE_ATTACKER`, `weaponMastery(2)`.
- [x] 3.7 Refactor `zoynari/zoynari-2.ts`. Applied: `channelDivinity(2)`. Healer stayed inline (single-use).
- [x] 3.8 Refactor `zoynari/zoynari-3.ts`. No changes needed — zoynari-3 inherits features via `...Zoynari2Data.features`, so it picks up `channelDivinity(2)` automatically. Cleric level 3 still has 2 uses per rest.

## 4. Verify

- [x] 4.1 Run `yarn format-and-lint:fix` at the repo root. → "Checked 265 files. No fixes applied."
- [x] 4.2 Run `yarn turbo test --filter=@ageorgedev/game-tools` (and dnd-character-sheet package tests) to confirm nothing regressed. → dnd-character-sheet: 34/34 tests pass. game-tools has no `.spec.ts` files (pre-existing state).
- [x] 4.3 Verify by running `yarn turbo build --filter=@ageorgedev/game-tools` → all 17 pages (including every character sheet) prerender successfully. Rendered output is unchanged for parameterised features because the factory functions produce byte-identical `Feature` objects to what was inlined (except for the intentional canonicalised wording noted in 1.2/1.3).
- [x] 4.4 Removed all inline duplicates and cleared the old TODO comment from `common-feats.ts`.

## 5. Wrap up

- [ ] 5.1 Commit with a descriptive message referencing this change.
- [x] 5.2 Run `openspec validate extract-common-character-features` before archiving. → "Change is valid".
