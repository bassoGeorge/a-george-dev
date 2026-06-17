import { Ability } from '../lib/models/abilities';
import type { Character } from '../lib/models/character';
import { Skill } from '../lib/models/skills';

export const exampleWizard: Character = {
  name: 'Seraphina Ashveil',
  classes: [
    {
      class: 'Sorcerer',
      subclass: 'Wild Magic',
      level: 4,
    },
    {
      class: 'Warlock',
      subclass: 'The Archfey',
      level: 3,
    },
  ],

  species: 'High Elf',
  background: 'Sage',
  alignment: 'Neutral Good',
  experiencePoints: 23000,

  abilities: {
    [Ability.Strength]: 6,
    [Ability.Dexterity]: 14,
    [Ability.Constitution]: 14,
    [Ability.Intelligence]: 18,
    [Ability.Wisdom]: 12,
    [Ability.Charisma]: 10,
  },

  savingThrowProficiencies: [Ability.Intelligence, Ability.Wisdom],
  skillProficiencies: [
    Skill.Arcana,
    Skill.History,
    Skill.Investigation,
    Skill.Perception,
  ],
  skillExpertise: [Skill.Arcana],

  armorClass: 13,
  speed: 30,
  hitPoints: {
    maximum: 45,
    current: 45,
  },

  hitDice: {
    dieType: 'd6',
    total: 7,
  },

  attacks: [
    {
      name: 'Quarterstaff',
      kind: 'weapon',
      ability: Ability.Strength,
      damage: [
        { dice: '1d6', type: 'Bludgeoning' },
        { dice: '1d4', type: 'Necroic', disableModifier: true },
      ],
      masteryProperty: 'Slow',
    },
    {
      name: 'Fire Bolt',
      kind: 'spell-with-attack',
      damage: [{ dice: '1d10', type: 'Fire' }],
    },
    {
      name: 'Dissonant Whispers',
      kind: 'spell-with-save',
      ability: Ability.Charisma,
      saveAbility: Ability.Wisdom,
      damage: [{ dice: '3d6', type: 'Psychic' }],
    },
  ],

  equipment: [
    'Arcane Focus (Crystal Orb)',
    'Spellbook',
    "Scholar's Pack",
    'Dagger',
    'Robes',
  ],
  currency: {
    cp: 0,
    sp: 0,
    ep: 0,
    gp: 120,
    pp: 0,
  },

  features: [
    {
      name: 'Font of Magic',
      source: 'Sorcerer 2',
      description:
        'You can use a bonus action to convert sorcery points into spell slots, or vice versa.',
      resource: {
        name: 'Sorcery Points',
        count: {
          kind: 'class-level',
          class: 'Sorcerer',
          multiplier: 1,
        },
        refresh: {
          kind: 'long-rest',
        },
      },
    },
    {
      name: 'Arcane Recovery',
      source: 'Wizard 1',
      description:
        'Once per day after a short rest, recover spell slots with combined level up to half your wizard level (rounded up).',
    },
    {
      name: 'Sculpt Spells',
      source: 'Evocation Wizard 2',
      description:
        'When you cast an evocation spell, choose up to 1 + spell level creatures. They automatically succeed on saving throws and take no damage.',
    },
    {
      name: 'Potent Cantrip',
      source: 'Evocation Wizard 6',
      description:
        'Targets of your damaging cantrips who succeed on their saving throws still take half damage.',
    },
  ],

  armorProficiencies: ['Light armor'],
  weaponProficiencies: [
    'Daggers',
    'Darts',
    'Slings',
    'Quarterstaffs',
    'Light Crossbows',
  ],
  toolProficiencies: ["Calligrapher's Supplies"],
  languages: ['Common', 'Elvish', 'Draconic', 'Sylvan'],

  personality: {
    traits:
      'I use polysyllabic words that convey the impression of great erudition.',
    ideals:
      'Knowledge. The path to power and self-improvement is through knowledge.',
    bonds:
      "My life's work is a series of tomes related to the history of magic.",
    flaws: 'I overlook obvious solutions in favour of complicated ones.',
  },

  backstory:
    "Seraphina studied at the Arcane Academy for fifteen years before striking out on her own to research the ancient Ashveil bloodline's connection to the Weave.",

  spellcasting: {
    ability: Ability.Intelligence,
    slots: {
      1: 4,
      2: 3,
      3: 3,
      4: 1,
    },
    pactMagic: { level: 2, slots: 2 },
    spells: [
      // Cantrips (level 0)
      {
        name: 'Fire Bolt',
        level: 0,
        school: 'Evocation',
        castingTime: '1 action',
        range: '120 ft',
        duration: 'Instantaneous',
        components: { verbal: true, somatic: true },
      },
      {
        name: 'Mage Hand',
        level: 0,
        school: 'Conjuration',
        castingTime: '1 action',
        range: '30 ft',
        duration: '1 minute',
        components: { verbal: true, somatic: true },
      },
      {
        name: 'Prestidigitation',
        level: 0,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '10 ft',
        duration: 'Up to 1 hour',
        components: { verbal: true, somatic: true },
      },
      // Levelled spells
      {
        name: 'Detect Magic',
        level: 1,
        school: 'Divination',
        castingTime: '1 action',
        range: 'Self',
        duration: 'Concentration, up to 10 minutes',
        concentration: true,
        ritual: true,
        components: { verbal: true, somatic: true },
        alwaysPrepared: true,
      },
      {
        name: 'Magic Missile',
        level: 1,
        school: 'Evocation',
        castingTime: '1 action',
        range: '120 ft',
        duration: 'Instantaneous',
        components: { verbal: true, somatic: true },
      },
      {
        name: 'Shield',
        level: 1,
        school: 'Abjuration',
        castingTime: '1 reaction',
        range: 'Self',
        duration: '1 round',
        components: { verbal: true, somatic: true },
      },
      {
        name: 'Misty Step',
        level: 2,
        school: 'Conjuration',
        castingTime: '1 bonus action',
        range: 'Self',
        duration: 'Instantaneous',
        components: { verbal: true },
      },
      {
        name: 'Scorching Ray',
        level: 2,
        school: 'Evocation',
        castingTime: '1 action',
        range: '120 ft',
        duration: 'Instantaneous',
        components: { verbal: true, somatic: true },
      },
      {
        name: 'Hypnotic Pattern',
        level: 3,
        school: 'Illusion',
        castingTime: '1 action',
        range: '120 ft',
        duration: 'Concentration, up to 1 minute',
        concentration: true,
        components: { verbal: false, somatic: true, materialConsumed: false },
        notes:
          'Material component: a glowing stick of incense or a crystal vial of phosphorescent material',
      },
      {
        name: 'Fireball',
        level: 3,
        school: 'Evocation',
        castingTime: '1 action',
        range: '150 ft',
        duration: 'Instantaneous',
        components: { verbal: true, somatic: true, materialConsumed: true },
        notes: 'Material: a tiny ball of bat guano and sulfur',
      },
      {
        name: 'Banishment',
        level: 4,
        school: 'Abjuration',
        castingTime: '1 action',
        range: '60 ft',
        duration: 'Concentration, up to 1 minute',
        concentration: true,
        components: { verbal: true, somatic: true, materialConsumed: false },
        alternativeAbility: Ability.Charisma,
        freeUses: 1,
        notes:
          'Free use from Amulet of the Planes. When not using the amulet, uses Intelligence.',
      },
    ],
  },
};
