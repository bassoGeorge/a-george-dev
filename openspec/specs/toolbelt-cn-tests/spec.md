## Purpose

Vitest coverage for the `cn` class-name utility in packages/toolbelt — merging, conditionals, Tailwind conflict resolution, and clsx-style inputs.

## Requirements

### Requirement: cn merges multiple class strings
`cn()` SHALL accept multiple string arguments and return them joined as a single class string.

#### Scenario: merges two class strings
- **WHEN** `cn('foo', 'bar')` is called
- **THEN** the result is `"foo bar"`

#### Scenario: handles a single class
- **WHEN** `cn('only')` is called
- **THEN** the result is `"only"`

### Requirement: cn handles conditional classes
`cn()` SHALL accept falsy values (false, undefined, null) and omit them from the output.

#### Scenario: omits false condition
- **WHEN** `cn('base', false && 'conditional')` is called
- **THEN** the result is `"base"` with no extra tokens

#### Scenario: includes truthy condition
- **WHEN** `cn('base', true && 'active')` is called
- **THEN** the result is `"base active"`

### Requirement: cn resolves Tailwind class conflicts
`cn()` SHALL use tailwind-merge semantics to resolve conflicting Tailwind utility classes, keeping the last one.

#### Scenario: padding conflict resolved
- **WHEN** `cn('p-4', 'p-8')` is called
- **THEN** the result is `"p-8"` (last wins)

#### Scenario: text colour conflict resolved
- **WHEN** `cn('text-red-500', 'text-blue-500')` is called
- **THEN** the result is `"text-blue-500"`

### Requirement: cn accepts object and array inputs
`cn()` SHALL accept clsx-compatible object and array inputs in addition to strings.

#### Scenario: object syntax
- **WHEN** `cn({ active: true, disabled: false })` is called
- **THEN** the result is `"active"`

#### Scenario: array syntax
- **WHEN** `cn(['foo', 'bar'])` is called
- **THEN** the result is `"foo bar"`
