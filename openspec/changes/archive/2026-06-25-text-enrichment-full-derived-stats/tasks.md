## 1. Update DerivedStats model

- [x] 1.1 Remove `characterLevel: number` from `DerivedStats` interface in `derived-stats.ts`
- [x] 1.2 Add `level: { total: number } & Record<string, number>` to `DerivedStats` interface

## 2. Update calculateStats

- [x] 2.1 Build the `level` object in `calculateStats` from `character.classes` (total + per-class map)
- [x] 2.2 Remove the local `characterLevel` variable (or keep as intermediate only) and include `level` in the return value
- [x] 2.3 Remove `characterLevel` from the `calculateStats` return object

## 3. Update text-enrichment

- [x] 3.1 Remove the `dataValues` object construction (the hand-built `level` object)
- [x] 3.2 Update the `enricher` to spread full `DerivedStats` flat: `ejs.render(str, { ...stats })`

## 4. Fix Resources.tsx

- [x] 4.1 Replace `stats.characterLevel` with `stats.level.total` in `Resources.tsx`

## 5. Verify

- [x] 5.1 Run `yarn turbo test --filter=@ageorgedev/dnd-character-sheet` — all tests pass
- [x] 5.2 Run `yarn format-and-lint:fix` — no lint errors
- [x] 5.3 Type-check passes (`yarn turbo build --filter=@ageorgedev/dnd-character-sheet`)
