## Purpose

A typed `ArmorProficiency` union, with an iterable value list, replacing raw strings for character armor proficiencies.

## Requirements

### Requirement: ArmorProficiency constant and type exist
The package SHALL export an `ArmorProficiency` `as const` object and a derived `ArmorProficiency` type, following the same pattern as `Skill` in `models/skills.ts`. The object SHALL have four entries: `LightArmor`, `MediumArmor`, `HeavyArmor`, and `Shield`, with title-case display labels as values.

#### Scenario: All four armor categories are defined
- **WHEN** a developer references `ArmorProficiency`
- **THEN** `ArmorProficiency.LightArmor`, `ArmorProficiency.MediumArmor`, `ArmorProficiency.HeavyArmor`, and `ArmorProficiency.Shield` are all available as typed constants

#### Scenario: Derived type covers all values
- **WHEN** a variable is typed as `ArmorProficiency`
- **THEN** assigning any of the four constant values is valid and assigning an arbitrary string is a TypeScript error

### Requirement: ALL_ARMOR_PROFICIENCIES array is exported
The package SHALL export an `ALL_ARMOR_PROFICIENCIES: ArmorProficiency[]` array containing all four values, enabling runtime iteration.

#### Scenario: Array contains all four values
- **WHEN** code iterates over `ALL_ARMOR_PROFICIENCIES`
- **THEN** it yields exactly `LightArmor`, `MediumArmor`, `HeavyArmor`, `Shield` values (in that order)

### Requirement: Character.armorProficiencies uses the ArmorProficiency type
The `Character` interface SHALL declare `armorProficiencies: ArmorProficiency[]` instead of `string[]`.

#### Scenario: Valid armor proficiency compiles
- **WHEN** a character data file sets `armorProficiencies: [ArmorProficiency.LightArmor]`
- **THEN** TypeScript accepts it without error

#### Scenario: Invalid string is rejected
- **WHEN** a character data file sets `armorProficiencies: ['light armor']`
- **THEN** TypeScript reports a type error

### Requirement: EquipmentTraining component uses ArmorProficiency constants
The `EquipmentTraining.tsx` component SHALL reference `ArmorProficiency` constant values instead of raw string literals for its armor type keys.

#### Scenario: No magic strings remain in ARMOR_TYPES
- **WHEN** the `ARMOR_TYPES` array is defined in `EquipmentTraining.tsx`
- **THEN** each `key` field references an `ArmorProficiency` constant, not a hardcoded string
