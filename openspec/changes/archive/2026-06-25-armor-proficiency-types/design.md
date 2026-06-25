## Context

The `dnd-character-sheet` package uses `string` for several fields where D&D 5e defines a closed set of valid values. Specifically: armor proficiency categories (4 values), creature size (6 values), and damage types (13 values). The UI in `EquipmentTraining.tsx` already hardcodes the armor strings as magic literals for `.includes()` checks — the model and UI are implicitly coupled with no compile-time enforcement.

Existing pattern: `Ability` and `Skill` in `models/abilities.ts` and `models/skills.ts` use `as const` objects where the value is the display string, plus a derived type alias. This is the pattern to follow.

## Goals / Non-Goals

**Goals:**
- Add `ArmorProficiency` constant + type (value = display label, same as `Skill`)
- Add `Size` simple union type
- Add `DamageType` simple union type
- Update `Character` and `AttackDamage` interfaces to use the new types
- Update all character data files to use new types (fixing the `'Necroic'` typo in the process)
- Export new types from the package index

**Non-Goals:**
- Typing `weaponProficiencies`, `toolProficiencies`, or `languages` — these are freeform display text
- Adding `ALL_SIZES` or `ALL_DAMAGE_TYPES` arrays unless a rendering component needs them
- Changing any UI rendering logic beyond replacing magic strings with constants

## Decisions

**`ArmorProficiency` uses the `Skill` pattern (object + derived type), not a plain union**
Rationale: `EquipmentTraining.tsx` iterates over armor types to render checkboxes. An `ALL_ARMOR_PROFICIENCIES` array (derived from the object's values) enables this iteration without duplicating the list. A plain union can't be iterated at runtime.

**`Size` and `DamageType` use plain union types (like `SpellSchool`)**
Rationale: Neither is used as a record key or iterated over in the current UI. A plain union gives type safety with minimal ceremony. If iteration is needed later, it's a non-breaking upgrade to the object pattern.

**`EquipmentTraining.tsx` keeps its local `ARMOR_TYPES` mapping**
Rationale: The component needs short display labels (`'Light'` vs `'Light Armor'`). The model constant carries the full canonical name. The component maps canonical → short label; it just replaces string literals with `ArmorProficiency.X` references.

**Values follow title case to match existing `Skill` pattern**
e.g. `ArmorProficiency.LightArmor = 'Light Armor'` (not `'Light armor'` as in current data). Existing data strings updated at migration time.

## Risks / Trade-offs

- **Existing data uses `'Light armor'` (lowercase 'a')** → must update all character data files when changing the canonical values. Low risk — only 3 character files exist.
- **`'Necroic'` typo in `example-wizard.data.ts`** → fixed as part of this change; no user-facing impact since it's example/test data.
- **`DamageType` union doesn't cover homebrew damage types** → acceptable; anyone adding homebrew can cast with `as DamageType` or extend the union. The closed set covers all official content.

## Migration Plan

1. Add new type files (`armor-proficiency.ts`, `size.ts`, `damage-type.ts`) in `models/`
2. Update `Character` interface fields
3. Update `AttackDamage.type` field
4. Update `EquipmentTraining.tsx` magic strings → constants
5. Update all character data files (`example-wizard.data.ts`, `omarin-kenate.tsx`, `zoynari.tsx`)
6. Update `models/index.ts` and `src/index.ts` exports
7. Run TypeScript compiler — any remaining `string` assignments to typed fields will surface as errors

No rollback complexity — purely additive type changes with data string updates.

## Open Questions

_(none)_
