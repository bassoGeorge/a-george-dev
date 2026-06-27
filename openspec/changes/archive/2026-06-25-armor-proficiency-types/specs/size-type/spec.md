## ADDED Requirements

### Requirement: Size union type exists
The package SHALL export a `Size` type as a string union covering all six D&D 5e creature sizes: `'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan'`.

#### Scenario: Valid size compiles
- **WHEN** a character data file sets `size: 'Medium'`
- **THEN** TypeScript accepts it without error

#### Scenario: Invalid string is rejected
- **WHEN** a character data file sets `size: 'Enormous'`
- **THEN** TypeScript reports a type error

### Requirement: Character.size uses the Size type
The `Character` interface SHALL declare `size?: Size` instead of `size?: string`.

#### Scenario: Optional field accepts undefined
- **WHEN** a character data object omits the `size` field
- **THEN** TypeScript accepts it without error
