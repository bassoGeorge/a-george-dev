import {
  Ability,
  type Character,
  Skill,
} from '@ageorgedev/dnd-character-sheet';

export const ThorinBattlemasterData: Character = {
  name: 'Thorin Battlemaster',
  species: 'Mountain Dwarf',
  background: 'Soldier',
  classes: [
    {
      name: 'Fighter',
      level: 7,
      subclass: 'Battle Master',
    },
  ],
  abilities: {
    [Ability.Strength]: 18,
    [Ability.Dexterity]: 12,
    [Ability.Constitution]: 16,
    [Ability.Intelligence]: 10,
    [Ability.Wisdom]: 12,
    [Ability.Charisma]: 8,
  },
  savingThrowProficiencies: [Ability.Strength, Ability.Constitution],
  skillProficiencies: [
    Skill.Athletics,
    Skill.Intimidation,
    Skill.Perception,
    Skill.Survival,
  ],
  skillExpertise: [],
  armorProficiencies: ['Light Armor', 'Medium Armor', 'Heavy Armor', 'Shield'],
  weaponProficiencies: ['Simple weapons', 'Martial weapons'],
  toolProficiencies: ["Smith's Tools"],
  languages: ['Common', 'Dwarvish'],
  baseArmorClass: 18,
  speed: 25,
  hitPoints: {
    maximum: 70,
  },
  attacks: [
    {
      name: 'Longsword',
      kind: 'weapon',
      ability: Ability.Strength,
      damage: [{ dice: '1d8', type: 'Slashing' }],
      masteryProperty: 'Sap',
      hasMasteryByDefault: true,
      notes: 'Versatile (1d10)',
    },
    {
      name: 'Hand Crossbow',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [{ dice: '1d6', type: 'Piercing' }],
      masteryProperty: 'Vex',
      notes: 'Light, Range 30/120',
    },
  ],
  equipment: [
    'Chain Mail',
    'Shield',
    'Longsword',
    'Hand Crossbow + 20 bolts',
    "Explorer's Pack",
    'Gaming Set (Dice)',
  ],
  features: [
    {
      name: 'Action Surge',
      castingTime: 'Action',
      description:
        'Once per Short Rest, you can take one additional action on your turn.',
      resource: {
        id: 'actionSurge',
        name: 'Action Surge',
        count: { kind: 'fixed', value: 1 },
        refresh: { kind: 'short-rest' },
      },
    },
    {
      name: 'Second Wind',
      castingTime: 'Bonus Action',
      description:
        'Once per Short Rest, you can regain 1d10 + your Fighter level hit points.',
      resource: {
        id: 'secondWind',
        name: 'Second Wind',
        count: { kind: 'fixed', value: 1 },
        refresh: { kind: 'short-rest' },
      },
    },
    {
      name: 'Combat Superiority',
      description:
        'You have <%= resources.superiorityDice.count %> superiority dice (each a <%= resources.superiorityDice.die %>). You regain all expended dice on a Short or Long Rest. You know <%= resources.maneuvers.count %> maneuvers chosen from the Battle Master list.',
      resource: {
        id: 'superiorityDice',
        name: 'Superiority Dice',
        count: {
          kind: 'class-level-steps',
          class: 'Fighter',
          steps: { 3: 4, 7: 5, 15: 6 },
        },
        refresh: { kind: 'short-rest' },
        die: {
          kind: 'class-level-steps',
          class: 'Fighter',
          steps: { 3: 'd8', 10: 'd10', 18: 'd12' },
        },
      },
    },
    {
      name: 'Maneuvers Known',
      description:
        'You know <%= resources.maneuvers.count %> Battle Master maneuvers. Save DC = 8 + proficiency bonus + Strength modifier.',
      resource: {
        id: 'maneuvers',
        name: 'Maneuvers Known',
        count: {
          kind: 'class-level-steps',
          class: 'Fighter',
          steps: { 3: 3, 7: 5, 10: 7, 15: 9 },
          display: 'numeric',
        },
        refresh: { kind: 'long-rest' },
      },
    },
    {
      name: 'Extra Attack',
      description:
        'You can attack twice, instead of once, whenever you take the Attack action on your turn.',
    },
    {
      name: 'Indomitable',
      description:
        'Once per Long Rest, you can reroll a saving throw that you fail. You must use the new roll.',
      resource: {
        id: 'indomitable',
        name: 'Indomitable',
        count: { kind: 'fixed', value: 1 },
        refresh: { kind: 'long-rest' },
      },
    },
    {
      name: 'Know Your Enemy',
      description:
        'If you spend at least 1 minute observing or interacting with another creature outside combat, you can learn certain information about its capabilities compared to your own.',
    },
    {
      name: 'Relentless',
      description:
        'Starting at 7th level, when you roll initiative and have no superiority dice remaining, you regain one superiority die.',
    },
  ],
  spellcasting: undefined,
};
