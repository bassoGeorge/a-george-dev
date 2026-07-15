## Purpose

Vitest coverage for the character-sheet package's presentational components (AttackList, SpellList, AbilityBox, CharacterSheet context).

## Requirements

### Requirement: AttackList renders nothing when no attacks
AttackList SHALL return null and render no DOM when the character has an empty attacks array.

#### Scenario: No attacks
- **WHEN** `AttackList` is rendered with a character whose `attacks` array is empty
- **THEN** nothing is rendered to the DOM

---

### Requirement: AttackList calculates weapon attack bonus correctly
AttackList SHALL display the attack bonus for a `weapon` kind attack as `abilityModifier + proficiencyBonus + attackBonusMod`.

#### Scenario: Proficient weapon attack
- **WHEN** a weapon attack has a known ability modifier, the character is proficient, and `attackBonusMod` is set
- **THEN** the displayed bonus equals `abilityMod + profBonus + attackBonusMod`

#### Scenario: Non-proficient weapon attack
- **WHEN** a weapon attack has `notProficient: true`
- **THEN** proficiency bonus is excluded from the displayed bonus

---

### Requirement: AttackList calculates spell attack bonuses correctly
AttackList SHALL display spell attack bonuses using derived `spellAttackBonus`, or a per-attack ability override when `attack.ability` is set.

#### Scenario: Spell-with-attack using derived spellAttackBonus
- **WHEN** a `spell-with-attack` has no `attack.ability`
- **THEN** the displayed bonus equals `derived.spellAttackBonus`

#### Scenario: Spell-with-save formats DC string
- **WHEN** a `spell-with-save` has a `saveAbility` of DEX and `derived.spellSaveDC` is a known value
- **THEN** the displayed text is `DEX save, DC <value>`

---

### Requirement: AttackList shows mastery column conditionally
AttackList SHALL show a Mastery column only when at least one attack has a `masteryProperty`.

#### Scenario: Mastery column present
- **WHEN** at least one attack has a `masteryProperty`
- **THEN** a "Mastery" column header is rendered

#### Scenario: Mastery column absent
- **WHEN** no attacks have a `masteryProperty`
- **THEN** no "Mastery" column header is rendered

---

### Requirement: AttackList formats damage with modifier correctly
AttackList SHALL append the damage bonus to each damage entry unless `disableModifier` is true.

#### Scenario: Damage with modifier
- **WHEN** a damage entry has `disableModifier: false` and a non-zero modifier
- **THEN** the damage string includes the formatted modifier (e.g. `1d8+3`)

#### Scenario: Damage with disableModifier
- **WHEN** a damage entry has `disableModifier: true`
- **THEN** the modifier is not appended to the damage string

---

### Requirement: SpellList sorts spells by level, then prepared status, then name
SpellList SHALL sort spells ascending by level, with `alwaysPrepared` spells appearing before others at the same level, then alphabetically by name.

#### Scenario: Spells sorted by level
- **WHEN** spells of different levels are provided
- **THEN** lower-level spells appear before higher-level spells in the rendered table

#### Scenario: alwaysPrepared before regular at same level
- **WHEN** two spells share the same level, one `alwaysPrepared` and one not
- **THEN** the `alwaysPrepared` spell row appears first

#### Scenario: Alphabetical within same level and prep status
- **WHEN** two spells share the same level and neither is `alwaysPrepared`
- **THEN** they appear in alphabetical order by name

---

### Requirement: SpellList displays preparation status correctly
SpellList SHALL show "AP" for always-prepared spells, an empty cell for cantrips (level 0), and a circle checkbox for other prepared spells.

#### Scenario: Always prepared spell
- **WHEN** a spell has `alwaysPrepared: true`
- **THEN** the prep cell contains "AP"

#### Scenario: Cantrip (level 0)
- **WHEN** a spell has `level: 0`
- **THEN** the prep cell is empty (no checkbox, no "AP")

---

### Requirement: SpellList normalises casting time display
SpellList SHALL display "Action" for `castingTime: "action"`, "Bonus" for `castingTime: "bonus action"`, and pass other values through unchanged.

#### Scenario: Action casting time
- **WHEN** a spell has `castingTime: "action"` (any case)
- **THEN** the rendered text is "Action"

#### Scenario: Bonus action casting time
- **WHEN** a spell has `castingTime: "bonus action"` (any case)
- **THEN** the rendered text is "Bonus"

---

### Requirement: SpellList shows alternate ability stats
SpellList SHALL display the computed to-hit bonus and save DC for spells with an `alternativeAbility`.

#### Scenario: Alternate ability displayed
- **WHEN** a spell has `alternativeAbility` set
- **THEN** the row contains the ability's short name, to-hit bonus, and DC derived from `abilityMod + proficiencyBonus`

---

### Requirement: AbilityBox displays ability score and modifier
AbilityBox SHALL render the raw ability score and the formatted ability modifier from derived stats.

#### Scenario: Score and modifier rendered
- **WHEN** `AbilityBox` is rendered for an ability with a known score and modifier
- **THEN** both the score value and formatted modifier (e.g. "+3") are present in the DOM

---

### Requirement: AbilityBox shows saving throw proficiency state
AbilityBox SHALL render the saving throw row as checked when the character is proficient, and unchecked otherwise.

#### Scenario: Proficient saving throw
- **WHEN** the character includes the ability in `savingThrowProficiencies`
- **THEN** the saving throw row is rendered in a checked state

#### Scenario: Non-proficient saving throw
- **WHEN** the ability is not in `savingThrowProficiencies`
- **THEN** the saving throw row is rendered unchecked

---

### Requirement: AbilityBox shows skill proficiency and expertise states
AbilityBox SHALL render linked skills with the correct `CheckedState`: unchecked for no proficiency, checked for proficiency, and 'special' for expertise.

#### Scenario: No proficiency
- **WHEN** a skill is not in `skillProficiencies` or `skillExpertise`
- **THEN** its checkbox is unchecked

#### Scenario: Proficiency
- **WHEN** a skill is in `skillProficiencies` but not `skillExpertise`
- **THEN** its checkbox is in the checked state

#### Scenario: Expertise
- **WHEN** a skill is in `skillExpertise`
- **THEN** its checkbox is in the 'special' state

---

### Requirement: AbilityBox suppresses modifier when equal to ability modifier
AbilityBox SHALL render a non-breaking space (not a number) for a skill's modifier column when the skill total equals the raw ability modifier.

#### Scenario: Skill modifier equals ability modifier
- **WHEN** a skill has no proficiency (total = ability modifier)
- **THEN** the modifier column for that skill shows whitespace, not a numeric modifier

---

### Requirement: CharacterSheet provider wires derived stats to consumers
The `CharacterSheet` component SHALL compute and expose derived stats via context so that consuming components receive non-null, correctly typed data.

#### Scenario: Context provides derived stats
- **WHEN** `CharacterSheet` is rendered with a valid `Character` and a child component reads the context via `useCharacter()`
- **THEN** `derived.abilityModifiers`, `derived.proficiencyBonus`, and `derived.skills` are all defined and non-null
