import {
  Ability,
  ArmorProficiency,
  type Character,
  CharacterClass,
  type Creature,
  Skill,
  SPELL,
  withSpellMods,
} from '@ageorgedev/dnd-character-sheet';
import { ALERT, SKILLED } from '../common';

const moonFormDetails = [
  { label: 'Circle Forms AC', value: '17 (13 + Wisdom modifier)' },
  { label: 'Temporary Hit Points', value: '15 when Wild Shape begins' },
];

const moonFormMentalAbilities = {
  [Ability.Intelligence]: 12,
  [Ability.Wisdom]: 18,
  [Ability.Charisma]: 10,
};

const moonFormSavingThrows = {
  [Ability.Intelligence]: 4,
  [Ability.Wisdom]: 7,
};

const moonForm = (
  creature: Omit<Creature, 'armorClass' | 'details' | 'savingThrows'>
): Creature => ({
  ...creature,
  armorClass: 17,
  abilities: {
    ...creature.abilities,
    ...moonFormMentalAbilities,
  },
  savingThrows: moonFormSavingThrows,
  details: moonFormDetails,
});

export const MaraThornfieldData: Character = {
  name: 'Mara Thornfield',
  species: 'Human',
  background: 'Guide',
  creatureType: 'Humanoid',
  alignment: 'Neutral Good',
  classes: [
    {
      name: CharacterClass.Druid,
      level: 5,
      subclass: 'Circle of the Moon',
    },
  ],
  abilities: {
    [Ability.Strength]: 8,
    [Ability.Dexterity]: 14,
    [Ability.Constitution]: 14,
    [Ability.Intelligence]: 12,
    [Ability.Wisdom]: 18,
    [Ability.Charisma]: 10,
  },
  savingThrowProficiencies: [Ability.Intelligence, Ability.Wisdom],
  skillProficiencies: [
    Skill.AnimalHandling,
    Skill.Insight,
    Skill.Nature,
    Skill.Perception,
    Skill.Survival,
  ],
  skillExpertise: [],
  armorProficiencies: [ArmorProficiency.LightArmor, ArmorProficiency.Shield],
  weaponProficiencies: ['Simple weapons'],
  toolProficiencies: ['Herbalism Kit', "Cartographer's Tools"],
  languages: ['Common', 'Druidic', 'Sylvan'],
  baseArmorClass: 13,
  isWieldingShield: true,
  speed: 30,
  hitPoints: { maximum: 38 },
  attacks: [
    {
      name: 'Shillelagh',
      kind: 'spell-with-attack',
      ability: Ability.Wisdom,
      damage: [{ dice: '1d10', type: 'Bludgeoning' }],
      notes: 'Quarterstaff; cast as a Bonus Action; lasts 1 minute',
    },
    {
      name: 'Starry Wisp',
      kind: 'spell-with-attack',
      ability: Ability.Wisdom,
      damage: [{ dice: '2d8', type: 'Radiant' }],
      notes:
        'Range 60 ft.; target cannot benefit from Invisible until your next turn',
    },
    {
      name: 'Thorn Whip',
      kind: 'spell-with-attack',
      ability: Ability.Wisdom,
      damage: [{ dice: '2d6', type: 'Piercing' }],
      notes: 'Range 30 ft.; pull a Large or smaller target up to 10 ft. closer',
    },
  ],
  equipment: [
    'Leather armor, Wooden shield, Quarterstaff',
    'Druidic focus (sprig of mistletoe)',
    "Explorer's pack, Herbalism Kit, Cartographer's Tools",
    "Traveller's clothes, Bedroll, Waterskin, Rope",
  ],
  features: [
    {
      name: 'Druidic',
      description:
        'You know Druidic and always have <em>Speak with Animals</em> prepared. You can use Druidic as a spellcasting focus for Druid spells.',
    },
    {
      name: 'Primal Order: Magician',
      description:
        'You know one extra Druid cantrip. Add your Wisdom modifier to Intelligence (Arcana or Nature) checks.',
    },
    {
      name: 'Wild Shape',
      castingTime: 'Bonus Action',
      duration: '2 hours 30 minutes',
      resource: {
        id: 'wild-shape',
        name: 'Wild Shape',
        count: { kind: 'fixed', value: 2 },
        refresh: {
          kind: 'short-and-long-rest',
          numberOfRefreshesOnShortRest: 1,
        },
      },
      description:
        'Transform into one of the prepared Beast forms below. You retain your personality, creature type, Hit Points, Hit Dice, Intelligence, Wisdom, Charisma, languages, and ability to communicate. The form ends early if you gain the <em>Incapacitated</em> condition, die, or use Wild Shape again.',
    },
    {
      name: 'Wild Companion',
      castingTime: 'Action',
      cost: '1 Wild Shape use or 1 spell slot',
      description:
        'Cast <em>Find Familiar</em> without a Material component. The familiar is a Fey and disappears when you finish a Long Rest.',
    },
    {
      name: 'Circle Forms',
      description:
        'You can assume Beast forms up to CR 1. In a form, your AC is 13 + your Wisdom modifier (17) if that is higher, and you gain 3 temporary Hit Points per Druid level (15).',
    },
    {
      name: 'Wild Resurgence',
      description:
        'Once per turn, expend a spell slot to regain one Wild Shape use. Once per Long Rest, expend one Wild Shape use to regain a level 1 spell slot.',
    },
  ],
  speciesTraits: [
    {
      name: 'Resourceful',
      description: 'Gain Heroic Inspiration whenever you finish a Long Rest.',
    },
    {
      name: 'Skillful',
      description: 'You gain proficiency in one skill of your choice.',
    },
    {
      name: 'Versatile',
      description: 'You gain an Origin feat of your choice.',
    },
  ],
  feats: [ALERT, SKILLED],
  spellcasting: {
    ability: Ability.Wisdom,
    slots: { 1: 4, 2: 3, 3: 2 },
    numberOfCantrips: 4,
    numberOfPreparedSpells: 9,
    spells: [
      SPELL.Guidance,
      SPELL.Shillelagh,
      SPELL.StarryWisp,
      SPELL.ThornWhip,
      withSpellMods(SPELL.SpeakWithAnimals, { alwaysPrepared: true }),
      SPELL.Entangle,
      SPELL.FaerieFire,
      SPELL.Goodberry,
      SPELL.HealingWord,
      SPELL.Longstrider,
      SPELL.PassWithoutTrace,
      SPELL.SpikeGrowth,
      SPELL.CallLightning,
      SPELL.DispelMagic,
      withSpellMods(SPELL.CureWounds, { alwaysPrepared: true }),
      withSpellMods(SPELL.Moonbeam, { alwaysPrepared: true }),
      withSpellMods(SPELL.VampiricTouch, { alwaysPrepared: true }),
    ],
  },
  creatures: [
    moonForm({
      name: 'Brown Bear',
      description: 'Combat form: multiattack and reliable control.',
      size: 'Large',
      creatureType: 'Beast',
      alignment: 'Unaligned',
      initiative: 1,
      speed: '40 ft., Climb 30 ft.',
      hitPoints: { maximum: 22, dice: '3d10 + 6' },
      abilities: {
        [Ability.Strength]: 17,
        [Ability.Dexterity]: 12,
        [Ability.Constitution]: 15,
      },
      skills: { [Skill.Perception]: 7 },
      senses: ['Darkvision 60 ft.', 'Passive Perception 17'],
      languages: ['Common, Druidic, and Sylvan'],
      challengeRating: '1',
      experiencePoints: 200,
      proficiencyBonus: 2,
      actions: [
        {
          name: 'Multiattack',
          description: 'Make one Bite attack and one Claw attack.',
        },
        {
          name: 'Bite',
          description:
            '<em>Melee Attack Roll:</em> +5, reach 5 ft. <em>Hit:</em> 7 (1d8 + 3) Piercing damage.',
        },
        {
          name: 'Claw',
          description:
            '<em>Melee Attack Roll:</em> +5, reach 5 ft. <em>Hit:</em> 5 (1d4 + 3) Slashing damage. A Large or smaller target has the <em>Prone</em> condition.',
        },
      ],
    }),
    moonForm({
      name: 'Dire Wolf',
      description: 'Pursuit form: fast movement and pack tactics.',
      size: 'Large',
      creatureType: 'Beast',
      alignment: 'Unaligned',
      initiative: 2,
      speed: '50 ft.',
      hitPoints: { maximum: 22, dice: '3d10 + 6' },
      abilities: {
        [Ability.Strength]: 17,
        [Ability.Dexterity]: 15,
        [Ability.Constitution]: 15,
      },
      skills: { [Skill.Perception]: 7, [Skill.Stealth]: 4 },
      senses: ['Darkvision 60 ft.', 'Passive Perception 17'],
      languages: ['Common, Druidic, and Sylvan'],
      challengeRating: '1',
      experiencePoints: 200,
      proficiencyBonus: 2,
      traits: [
        {
          name: 'Pack Tactics',
          description:
            'You have Advantage on an attack roll against a creature if at least one ally is within 5 feet of it and that ally is not <em>Incapacitated</em>.',
        },
      ],
      actions: [
        {
          name: 'Bite',
          description:
            '<em>Melee Attack Roll:</em> +5, reach 5 ft. <em>Hit:</em> 8 (1d10 + 3) Piercing damage. A Large or smaller target has the <em>Prone</em> condition.',
        },
      ],
    }),
    moonForm({
      name: 'Giant Spider',
      description: 'Infiltration form: climb anywhere and restrain at range.',
      size: 'Large',
      creatureType: 'Beast',
      alignment: 'Unaligned',
      initiative: 3,
      speed: '30 ft., Climb 30 ft.',
      hitPoints: { maximum: 26, dice: '4d10 + 4' },
      abilities: {
        [Ability.Strength]: 14,
        [Ability.Dexterity]: 16,
        [Ability.Constitution]: 12,
      },
      skills: { [Skill.Perception]: 7, [Skill.Stealth]: 7 },
      senses: ['Darkvision 60 ft.', 'Passive Perception 17'],
      languages: ['Common, Druidic, and Sylvan'],
      challengeRating: '1',
      experiencePoints: 200,
      proficiencyBonus: 2,
      traits: [
        {
          name: 'Spider Climb',
          description:
            'Climb difficult surfaces, including ceilings, without an ability check.',
        },
        {
          name: 'Web Walker',
          description:
            'Ignore movement restrictions caused by webs and know the location of creatures touching the same web.',
        },
      ],
      actions: [
        {
          name: 'Bite',
          description:
            '<em>Melee Attack Roll:</em> +5, reach 5 ft. <em>Hit:</em> 7 (1d8 + 3) Piercing plus 7 (2d6) Poison damage.',
        },
        {
          name: 'Web (Recharge 5–6)',
          description:
            '<em>Dexterity Save:</em> DC 13, one creature within 60 ft. <em>Failure:</em> <em>Restrained</em> until the web is destroyed (AC 10; HP 5; vulnerable to Fire; immune to Poison and Psychic).',
        },
      ],
    }),
    moonForm({
      name: 'Giant Octopus',
      description: 'Aquatic form: swimming, reach, and grappling.',
      size: 'Large',
      creatureType: 'Beast',
      alignment: 'Unaligned',
      initiative: 1,
      speed: '10 ft., Swim 60 ft.',
      hitPoints: { maximum: 45, dice: '7d10 + 7' },
      abilities: {
        [Ability.Strength]: 17,
        [Ability.Dexterity]: 13,
        [Ability.Constitution]: 13,
      },
      skills: { [Skill.Perception]: 7, [Skill.Stealth]: 5 },
      senses: ['Darkvision 60 ft.', 'Passive Perception 17'],
      languages: ['Common, Druidic, and Sylvan'],
      challengeRating: '1',
      experiencePoints: 200,
      proficiencyBonus: 2,
      traits: [
        {
          name: 'Water Breathing',
          description:
            'You can breathe only underwater and can hold your breath for 1 hour outside water.',
        },
      ],
      actions: [
        {
          name: 'Tentacles',
          description:
            '<em>Melee Attack Roll:</em> +5, reach 10 ft. <em>Hit:</em> 10 (2d6 + 3) Bludgeoning damage. A Medium or smaller target is <em>Grappled</em> (escape DC 13) and <em>Restrained</em>.',
        },
      ],
      reactions: [
        {
          name: 'Ink Cloud (1/Day)',
          description:
            'When damaged underwater, fill a 10-foot Cube centered on you with heavily obscuring ink for 1 minute, then move up to your Swim Speed.',
        },
      ],
    }),
    moonForm({
      name: 'Panther',
      description: 'Scouting form: speed, stealth, and easy disengagement.',
      size: 'Medium',
      creatureType: 'Beast',
      alignment: 'Unaligned',
      initiative: 3,
      speed: '50 ft., Climb 40 ft.',
      hitPoints: { maximum: 13, dice: '3d8' },
      abilities: {
        [Ability.Strength]: 14,
        [Ability.Dexterity]: 16,
        [Ability.Constitution]: 10,
      },
      skills: { [Skill.Perception]: 7, [Skill.Stealth]: 7 },
      senses: ['Darkvision 60 ft.', 'Passive Perception 17'],
      languages: ['Common, Druidic, and Sylvan'],
      challengeRating: '1/4',
      experiencePoints: 50,
      proficiencyBonus: 2,
      actions: [
        {
          name: 'Rend',
          description:
            '<em>Melee Attack Roll:</em> +5, reach 5 ft. <em>Hit:</em> 6 (1d6 + 3) Slashing damage.',
        },
      ],
      bonusActions: [
        {
          name: 'Nimble Escape',
          description: 'Take the <em>Disengage</em> or <em>Hide</em> action.',
        },
      ],
    }),
    moonForm({
      name: 'Riding Horse',
      description: 'Travel form: carry an ally and cover ground quickly.',
      size: 'Large',
      creatureType: 'Beast',
      alignment: 'Unaligned',
      initiative: 1,
      speed: '60 ft.',
      hitPoints: { maximum: 13, dice: '2d10 + 2' },
      abilities: {
        [Ability.Strength]: 16,
        [Ability.Dexterity]: 13,
        [Ability.Constitution]: 12,
      },
      skills: { [Skill.Perception]: 7 },
      senses: ['Passive Perception 17'],
      languages: ['Common, Druidic, and Sylvan'],
      challengeRating: '1/4',
      experiencePoints: 50,
      proficiencyBonus: 2,
      actions: [
        {
          name: 'Hooves',
          description:
            '<em>Melee Attack Roll:</em> +5, reach 5 ft. <em>Hit:</em> 7 (1d8 + 3) Bludgeoning damage.',
        },
      ],
    }),
  ],
  appearance:
    'A weathered human trail guide in moss-green leathers, with braided dark hair, a rowan-wood staff, and a cloak patched in the colours of woodland animals.',
  backstory:
    'Mara once guided caravans through a forest whose paths shifted under moonlight. After surviving a winter beside its beasts, she learned to borrow their shapes and now protects travellers who respect the wild places between settlements.',
};
