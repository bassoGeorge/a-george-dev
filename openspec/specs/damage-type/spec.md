## ADDED Requirements

### Requirement: DamageType union type exists
The package SHALL export a `DamageType` type as a string union covering all 13 D&D 5e damage types: `'Acid' | 'Bludgeoning' | 'Cold' | 'Fire' | 'Force' | 'Lightning' | 'Necrotic' | 'Piercing' | 'Poison' | 'Psychic' | 'Radiant' | 'Slashing' | 'Thunder'`.

#### Scenario: Valid damage type compiles
- **WHEN** an attack damage entry sets `type: 'Fire'`
- **THEN** TypeScript accepts it without error

#### Scenario: Invalid string is rejected
- **WHEN** an attack damage entry sets `type: 'Necroic'`
- **THEN** TypeScript reports a type error

### Requirement: AttackDamage.type uses the DamageType type
The `AttackDamage` interface SHALL declare `type: DamageType` instead of `type: string`.

#### Scenario: All standard damage types are assignable
- **WHEN** any of the 13 canonical damage type strings is assigned to `AttackDamage.type`
- **THEN** TypeScript accepts it without error

### Requirement: Existing character data uses correct DamageType values
All character data files SHALL use valid `DamageType` values, with any pre-existing typos corrected.

#### Scenario: Typo in example data is fixed
- **WHEN** the example wizard character data is compiled
- **THEN** the previously incorrect `'Necroic'` value is replaced with `'Necrotic'` and compiles without error
