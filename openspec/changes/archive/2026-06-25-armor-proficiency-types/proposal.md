## Why

Several fields on the `Character` interface and `AttackDamage` type use `string` where the valid values are actually a closed, well-known D&D 5e set. This lets typos (e.g. `'Necroic'`) and invalid values slip through silently, and forces the UI layer to hardcode the same magic strings the model already knows about.

## What Changes

- **New `ArmorProficiency` constant** — follows the `Skill` pattern (value = display label) covering Light Armor, Medium Armor, Heavy Armor, Shields; `armorProficiencies: string[]` becomes `armorProficiencies: ArmorProficiency[]` on `Character`
- **New `Size` union type** — simple string union (Tiny | Small | Medium | Large | Huge | Gargantuan); `size?: string` becomes `size?: Size` on `Character`
- **New `DamageType` union type** — all 13 D&D 5e damage types; `AttackDamage.type: string` becomes `AttackDamage.type: DamageType`
- **`EquipmentTraining.tsx` updated** — `ARMOR_TYPES` keys replaced with `ArmorProficiency` constant values, removing the parallel string duplication
- **All existing character data updated** — `exampleWizard`, `omarin-kenate`, and `zoynari` updated to use the new constants/types (including fixing the `'Necroic'` typo to `'Necrotic'`)
- `weaponProficiencies`, `toolProficiencies`, and `languages` remain `string[]` — these are freeform display text with no structural role

## Capabilities

### New Capabilities

- `armor-proficiency-type`: Typed constant for armor proficiency values, mirroring the `Skill`/`Ability` pattern
- `size-type`: Union type for creature size
- `damage-type`: Union type for attack damage types

### Modified Capabilities

_(none — no existing spec files)_

## Impact

- `packages/dnd-character-sheet` — new types in `models/`, updated `Character` and `AttackDamage` interfaces, updated `EquipmentTraining.tsx`
- `apps/game-tools` — character data files updated to use new constants/types
- `packages/dnd-character-sheet/src/index.ts` — new exports for `ArmorProficiency`, `DamageType`, `Size`
- No runtime behavior changes; purely type-level and data hygiene
