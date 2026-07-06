import {
  Ability,
  type Character,
  Skill,
} from '@ageorgedev/dnd-character-sheet';

export const SplitterData: Character = {
  name: 'Splitter',
  species: 'Warforged',
  background: 'Soldier',
  classes: [
    {
      name: 'Barbarian',
      level: 3,
      subclass: 'Berserker',
    },
  ],
  abilities: {
    [Ability.Strength]: 16,
    [Ability.Dexterity]: 14,
    [Ability.Constitution]: 16,
    [Ability.Intelligence]: 10,
    [Ability.Wisdom]: 10,
    [Ability.Charisma]: 8,
  },
  savingThrowProficiencies: [Ability.Strength, Ability.Constitution],
  skillProficiencies: [
    Skill.Athletics,
    Skill.History,
    Skill.Nature,
    Skill.Perception,
    Skill.Survival,
    Skill.Intimidation,
  ],
  skillExpertise: [],
  armorProficiencies: ['Light Armor', 'Medium Armor', 'Shield'],
  weaponProficiencies: ['Simple weapons', 'Martial weapons'],
  baseArmorClass: 16,
  speed: 30,
  hitPoints: {
    maximum: 39,
  },
  attacks: [
    {
      name: 'Greataxe',
      kind: 'weapon',
      ability: Ability.Strength,
      damage: [{ dice: '1d12', type: 'Slashing' }],
      masteryProperty: 'Graze',
      notes: 'Heavy, 2-handed',
    },
    {
      name: 'Handaxe (x4)',
      kind: 'weapon',
      ability: Ability.Strength,
      damage: [{ dice: '1d6', type: 'Slashing' }],
      masteryProperty: 'Vex',
      notes: 'Light, Thrown (20/60)',
    },
  ],
  equipment: [],
  features: [],
  toolProficiencies: [],
  languages: [],
};
