## 1. Class color mapping

- [x] 1.1 Add `packages/dnd-character-sheet/src/icons/class-colors.ts` exporting `CLASS_COLORS: Record<CharacterClass, string>` per the token table in design.md
- [x] 1.2 Export `CLASS_COLORS` from `packages/dnd-character-sheet/src/icons/index.ts` and `packages/dnd-character-sheet/src/index.ts`
- [x] 1.3 Add `class-colors.test.ts` asserting every `CharacterClass` resolves to a defined `CLASS_COLORS` string

## 2. Primary-class resolution

- [x] 2.1 Add a `primaryClass` computation to `packages/dnd-character-sheet/src/lib/character-brief.ts`: highest-level entry in `character.classes`, ties broken by first-declared order
- [x] 2.2 Add `primaryClass: CharacterClass` to `getCharacterBrief`'s return shape
- [x] 2.3 Extend `character-brief.test.ts` (or equivalent) with cases: single class, multiclass with differing levels (e.g. Monk 2 / Fighter 3), multiclass with tied levels

## 3. Roster card background watermark

- [x] 3.1 Add `primaryClass: CharacterClass` to `CharacterRosterCardProps` in `apps/game-tools/src/components/dnd/CharacterRosterCard.tsx`
- [x] 3.2 Add `relative isolate` to the card's content wrapper (the `className` passed into `TiltCard`)
- [x] 3.3 Render the primary class's `CLASS_ICONS` component as an oversized, low-opacity, `absolute -z-10` element colored via `CLASS_COLORS[primaryClass]`, positioned to bleed off the right-hand edge
- [x] 3.4 Pass `primaryClass={c.brief.primaryClass}` from `apps/game-tools/src/routes/_public/dnd/characters/index.tsx` into `CharacterRosterCard`
- [x] 3.5 Add/extend `CharacterRosterCard.test.tsx` covering: watermark renders the correct class icon, text content still renders, badges remain text-only/unchanged

## 4. Verification

- [x] 4.1 Run `yarn turbo test --filter=@ageorgedev/dnd-character-sheet --filter=@ageorgedev/game-tools`
- [x] 4.2 Run `yarn format-and-lint:fix`
- [x] 4.3 Visually verify in the browser (`yarn turbo dev --filter=@ageorgedev/game-tools`, `/dnd/characters`): watermark bleeds off the card edge, is clipped to card bounds, doesn't overlap neighboring cards or obscure text, for both a single-class and the Omarin Kenate multiclass character, in light and dark theme
