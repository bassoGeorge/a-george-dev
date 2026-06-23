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
      description: 'Divine magic to power your effects',
      resource: {
        name: 'Channel Divinity',
        count: {
          kind: 'fixed',
          value: 2,
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
  ],
  armorProficiencies: ['Light armor', 'Medium armor', 'Shields'],
  weaponProficiencies: ['Simple weapons'],
  toolProficiencies: ['Herbalism Kit'],
  languages: ['Common', 'Quori'],
  spellcasting: {
    ability: Ability.Wisdom,
    spells: [],
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
