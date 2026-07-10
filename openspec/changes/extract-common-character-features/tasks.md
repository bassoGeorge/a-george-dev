## 1. Audit and resolve wording divergences

- [ ] 1.1 Diff the description strings of each candidate shared feat across all character files that use it; record any divergences and pick a canonical wording. Candidates: Alert, Tough, Savage Attacker, Skilled, Healer, Magic Initiate (Cleric), Two-Weapon Fighting.
- [ ] 1.2 Diff descriptions for shared class features across characters; record canonical wording. Candidates: Weapon Mastery, Second Wind, Tactical Mind, Action Surge, Combat Superiority, Expertise, Channel Divinity, Commanding Presence, Bait and Switch, Trip Attack.
- [ ] 1.3 Diff descriptions for shared species traits; record canonical wording. Candidates: Fey Ancestry, Keen Senses, Trance, Darkvision.

## 2. Build the shared registry

- [ ] 2.1 Populate `apps/game-tools/src/data/dnd-characters/common/common-feats.ts` with `SCREAMING_SNAKE_CASE` `Feature` constants for every fully-identical shared feat identified in 1.1.
- [ ] 2.2 Add factory functions in `common-feats.ts` for feats that take a small parameter (if any surface during 1.1).
- [ ] 2.3 Create `apps/game-tools/src/data/dnd-characters/common/common-class-features.ts` with constants for identical class features and factories for parameterised ones (`weaponMastery(masteries)`, `channelDivinity(usesPerRest)`, and any Battle Master maneuver helpers).
- [ ] 2.4 Create `apps/game-tools/src/data/dnd-characters/common/common-species-traits.ts` with constants for identical species traits and factories for subrace-parameterised ones (e.g., `darkvision(rangeFt)`).
- [ ] 2.5 Create `apps/game-tools/src/data/dnd-characters/common/index.ts` that re-exports the public surface of the three modules above.

## 3. Migrate character files one at a time

- [ ] 3.1 Refactor `claw/claw.ts` to import shared entries from `../common` (Alert; Weapon Mastery via factory; Expertise; Keen Senses).
- [ ] 3.2 Refactor `gonvar-feathertide/gonvar-feathertide.ts` (Alert, Savage Attacker; Fighter features: Second Wind, Tactical Mind, Action Surge, Combat Superiority, Weapon Mastery; Battle Master maneuvers).
- [ ] 3.3 Refactor `omarin-kenate/omarin-kenate.ts` (Tough, Two-Weapon Fighting; Fighter features shared with Gonvar; Fey Ancestry, Keen Senses, Trance, Darkvision).
- [ ] 3.4 Refactor `elnorin-lunarrest/elnorin-lunarrest.ts` (Magic Initiate — Cleric; Fey Ancestry, Keen Senses, Trance, Darkvision).
- [ ] 3.5 Refactor `saora-embervale/saora-embervale.ts` (Skilled; Expertise).
- [ ] 3.6 Refactor `splitter/splitter.ts` (Savage Attacker; Weapon Mastery via factory).
- [ ] 3.7 Refactor `zoynari/zoynari-2.ts` (Healer; Channel Divinity via factory).
- [ ] 3.8 Refactor `zoynari/zoynari-3.ts` (Channel Divinity via factory, updated uses count).

## 4. Verify

- [ ] 4.1 Run `yarn format-and-lint:fix` at the repo root.
- [ ] 4.2 Run `yarn turbo test --filter=@ageorgedev/game-tools` (and dnd-character-sheet package tests) to confirm nothing regressed.
- [ ] 4.3 Start `yarn turbo dev --filter=@ageorgedev/game-tools` and visually compare each character sheet against the pre-refactor version (`git stash`/checkout as needed) for features, feats, and species traits.
- [ ] 4.4 Remove any now-dead inline definitions and the placeholder TODO comment from the old `common-feats.ts`.

## 5. Wrap up

- [ ] 5.1 Commit with a descriptive message referencing this change.
- [ ] 5.2 Run `openspec validate extract-common-character-features` before archiving.
