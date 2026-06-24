import {
  Ability,
  type Character,
  CharacterClass,
  Skill,
  StandardCharacterSheet,
} from '@ageorgedev/dnd-character-sheet';
import { createFileRoute } from '@tanstack/react-router';

const ZoynariData: Character = {
  name: 'Zoynari',
  species: 'Kalashtar',
  background: 'Hermit',
  classes: [
    {
      name: CharacterClass.Cleric,
      subclass: 'Light Domain',
      level: 3,
    },
  ],
  abilities: {
    [Ability.Strength]: 14,
    [Ability.Dexterity]: 8,
    [Ability.Constitution]: 14,
    [Ability.Intelligence]: 10,
    [Ability.Wisdom]: 16,
    [Ability.Charisma]: 13,
  },
  savingThrowProficiencies: [Ability.Wisdom, Ability.Charisma],
  skillProficiencies: [
    Skill.Arcana,
    Skill.Religion,
    Skill.Insight,
    Skill.Medicine,
    Skill.Persuasion,
  ],
  skillExpertise: [],
  armorClass: 14,
  speed: 30,
  hitPoints: {
    maximum: 28,
  },
  attacks: [
    {
      name: 'Mace',
      kind: 'weapon',
      ability: Ability.Strength,
      damage: [
        {
          dice: '1d6',
          type: 'Bludgeoning',
        },
      ],
    },
    {
      name: 'Sacred Flame',
      kind: 'spell-with-save',
      saveAbility: Ability.Dexterity,
      damage: [
        {
          dice: '1d6',
          type: 'Radiant',
        },
      ],
    },
    {
      name: 'Toll the Dead',
      kind: 'spell-with-save',
      saveAbility: Ability.Wisdom,
      damage: [
        {
          dice: '1d8',
          type: 'Necrotic',
        },
      ],
      notes: 'If target is missing any HP, use 1d12 instead',
    },
  ],
  equipment: [],
  features: [
    {
      name: 'Divine Order: Thaumaturge',
      description:
        '<ol><li>You gain 1 additional cantrip</li><li>Bonus +3 to Arcana & Religion checks (already considered in this sheet)</li></ol>',
      skillMod: {
        kind: 'static-additions',
        mods: [
          { skill: Skill.Arcana, modifier: 3 },
          { skill: Skill.Religion, modifier: 3 },
        ],
      },
    },
    {
      name: 'Channel Divinity',
      description:
        'You can channel divine energy directly from the Outer Planes to fuel magical effects.',
      resource: {
        name: 'Channel Divinity',
        count: {
          kind: 'fixed',
          value: 2, // Todo: is based on a class table
        },
        refresh: {
          kind: 'short-and-long-rest',
          numberOfRefreshesOnShortRest: 1,
        },
      },
    },
    {
      name: 'Divine Spark',
      cost: '1 Channel Divinity',
      castingTime: 'Action',
      description:
        '<em>Choose 1 target in 30ft range</em>. Roll 1d8+3. The target either: Regains Hit points equal to roll OR makes a CON save, taking rolled damage of either Necrotic or Radiant on failure, half as much on success.',
    },
    {
      name: 'Turn Undead',
      cost: '1 Channel Divinity',
      castingTime: 'Action',
      description:
        'Each Undead creature of your choice in a 30ft radius makes a Wis. saving throw. On failure, they have Frightened & Incapacitated condition for 1min, and during this time, they try to move away from you each turn. Condition ends early if they take damage, or you get Incapacitated condition, or you die.',
    },
    {
      name: 'Radiance of Dawn',
      cost: '1 Channel Divinity',
      castingTime: 'Action',
      description:
        'Emit light in a 30ft sphere originating at yourself. Dispels any magical darkness. Each creature of your choice in range makes a Con. saving throw, taking 2d10+<%= level.Cleric %> Radiant damage, or half as much on success.',
    },
    {
      name: 'Warding flare',
      castingTime: 'Reaction',
      cost: '1 Warding flare',
      description:
        'When a creature you can see within 30ft of yourself makes an attack roll, you can take a reaction to impose Disadvantage by causing a light to flare.',
      resource: {
        name: 'Warding flare',
        count: {
          kind: 'ability',
          ability: Ability.Wisdom,
        },
        refresh: {
          kind: 'long-rest',
        },
      },
    },
  ],
  speciesTraits: [
    {
      name: 'Dual Mind',
      description: 'Advantage on Wis. & Cha. saving throws.',
    },
    {
      name: 'Mental Discipline',
      description: 'Resistance to Psychic damage.',
    },
    {
      name: 'Mind Link',
      description:
        'You have telepathy within range of <%= level.total * 10 %>ft. When using this trait to speak telepathically to a creature, you can take a Magic action to give that creature the ability to speak telepathically with you for 1hr, or until you take a Magic action to end the effect.',
    },
  ],
  armorProficiencies: ['Light armor', 'Medium armor', 'Shields'],
  weaponProficiencies: ['Simple weapons'],
  toolProficiencies: ['Herbalism Kit'],
  languages: ['Common', 'Quori'],
  spellcasting: {
    ability: Ability.Wisdom,
    spells: [],
    numberOfCantrips: 4,
    numberOfPreparedSpells: 6,
    slots: {
      1: 4,
      2: 2,
    },
  },
};

export const Route = createFileRoute('/_public/dnd/characters/_sheet/zoynari')({
  component: RouteComponent,
  staticData: {
    character: {
      name: ZoynariData.name,
      level: ZoynariData.classes.reduce((acc, { level }) => acc + level, 0),
      description: 'Kalashtar Cleric of the Light',
    },
  },
});

function RouteComponent() {
  return <StandardCharacterSheet data={ZoynariData} />;
}
