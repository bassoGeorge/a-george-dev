import {
  Ability,
  ArmorProficiency,
  type Character,
  CharacterClass,
  Skill,
} from '@ageorgedev/dnd-character-sheet';
import {
  ACTION_SURGE,
  COMBAT_SUPERIORITY,
  darkvision,
  FEY_ANCESTRY,
  KEEN_SENSES,
  SECOND_WIND,
  TACTICAL_MIND,
  TRANCE,
  weaponMastery,
} from '../common';

export const OmarinData: Character = {
  name: 'Omarin Kenate',
  species: 'Drow Elf',
  background: 'Farmer',
  // customDescription: 'Drow battle master with inner peace',
  size: 'Medium',
  classes: [
    {
      name: CharacterClass.Monk,
      level: 2,
    },
    {
      name: CharacterClass.Fighter,
      level: 3,
      subclass: 'Battle master',
    },
  ],
  experiencePoints: 0,
  abilities: {
    [Ability.Strength]: 8,
    [Ability.Dexterity]: 17,
    [Ability.Constitution]: 14,
    [Ability.Intelligence]: 12,
    [Ability.Wisdom]: 15,
    [Ability.Charisma]: 8,
  },
  savingThrowProficiencies: [Ability.Strength, Ability.Dexterity],
  skillProficiencies: [
    Skill.Stealth,
    Skill.Nature,
    Skill.AnimalHandling,
    Skill.Insight,
    Skill.Perception,
  ],
  skillExpertise: [],
  baseArmorClass: 15,
  speed: 40,
  hitPoints: {
    maximum: 52,
  },
  attacks: [
    {
      name: 'Shortsword',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [{ dice: '1d6', type: 'Piercing' }],
      masteryProperty: 'Vex',
      hasMasteryByDefault: true,
      notes: 'Light, Finesse',
    },
    {
      name: 'Scimitar',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [{ dice: '1d6', type: 'Slashing' }],
      masteryProperty: 'Nick',
      hasMasteryByDefault: true,
      notes: 'Light, Finesse',
    },
    {
      name: 'Unarmed Strike',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [{ dice: '1d6', type: 'Bludgeoning' }],
    },
    {
      name: 'Daggers (x5)',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [{ dice: '1d4', type: 'Piercing' }],
      masteryProperty: 'Nick',
      hasMasteryByDefault: true,
      notes: 'Light, Finesse, Thrown (range 20/60)',
    },
    {
      name: 'Light Crossbow',
      kind: 'weapon',
      ability: Ability.Dexterity,
      masteryProperty: 'Slow',
      damage: [{ dice: '1d8', type: 'Piercing' }],
      notes: 'Ammo (80/20, Bolt), Loading, 2-handed',
    },
  ],
  equipment: ['Bedroll, Backpack, Lantern', 'Flasks of oil (x4)'],
  armorProficiencies: [
    ArmorProficiency.LightArmor,
    ArmorProficiency.MediumArmor,
    ArmorProficiency.Shield,
  ],
  weaponProficiencies: [
    'Simple',
    'Martial',
    'Monk Weapons (Simple Melee, or Martial weapons with Light property)',
  ],
  toolProficiencies: ["Tinker's Tools", "Carpenter's Tools"],
  languages: [],
  features: [
    {
      name: 'Martial Arts',
      description:
        'On using only monk weapons, wearing no armor, and holding no shield, you gain the following benefits. <ol><li>Unarmed strikes as Bonus Actions</li><li>Can use Dex. modifier for attacks and damage rolls; 1d6 instead of normal damage -- for unarmed strikes and Monk weapons</li></ol>',
    },
    {
      name: 'Unarmored Defence + Movement',
      description:
        'When not wearing armor and not holding Shield: AC = 10 + Dex. + Wis. modifiers, Speed + 10',
    },
    weaponMastery(3),
    {
      name: "Monk's Focus",
      description: 'You have 2 Focus Points to fuel monk features',
      resource: {
        id: 'focusPoints',
        name: 'Focus Points',
        count: {
          kind: 'fixed',
          value: 2,
        },
        refresh: {
          kind: 'any-rest',
        },
      },
    },
    SECOND_WIND,
    TACTICAL_MIND,
    ACTION_SURGE,
    // TODO: the actual manuevers
    COMBAT_SUPERIORITY,
    {
      name: 'Uncanny Metabolism',
      description:
        'On rolling Initiative, regain all expended Focus Points, and regain 1d6+<%= level.Monk %> HP',
      resource: {
        id: 'uncannyMetabolism',
        name: 'Uncanny Metabolism',
        count: { kind: 'fixed', value: 1 },
        refresh: { kind: 'long-rest' },
      },
    },
  ],
  speciesTraits: [
    darkvision('120ft'),
    FEY_ANCESTRY,
    KEEN_SENSES,
    TRANCE,
    {
      name: 'Elven Lineage',
      description:
        'You know the Faerie Fire, and Darkness spells. You can cast them once without a spell slot. Refresh on Long Rest. Wisdom is your spell-casting ability for this',
    },
  ],
  feats: [
    {
      name: 'Tough',
      description:
        'Whenever you gain character levels, your Hit Point maximum increases by an additional 2 points',
    },
    {
      name: 'Two-Weapon Fighting',
      description:
        'When making the extra attack of the Light property, you can add the modifier to the damage',
    },
  ],

  spellcasting: {
    ability: Ability.Wisdom,
    spells: [
      {
        name: 'Faerie Fire',
        level: 1,
        castingTime: 'Action',
        range: '60ft',
        duration: '1min',
        concentration: true,
        alwaysPrepared: true,
        freeUses: 1,
      },
      {
        name: 'Darkness',
        level: 2,
        castingTime: 'Action',
        range: '60ft',
        duration: '10min',
        concentration: true,
        alwaysPrepared: true,
        freeUses: 1,
        notes: '15ft Sphere',
      },
    ],
    slots: {},
    numberOfCantrips: 0,
    numberOfPreparedSpells: 0,
  },

  backstory: `
  <p>This is the story of Omarin</p>
  <p><strong>Early years</strong> Had a lot of fun</p>
  `,
};
