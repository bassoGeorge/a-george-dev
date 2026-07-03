import {
  Ability,
  type Character,
  Skill,
} from '@ageorgedev/dnd-character-sheet';

export const GonvarData: Character = {
  name: 'Gonvar Feathertide',
  species: 'Human',
  background: 'Guard',
  classes: [
    {
      name: 'Fighter',
      level: 3,
      subclass: 'Battle Master',
    },
  ],
  abilities: {
    [Ability.Strength]: 16,
    [Ability.Dexterity]: 14,
    [Ability.Constitution]: 13,
    [Ability.Intelligence]: 8,
    [Ability.Wisdom]: 12,
    [Ability.Charisma]: 12,
  },
  savingThrowProficiencies: [Ability.Strength, Ability.Constitution],
  skillProficiencies: [
    Skill.Athletics,
    Skill.Acrobatics,
    Skill.History,
    Skill.Perception,
    Skill.Survival,
    Skill.Intimidation,
  ],
  skillExpertise: [],
  baseArmorClass: 14,
  speed: 30,
  hitPoints: {
    maximum: 29,
  },
  attacks: [
    {
      ability: Ability.Strength,
      kind: 'weapon',
      name: 'Scimitar',
      masteryProperty: 'Nick',
      damage: [{ dice: '1d6', type: 'Slashing' }],
      notes: 'Light, Finesse',
    },
    {
      ability: Ability.Strength,
      kind: 'weapon',
      name: 'Dagger',
      damage: [{ dice: '1d4', type: 'Piercing' }],
      notes: 'Light, Finesse, Thrown (range 20/60)',
    },
    {
      ability: Ability.Strength,
      kind: 'weapon',
      name: 'Pike',
      masteryProperty: 'Push',
      damage: [{ dice: '1d10', type: 'Piercing' }],
      notes: '2-handed, Heavy, Reach (+5ft melee)',
    },
    {
      ability: Ability.Dexterity,
      kind: 'weapon',
      name: 'Crossbow',
      masteryProperty: 'Slow',
      damage: [{ dice: '1d8', type: 'Piercing' }],
      notes: 'Ammo (bolt; 80/320), Loading, 2-handed',
    },
  ],
  equipment: [],
  features: [],
  armorProficiencies: ['Heavy Armor', 'Light Armor', 'Medium Armor', 'Shield'],
  weaponProficiencies: ['Simple and Martial weapons'],
  toolProficiencies: ['Playing Card Set', "Woodcarver's tools"],
  languages: [],
  speciesTraits: [
    {
      name: 'Resourceful',
      description: 'Gain heroic inspiration on completing a Long Rest',
    },
  ],
  feats: [
    {
      name: 'Alert',
      description:
        '<ol><li>Your proficiency bonus is added to your Initiative roll</li><li>You may swap your initiative with any willing ally after rolling</li></ol>',
      statMod: {
        kind: 'generic-derived',
        mod: (stat) => ({
          ...stat,
          initiative: stat.initiative + stat.proficiencyBonus,
        }),
      },
    },
    {
      name: 'Savage attacker',
      description:
        "Once per turn, you may roll a weapon's damage dice twice and use either rolls.",
    },
  ],
};
