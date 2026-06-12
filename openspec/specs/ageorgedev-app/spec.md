## Requirements

### Requirement: ageorgedev has no dependency on dnd-character-sheet
The `apps/ageorgedev` package.json SHALL NOT include `@ageorgedev/dnd-character-sheet` as a dependency.

#### Scenario: Dependency is absent
- **WHEN** `apps/ageorgedev/package.json` is inspected
- **THEN** `@ageorgedev/dnd-character-sheet` does not appear in `dependencies` or `devDependencies`

### Requirement: ageorgedev styles.css does not source dnd-character-sheet
The `apps/ageorgedev/src/styles.css` file SHALL NOT contain an `@source` directive pointing to `packages/dnd-character-sheet/src`.

#### Scenario: @source entry is absent
- **WHEN** `apps/ageorgedev/src/styles.css` is read
- **THEN** there is no line matching `@source "../../../packages/dnd-character-sheet/src"`
