## 1. Creature data model

- [ ] 1.1 Add the public `Creature`, `CreatureEntry`, and `CreatureDetail` model types with only `Creature.name` required and with reusable `Ability`, `Skill`, and `Size` types.
- [ ] 1.2 Add the optional ordered `creatures` collection to `Character` and export the creature types from the package entry point.
- [ ] 1.3 Add type-focused coverage demonstrating a name-only creature, partial ability data, flexible display notation, and uncommon generic detail rows.

## 2. Creature stat-block presentation

- [ ] 2.1 Build the compact creature header and combat-summary presentation, omitting labels and layout space for absent optional fields.
- [ ] 2.2 Build the partial ability grid and secondary-stat rows for saving throws, skills, senses, languages, challenge information, and generic details.
- [ ] 2.3 Build shared named-description rendering for traits, actions, bonus actions, and reactions, including rich-text descriptions and conditional section headings.
- [ ] 2.4 Compose the creature stat-block component and add unit tests for minimal data, fully populated data, omitted categories, flexible notation, and authored ordering.

## 3. Sheet and print integration

- [ ] 3.1 Add a responsive creature-sheet page that flows multiple compact stat blocks in authored order.
- [ ] 3.2 Conditionally append the creature page to `StandardCharacterSheet` only when associated creatures are present.
- [ ] 3.3 Add print layout rules that place creature content after existing pages, avoid splitting normally sized blocks, and allow oversized content to continue without clipping.
- [ ] 3.4 Add integration tests proving no-creature sheets remain unchanged and creature sheets render the conditional content without involving character effects, derived stats, resources, or text enrichment.

## 4. Example data and verification

- [ ] 4.1 Adapt the official 2024 SRD 5.2.1 Black Bear into the package example character data and relevant test fixtures without changing an existing game-tools character.
- [ ] 4.2 Run the dnd-character-sheet unit tests and package build, then resolve any regressions.
- [ ] 4.3 Visually verify the example with narrow and wide screen layouts and with browser print preview, checking conditional pages, card flow, page breaks, overflow, and clipping.
- [ ] 4.4 Run the repository formatter and linter for the completed change and resolve issues in affected files.
