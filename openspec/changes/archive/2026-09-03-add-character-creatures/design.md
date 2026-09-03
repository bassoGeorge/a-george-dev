## Context

`Character` is the package's authored data model and `StandardCharacterSheet` assembles two `Page` components around a `CharacterSheet` provider that computes character effects, derived statistics, resources, and enriched text. AGE-8 calls for compact monster statistics associated with a character—for example wild shapes, familiars, or artificer constructs—and suggests an extra printable sheet. The supplied reference uses the 2024 monster-stat-block organization.

Creature data varies more than player-character data and is already presentation-ready in published rules. Treating a creature as a reduced `Character` would couple it to irrelevant class, equipment, proficiency, spellcasting, and effect requirements. The new model therefore sits on `Character` for ownership but remains outside the calculation pipeline.

## Goals / Non-Goals

**Goals:**

- Let each versioned character own an ordered collection of associated creatures.
- Keep creature authoring lightweight, with only the name required.
- Represent common 2024 stat-block fields while retaining a simple escape hatch for uncommon detail rows.
- Render compact creature cards responsively and as additional printable pages.
- Exercise the feature with official SRD example data without changing existing game-tools character canon.

**Non-Goals:**

- A global creature compendium, registry, IDs, references, or deduplication.
- Deriving creature modifiers or statistics from rules, proficiency, or character level.
- Applying character effects, resources, or EJS character-text enrichment to creatures.
- Interactive creature state such as current hit points, conditions, expended actions, or transformation selection.
- Structured parsing of monster attacks, spellcasting, recharge mechanics, or legendary actions.

## Decisions

### Embed creatures in each Character version

Add `creatures?: Creature[]` directly to `Character`. Character records are already versioned by level in game-tools, so embedded values naturally allow a wild shape or construct to change with a character version. Authored array order determines display and print order.

Alternatives considered:

- A package-wide creature registry plus IDs would promote reuse but adds lookup failure modes and versioning decisions that AGE-8 does not need.
- Adding creatures to `CharacterPack` would keep the base model smaller but prevent the reusable character-sheet package from owning and rendering the capability.

### Use a separate, mostly optional Creature model

The proposed public model is conceptually:

```ts
interface Character {
  // existing fields
  creatures?: Creature[];
}

interface Creature {
  name: string;
  description?: string;
  size?: Size;
  creatureType?: string;
  alignment?: string;
  armorClass?: number | string;
  initiative?: number;
  speed?: string;
  hitPoints?: {
    maximum: number;
    dice?: string;
  };
  abilities?: Partial<Record<Ability, number>>;
  savingThrows?: Partial<Record<Ability, number>>;
  skills?: Partial<Record<Skill, number>>;
  senses?: string[];
  languages?: string[];
  challengeRating?: string;
  experiencePoints?: number;
  proficiencyBonus?: number;
  details?: CreatureDetail[];
  traits?: CreatureEntry[];
  actions?: CreatureEntry[];
  bonusActions?: CreatureEntry[];
  reactions?: CreatureEntry[];
}

interface CreatureDetail {
  label: string;
  value: string;
}

interface CreatureEntry {
  name: string;
  description: string;
}
```

The implementation may refine property names while preserving this contract. Existing `Ability`, `Skill`, and `Size` types are reused. Hit points mirror the useful authored portion of the character shape. Armor class, speed, and challenge rating accept display notation because monster values commonly include annotations, multiple movement modes, and fractions.

Saving throws and skills contain final displayed modifiers, rather than proficiency flags. Published creature bonuses can include expertise-like or exceptional values and do not need to be reverse-engineered.

Alternatives considered:

- Extending or narrowing `Character` leaves many required player-only fields and risks accidentally invoking character calculations.
- Reusing `Feature` brings effects, resources, character levels, and casting metadata into a display-only model.
- Reusing `Attack` requires player attack abilities and derived modifiers and cannot naturally represent complete monster action prose.
- Making every secondary statistic a named property creates a broad interface that will still miss future or uncommon labels. `details` provides a controlled display escape hatch.

### Use one entry shape for rules sections

Traits, actions, bonus actions, and reactions use the same `{ name, description }` interface. Rich descriptions contain complete attack rolls, damage, triggers, recharge limits, and spellcasting text. Empty categories are omitted.

This favors faithful display and low authoring overhead over machine-readable combat rules. More categories can be added later using the same entry type if a real character requires them.

### Append a conditional creature Page

`StandardCharacterSheet` conditionally appends creature content after its existing pages when `data.creatures` is non-empty. A creature-sheet component lays stat blocks out in a responsive grid, preserving author order. Print CSS should avoid breaking an individual block when it can fit on the next page while permitting naturally long blocks to flow rather than clip.

The creature presentation reads authored data directly instead of adding it to `CharacterContext`; no creature field influences `computeCharacterAndStats`, `computeResources`, or `enrichCharacterData`.

Alternatives considered:

- Placing creatures in generic sections would lose the recognizable stat-block hierarchy and compact ability layout.
- Downloadable creature PDFs would separate data from the character model and require manual asset maintenance.
- One mandatory page per creature wastes paper for small familiars and prevents compact multi-creature collections.

### Use the SRD 5.2.1 Black Bear as package example data

Adapt the official 2024 SRD 5.2.1 Black Bear into the example character and relevant test fixtures. It covers movement modes, all six abilities, a skill, senses, challenge information, and multiple actions while remaining compact. It will not be attached to any real character in `apps/game-tools`, because none currently has a fitting druid or ranger association.

## Risks / Trade-offs

- [Freeform descriptions cannot power automated rolls or calculations] → Keep automation explicitly out of scope and evolve structure only from demonstrated use cases.
- [Flexible string fields trade validation for fidelity] → Restrict flexibility to values with established compound notation and keep straightforward numeric fields numeric.
- [Long stat blocks can paginate awkwardly] → Use break-avoid styling for normally sized cards and allow oversized cards to flow rather than imposing fixed heights.
- [Embedded creatures can duplicate data across character levels] → Accept duplication as consistent with existing versioned character records; introduce references only if repeated maintenance becomes material.
- [Generic detail rows reduce semantic typing] → Reserve them for uncommon labelled values and retain typed properties for frequently rendered statistics.

## Migration Plan

1. Add and export the creature model types, then add the optional `Character.creatures` property.
2. Add stat-block and creature-page components with focused unit tests.
3. Integrate the conditional page into `StandardCharacterSheet` and verify no-creature rendering remains unchanged.
4. Add the SRD Black Bear to package example/test data and visually verify responsive and printed layouts.

The change is backward-compatible because the new character property is optional. Rollback consists of removing the conditional rendering and optional model field; existing character data requires no migration.

## Open Questions

None. Additional monster categories or interactive state should be proposed when a concrete character requires them.
