## 1. New Type Files

- [x] 1.1 Create `packages/dnd-character-sheet/src/lib/models/armor-proficiency.ts` with `ArmorProficiency` constant, derived type, and `ALL_ARMOR_PROFICIENCIES` array
- [x] 1.2 Create `packages/dnd-character-sheet/src/lib/models/size.ts` with `Size` union type
- [x] 1.3 Create `packages/dnd-character-sheet/src/lib/models/damage-type.ts` with `DamageType` union type

## 2. Update Interfaces

- [x] 2.1 Update `Character` interface in `character.ts`: `armorProficiencies: ArmorProficiency[]` and `size?: Size`
- [x] 2.2 Update `AttackDamage` in `attacks.ts`: `type: DamageType`

## 3. Update Component

- [x] 3.1 Update `EquipmentTraining.tsx`: replace magic string keys in `ARMOR_TYPES` with `ArmorProficiency` constant references

## 4. Update Character Data

- [x] 4.1 Update `example-wizard.data.ts`: use `ArmorProficiency` constants, fix `'Necroic'` → `'Necrotic'`
- [x] 4.2 Update `omarin-kenate.tsx`: use `ArmorProficiency` constants and `Size` type
- [x] 4.3 Update `zoynari.tsx`: use `ArmorProficiency` constants

## 5. Exports

- [x] 5.1 Add `ArmorProficiency`, `ALL_ARMOR_PROFICIENCIES`, `Size`, `DamageType` to `models/index.ts`
- [x] 5.2 Add `ArmorProficiency`, `DamageType`, `Size` to `src/index.ts`

## 6. Verification

- [x] 6.1 Run `yarn turbo build --filter=@ageorgedev/dnd-character-sheet` — must compile with no TypeScript errors
