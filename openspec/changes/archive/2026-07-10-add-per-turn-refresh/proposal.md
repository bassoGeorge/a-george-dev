## Why

Some class features scale with class level but reset every turn — Sneak Attack dice, the Monk's Martial Arts die, and similar. They share the *computation* semantics of a tracked resource (class-level counts, die progressions) but not the *tracking* semantics (there's nothing to tick off between rests). Today those values are hardcoded in feature descriptions (`"extra 2d6 damage"`), which drifts as characters level up and blocks the shared computation pipeline from being the single source of truth.

## What Changes

- Extend `Refresh` union with a new variant `{ kind: 'per-turn' }`.
- Filter `per-turn` resources out of the Resources panel — they still compute, they just don't render as trackable rows.
- Keep `per-turn` resources in the EJS `resources` lookup so feature descriptions can reference `<%= resources.<id>.count %>` and `<%= resources.<id>.die %>`.
- No `.notation` convenience — authors interpolate `count` and `die` separately (`2` + `d6` = `2d6`) to avoid semantic ambiguity between "roll N dice together" and "N separate uses of one die."
- Migrate Claw's Sneak Attack to use a per-turn resource with `count: class-level-steps` (Rogue 1/3/5/…/19 → 1/2/3/…/10) and `die: { kind: 'fixed', value: 'd6' }`. Description references the resource by id.
- Migrate Omarin's Martial Arts to use a per-turn resource with `die: class-level-steps` (Monk 1/5/11/17 → d6/d8/d10/d12) and no count. Description references the resource by id.

## Capabilities

### New Capabilities
_(none)_

### Modified Capabilities
- `dnd-character-resources`: `Refresh` gains a `per-turn` variant with defined rendering (filtered from panel) and EJS-lookup (still exposed) semantics.

## Impact

- **Code**: `packages/dnd-character-sheet/src/lib/models/feature.ts` (Refresh union), `lib/calculate-resources.ts` (no filter — computes as usual), `components/Resources/Resources.tsx` (skip rows where `refresh.kind === 'per-turn'`), tests.
- **Data**: `apps/game-tools/src/data/dnd-characters/claw/claw.ts` (Sneak Attack), `apps/game-tools/src/data/dnd-characters/omarin-kenate/omarin-kenate.ts` (Martial Arts).
- **Dependencies**: None.
- **Consumers**: Existing per-rest resources are unaffected — the new `Refresh` kind is additive.
