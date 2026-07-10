## 1. Phase 1 — Refactor (no behavior change)

- [ ] 1.1 Create `packages/dnd-character-sheet/src/lib/calculate-resources.ts` exporting `computeResources(character, stats): ComputedResource[]` and the `ComputedResource` type. Move `pullAllResourcesFromFeatures` and `resourceDigester` logic out of `Resources.tsx`. Return raw `refresh` (no formatting); leave `id` derivable from `name` for now (it becomes a real field in Phase 2).
- [ ] 1.2 Update `packages/dnd-character-sheet/src/components/CharacterSheet.tsx` to compute resources via `useMemo` after stats and add them to the context value: `{ character, derived, resources }`. Update the `CharacterContextValue` type.
- [ ] 1.3 Update `packages/dnd-character-sheet/src/components/Resources/Resources.tsx` to read `resources` from `useCharacter()` and remove its internal `pullAllResourcesFromFeatures` and `resourceDigester`. Keep `getRefreshText` locally and call it at render time on the raw `refresh` descriptor.
- [ ] 1.4 Add `packages/dnd-character-sheet/src/lib/calculate-resources.test.ts` covering the existing branches (`fixed`, `character-level`, `class-level` with and without multiplier, `ability` with min and multiplier, class-not-found warns and filters, aggregation across `features`/`speciesTraits`/`feats`).
- [ ] 1.5 Verify Phase 1: `yarn turbo test --filter=@ageorgedev/dnd-character-sheet` passes and `yarn turbo dev --filter=@ageorgedev/game-tools` renders the example wizard character with the Resources panel unchanged from before.

## 2. Phase 2 — Model changes

- [ ] 2.1 In `packages/dnd-character-sheet/src/lib/models/feature.ts`, add required `id: string` to `resource`. Add `class-level-steps` variant to `ResourceCount` with shape `{ kind: 'class-level-steps'; class: string; steps: Record<number, number>; display?: 'dots' | 'numeric' }`. Add optional `die` field on `resource` with type `{ kind: 'fixed'; value: string } | { kind: 'class-level-steps'; class: string; steps: Record<number, string> }`.
- [ ] 2.2 Update `packages/dnd-character-sheet/src/characters/example-wizard.data.ts` (and any other character data files that declare a resource) to add the new `id` field (e.g., `id: 'sorceryPoints'`). Fix any TypeScript errors that surface.

## 3. Phase 2 — Compute logic

- [ ] 3.1 In `calculate-resources.ts`, add a private helper `resolveSteps<T>(steps: Record<number, T>, level: number): T | null` that sorts numeric keys ascending and returns the value at the highest key ≤ level, or `null` if level is below the lowest key.
- [ ] 3.2 Extend the count switch in `resourceDigester` with a `class-level-steps` case that looks up the character's class, applies `resolveSteps`, and on `null` result emits `console.warn` and returns `null` to filter the resource out (mirroring the existing class-not-found branch).
- [ ] 3.3 Add die resolution: after count is resolved, if `resource.die` is present, compute `die: string`. For `fixed` return the value directly; for `class-level-steps` apply `resolveSteps` and, on `null`, warn and filter the resource out.
- [ ] 3.4 Change `ComputedResource.id` to come from `resource.id` directly (no more name-derived slug).
- [ ] 3.5 Extend `calculate-resources.test.ts` with cases: exact key, between keys, above highest, below lowest (warn + filter), out-of-order keys, class-not-on-character (warn + filter), fixed die, class-level-steps die progression, unresolvable die (warn + filter), missing die (undefined on ComputedResource).

## 4. Phase 2 — EJS locals

- [ ] 4.1 In `packages/dnd-character-sheet/src/lib/text-enrichment.ts`, widen `enrichCharacterData(character, stats, resources)` and pass `resources` as a keyed lookup (`Object.fromEntries(resources.map(r => [r.id, r]))`) into the EJS render context alongside the existing spread of stats.
- [ ] 4.2 Update `CharacterSheet.tsx` to pass the computed resources array into `enrichCharacterData`.
- [ ] 4.3 Add tests in `text-enrichment.test.ts` covering: description references `resources.<id>.count`, description references `resources.<id>.die`, missing id renders empty, existing DerivedStats locals still resolve alongside resources.

## 5. Phase 2 — Panel rendering and end-to-end example

- [ ] 5.1 Update `Resources.tsx` to render the resource name as `` `${name} (${die})` `` when `die` is present; leave the count/checkmarks and refresh columns unchanged.
- [ ] 5.2 Add or extend an example character (e.g., a Battle Master and/or a Bard) in `packages/dnd-character-sheet/src/characters/` that exercises both `class-level-steps` count and `class-level-steps` die, with at least one description using `<%= resources.<id>.die %>` or `<%= resources.<id>.count %>` inline.
- [ ] 5.3 Register the new example in `apps/game-tools/src/routes/_public/dnd/characters/` following the existing `staticData: { character: { name, level, description } }` pattern.
- [ ] 5.4 Run `yarn format-and-lint:fix`, then `yarn turbo test --filter=@ageorgedev/dnd-character-sheet` and view the new character in `yarn turbo dev --filter=@ageorgedev/game-tools` to confirm step counts, die suffix in the panel, and EJS-interpolated description all render correctly.
