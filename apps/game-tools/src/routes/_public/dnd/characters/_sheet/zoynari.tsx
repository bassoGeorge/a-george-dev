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
  features: [],
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
