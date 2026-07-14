## ADDED Requirements

### Requirement: Feature effects can modify raw character data

A `Feature` SHALL expose an optional `effects: Effect[]` field. Each `Effect` is a discriminated union with two kinds: `character` (mutates the raw `Character` before derived stats are computed) and `derived` (postprocesses `DerivedStats`, with read access to the effective `Character`).

```ts
type Effect =
  | { kind: 'character'; mod: (c: Character) => Character }
  | { kind: 'derived';   mod: (args: { character: Character; stats: DerivedStats }) => DerivedStats };
```

#### Scenario: Character-effect mutates speed
- **WHEN** a feature declares `effects: [addSpeed(5)]` and the base character speed is 30
- **THEN** `useCharacter().character.speed` returns 35

#### Scenario: Character-effect grants a skill proficiency
- **WHEN** a feature declares `effects: [grantSkillProficiency(Skill.Perception)]` and the base character does not have Perception as a proficiency
- **THEN** `useCharacter().character.skillProficiencies` includes Perception
- **THEN** `useCharacter().derived.skills.Perception.quality` is `'proficient'`
- **THEN** `useCharacter().derived.skills.Perception.modifier` includes the proficiency bonus

#### Scenario: Character-effect bumps an ability score
- **WHEN** a feature declares `effects: [bumpAbility(Ability.Charisma, 1)]` and the base Charisma score is 16
- **THEN** `useCharacter().character.abilities.CHA` returns 17
- **THEN** derived stats (`abilityModifiers.CHA`, `abilitySaveDCs.CHA`, ability-based resource counts, spell save DC when CHA is the casting ability) all reflect the bumped score

#### Scenario: Derived-effect reads effective character
- **WHEN** a character has a character-effect that bumps speed by 5 and a derived-effect whose `mod` reads `args.character.speed`
- **THEN** the derived-effect's `args.character.speed` reflects the post-mutation speed, not the raw authored value

### Requirement: Effect helpers throw on invariant violations

Character-effect helpers that grant list membership SHALL throw at pipeline execution time when the invariant they enforce is violated.

#### Scenario: Duplicate skill proficiency grant
- **WHEN** a character's effects grant the same `Skill` proficiency twice (either from two different features or from a feature granting a proficiency the base character already has)
- **THEN** `calculateStats` (or the effects pipeline) throws an error naming the duplicated skill

#### Scenario: Expertise without proficiency
- **WHEN** a character's effects grant expertise in a `Skill` that the character is not proficient in *after* all character-effects have been applied
- **THEN** the pipeline throws an error naming the skill and its proficiency state

### Requirement: Effects pipeline gathers from all feature lists

The effects pipeline SHALL gather effects from `character.features`, `character.speciesTraits`, and `character.feats` in that order, and apply character-effects before computing derived stats.

#### Scenario: Species-trait effect and feat effect both apply
- **WHEN** a species trait declares `effects: [addSpeed(5)]` and a feat declares `effects: [bumpAbility(Ability.Dexterity, 1)]`
- **THEN** both effects are applied to the effective character before derived stats are computed

## MODIFIED Requirements

### Requirement: Resources component renders class feature resource pools

The package SHALL include a `Resources` component that reads resource metadata from a character's features (via a `resource` field on `Feature`) and renders each resource as a checkable pool with a label and count. Resource counts computed from character data (e.g. `kind: 'ability'`, `kind: 'class-level'`) SHALL be computed against the *effective* character (post-effects), so ability-score bumps and similar mutations propagate to resource counts.

#### Scenario: Character with resource features
- **WHEN** a character has features with `resource` metadata
- **THEN** the `Resources` component renders one entry per resource showing its name and available uses as checkboxes
- **THEN** the component is visible on the rendered character sheet

#### Scenario: Character with no resource features
- **WHEN** a character has no features that declare a `resource`
- **THEN** the `Resources` component renders nothing (returns null)

#### Scenario: Ability-based resource reflects effect-bumped ability
- **WHEN** a character has a feat that bumps Charisma by 1 and a feature whose resource count is `{ kind: 'ability', ability: CHA }`
- **THEN** the resource count reflects the post-bump Charisma score

## REMOVED Requirements

### Requirement: Feature.statMod supports three variants for stat modification

**Reason**: Collapsed into the new two-kind `Effect` union. The `static-skill-additions` variant is replaced by `addSkillBonus(skill, amount)` (a derived-effect helper). The `skill-function` variant is removed entirely — it had zero call sites and the case it was designed for (Bard's Jack of all trades) already used `generic-derived`. The `generic-derived` variant becomes `derivedEffect(fn)`, with the closure now receiving `{ character, stats }` instead of just `stats`.

**Migration**:
- `statMod: { kind: 'static-skill-additions', mods: [{ skill, modifier }, ...] }` → `effects: [addSkillBonus(skill, modifier), ...]`
- `statMod: { kind: 'skill-function', mod }` → rewrite as `effects: [derivedEffect(({ stats }) => ...)]`, iterating `stats.skills` directly and using `stats.skills[skill].quality` in place of the `isProficient`/`hasExpertise` args.
- `statMod: { kind: 'generic-derived', mod }` → `effects: [derivedEffect(({ stats }) => mod(stats))]`. Update to also destructure `character` if needed.
