## Context

`scale-resources-by-level` introduced the current resource pipeline: `computeResources(character, stats)` produces `ComputedResource[]`, the Resources panel renders it, and the EJS layer exposes it as `resources` keyed by `id`. `Refresh` today covers rest-based recovery only (`short-rest | long-rest | any-rest | short-and-long-rest`).

Features like Sneak Attack and Martial Arts share computation semantics with tracked resources (class-level counts, die progressions, EJS lookup by id) but not the tracking model — they refresh every turn, so there's nothing meaningful to render as a counter row.

## Goals / Non-Goals

**Goals:**
- Express per-turn features with the same shape and computation as tracked resources.
- Author descriptions that read the computed values via EJS (no more hardcoded `"2d6"`).
- Zero behavior change for existing tracked resources.

**Non-Goals:**
- A "notation" helper that concatenates count and die — semantics differ between "roll N dice together" (Sneak Attack `2d6`) and "N separate uses of one die" (Bardic Inspiration).
- A separate `Feature.perTurn` field or a `tracked: boolean` flag — those were considered and rejected below.
- Modeling Reckless-Attack-inside-Rage, Divine Smite, or other per-turn features not owned by any current character. Add them when a character needs them.

## Decisions

### Extend `Refresh` with `{ kind: 'per-turn' }` rather than adding a separate field
`Refresh` becomes:
```ts
type Refresh =
  | { kind: 'short-rest' | 'long-rest' | 'any-rest' | 'per-turn' }
  | { kind: 'short-and-long-rest'; numberOfRefreshesOnShortRest: number };
```
- **Why**: The concept *is* a refresh policy — every turn, everything refreshes. Reusing the discriminant means `ComputedResource.refresh` stays the single field the panel branches on. No new field on `Feature.resource`, no `tracked?` flag, no absence-of-refresh convention.
- **Alternative considered**: separate `Feature.scaledValue` field. Rejected — duplicates almost the entire resource shape and forks the compute pipeline.
- **Alternative considered**: optional `refresh` with absence meaning "hidden." Rejected — implicit signals are worse than an explicit union kind for grep and type-narrowing.

### Panel filters by `refresh.kind === 'per-turn'`; compute pass is unchanged
`computeResources` returns per-turn resources in its `ComputedResource[]` just like any other. `Resources.tsx` skips rows where `refresh.kind === 'per-turn'`.
- **Why**: EJS locals depend on `resources` being complete. Filtering at the panel keeps the compute pass a pure data function; render decides what to render.
- **Alternative considered**: two outputs from `computeResources` (`{ tracked, all }`). Rejected — the panel is the only consumer that cares about the split; a two-shape return leaks a display concern back into compute.

### No `.notation` convenience field
Authors write two interpolations: `<%= resources.sneakAttack.count %><%= resources.sneakAttack.die %>` → `2d6`.
- **Why**: `count + die` means different things across resources. Sneak Attack rolls `2d6` together; Bardic Inspiration has 5 separate d8s. A single formatted string would encode a convention that only applies sometimes.
- **Alternative considered**: `.notation` only when `refresh.kind === 'per-turn'`. Rejected — adds a rule authors must remember, saves one interpolation.

### Example migrations exercise both count-progression and die-progression
- Claw's Sneak Attack: `count: class-level-steps` (Rogue 1/3/5/…/19 → 1/2/3/…/10), `die: { kind: 'fixed', value: 'd6' }`.
- Omarin's Martial Arts: no count (or `count: { kind: 'fixed', value: 1 }` if the type requires one), `die: { kind: 'class-level-steps', class: 'Monk', steps: { 1: 'd6', 5: 'd8', 11: 'd10', 17: 'd12' } }`.
- **Why**: These are the two shapes a per-turn resource can take. Migrating one of each proves the model without touching characters that don't benefit yet.

## Risks / Trade-offs

- **Count semantics for die-only resources (Martial Arts)** → Mitigation: confirm during implementation whether `ResourceCount` supports "die-only" cleanly. If not, use `{ kind: 'fixed', value: 1 }` for the count and let the description ignore it. Add a test.
- **`per-turn` kind computed for characters that never see it in the panel is invisible in the UI** → Mitigation: unit test that a per-turn resource is present in the EJS `resources` lookup and absent from the panel row set; visual check on Claw's rendered sheet.
- **EJS references drift silently if an id is renamed** → Same risk as existing tracked resources; mitigated by explicit `id` requirement from prior change. Grep protects renames.
- **Author confusion: "why doesn't this resource show up?"** → Mitigation: pattern is documented on the model and in the two example characters. Comment in `Refresh` union explains that `per-turn` intentionally hides from the panel.

## Migration Plan

1. Add `per-turn` to the `Refresh` union in `packages/dnd-character-sheet/src/lib/models/feature.ts`.
2. Update the panel filter in `components/Resources/Resources.tsx`.
3. Add unit tests: (a) `computeResources` returns per-turn resources; (b) panel does not render them; (c) EJS `resources` locals include them.
4. Migrate Claw's Sneak Attack (data + description).
5. Migrate Omarin's Martial Arts (data + description).
6. Manual pass on `apps/game-tools`: verify Claw and Omarin sheets render the correct scaled values in descriptions.

Rollback is trivial — revert the union extension and the two data files. No consumers outside this package or these two characters.

## Open Questions

- Does `ResourceCount` need a variant that means "no count, just a die" for Martial Arts, or is `{ kind: 'fixed', value: 1 }` acceptable? Resolve during implementation by reading the current `ResourceCount` model — if `count` is required and `1` renders sensibly in EJS (unused by the description), take the fixed-1 route.
