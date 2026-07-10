## 1. Model

- [x] 1.1 Extend `Refresh` union in `packages/dnd-character-sheet/src/lib/models/feature.ts` with `{ kind: 'per-turn' }`
- [x] 1.2 Confirm `ResourceCount` shape works for a die-only resource (Martial Arts). If it doesn't, adopt the `{ kind: 'fixed', value: 1 }` convention documented in design.md

## 2. Pipeline

- [x] 2.1 Verify `calculate-resources.ts` handles per-turn resources with no code changes required (count/die resolution unchanged); add a targeted unit test
- [x] 2.2 Confirm `enrichCharacterData` already keys per-turn resources into the EJS `resources` lookup by id; add a unit test

## 3. Panel filter

- [x] 3.1 In `components/Resources/Resources.tsx`, skip rendering rows where `refresh.kind === 'per-turn'`
- [x] 3.2 Add a component test: character with one per-turn resource and one short-rest resource; only the short-rest resource renders

## 4. Data migration — Claw's Sneak Attack

- [x] 4.1 In `apps/game-tools/src/data/dnd-characters/claw/claw.ts`, replace the Sneak Attack feature with a resource-bearing form: `id: 'sneakAttack'`, `refresh: { kind: 'per-turn' }`, `count: class-level-steps` (Rogue 1/3/5/7/9/11/13/15/17/19 → 1/2/3/4/5/6/7/8/9/10), `die: { kind: 'fixed', value: 'd6' }`
- [x] 4.2 Rewrite the description to interpolate `<%= resources.sneakAttack.count %><%= resources.sneakAttack.die %>` in place of the hardcoded `2d6`

## 5. Data migration — Omarin's Martial Arts

- [x] 5.1 In `apps/game-tools/src/data/dnd-characters/omarin-kenate/omarin-kenate.ts`, add a resource to Martial Arts: `id: 'martialArts'`, `refresh: { kind: 'per-turn' }`, `die: { kind: 'class-level-steps', class: 'Monk', steps: { 1: 'd6', 5: 'd8', 11: 'd10', 17: 'd12' } }`, count per 1.2's decision
- [x] 5.2 Rewrite the description to reference `<%= resources.martialArts.die %>` in place of the hardcoded `1d6`

## 6. Verification

- [x] 6.1 Run `yarn turbo test --filter=@ageorgedev/dnd-character-sheet` — all tests pass
- [x] 6.2 Run `yarn turbo dev --filter=@ageorgedev/game-tools` and visually confirm Claw's Sneak Attack description reads `2d6` and Omarin's Martial Arts description reads `d6`
- [x] 6.3 Run `yarn format-and-lint:fix`
