import {
  Ability,
  ArmorProficiency,
  type Character,
  CharacterClass,
  Skill,
} from '@ageorgedev/dnd-character-sheet';

export const ClawData: Character = {
  name: 'Claw',
  species: 'Shifter',
  background: 'Scribe',
  classes: [
    {
      name: CharacterClass.Rogue,
      subclass: 'Arcane Trickster',
      level: 3,
    },
  ],
  abilities: {
    [Ability.Strength]: 8,
    [Ability.Dexterity]: 16,
    [Ability.Constitution]: 12,
    [Ability.Intelligence]: 16,
    [Ability.Wisdom]: 12,
    [Ability.Charisma]: 10,
  },
  savingThrowProficiencies: [Ability.Dexterity, Ability.Intelligence],
  skillProficiencies: [
    Skill.Acrobatics,
    Skill.SleightOfHand,
    Skill.Stealth,
    Skill.Investigation,
    Skill.Insight,
    Skill.Perception,
    Skill.Deception,
    Skill.Intimidation,
  ],
  skillExpertise: [Skill.Perception, Skill.Stealth],
  baseArmorClass: 14,
  speed: 30,
  hitPoints: {
    maximum: 22,
  },
  attacks: [
    {
      name: 'Daggers (x2)',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [
        {
          dice: '1d4',
          type: 'Piercing',
        },
      ],
      masteryProperty: 'Nick',
      hasMasteryByDefault: true,
      notes: 'Light, Finesse, Thrown (range 20/60)',
    },
    {
      name: 'Shortsword',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [
        {
          dice: '1d6',
          type: 'Piercing',
        },
      ],
      masteryProperty: 'Vex',
      hasMasteryByDefault: true,
      notes: 'Light, Finesse',
    },
    {
      name: 'Shortbow',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [
        {
          dice: '1d6',
          type: 'Piercing',
        },
      ],
      masteryProperty: 'Nick',
      notes: 'Ammunition (arrow; 80/320), two-handed',
    },
  ],
  equipment: [
    'Backpack, Ball bearings, Bell, Crowbar, Hooded lantern, Fine clothes',
    'Parchment sheets = 12',
    'Candles = 10',
    'Oil flasks = 5',
    "Thieves's tools, Calligrapher's supplies",
    'Leather Armour',
    'Arrows = 20',
    'Potion of healing = 1',
  ],
  features: [
    {
      name: 'Expertise',
      description: 'You gain expertise in Stealth and Perception',
    },
    {
      name: 'Sneak Attack',
      description:
        "Once per turn, you can deal an extra 2d6 damage to one creature you hit with an Attack roll if you have Advantage on that attack roll and it was made with a Finesse or Ranged weapon. You don't need Advantage if an ally is within 5ft of the target.",
    },
    {
      name: 'Weapon Mastery',
      description: 'You have mastery over 2 kinds of weapons',
    },
    {
      name: 'Cunning Action',
      castingTime: 'Bonus Action',
      description:
        'You can take the following as Bonus Actions -- <em>Dash</em>, <em>Disengage</em>, or <em>Hide</em>',
    },
    {
      name: 'Steady Aim',
      castingTime: 'Bonus Action',
      description:
        "Give yourself Advantage on your next attack roll on the current turn. You can use this feature if you haven't moved during this turn, and when you use it, your Speed becomes 0 until the end of your current turn.",
    },
    {
      name: 'Mage Hand Legerdemain',
      description:
        'When you cast <em>Mage Hand</em>, you can cast it as a Bonus Action and you can make the spectral hand Invisible. You can control the hand as a Bonus Action and through it, you can make Sleight of Hand checks.',
    },
  ],
  speciesTraits: [
    {
      name: 'Darkvision',
      description: '60ft',
    },
    {
      name: 'Bestial Instincts',
      description: 'You gain proficiency in Acrobatics',
    },
    {
      name: 'Shifting',
      castingTime: 'Bonus Action',
      duration: '1min',
      description: `You can shape-shift to assume a more bestial appearance. When shifting, you gain 4 Temporary Hit Points. While shifted, you have the following additional benefits. 
      <ol>
      <li>Your Speed increases by 10ft.</li>
      <li>You can move up to 10ft as a Reaction when a creature ends its turn within 5ft of you. This reactive movement does not provoke Opportunity attacks</li>
      </ol>
      `,
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
  ],
  armorProficiencies: [ArmorProficiency.LightArmor],
  weaponProficiencies: [
    'Simple weapons',
    'Martial weapons that have the Finesse or Light property',
  ],
  toolProficiencies: ["Thieves' tools", "Calligrapher's supplies"],
  languages: ['Common', 'Gnomish', "Thieves's Cant"],
  appearance: `
  Shifters are humanoids with beast aspects. They can't change shape fully, but can enhance their animalistic features temporarily. 
  <em>Switfstride</em> shifters are graceful and quick, typically feline in nature. 
  You may have some features of cats about you, maybe the eyes and some whiskers?
  `,
  backstory: `
  <p><strong>Scribe:</strong> You have dedicated time serving in a library or government office, handling a lot of written text. You may have been employed as a communication clerk or related.</p>
  <p><strong>Shifter settlements:</strong> Shifters come from often secluded settlements. What made you move to the big city of Sharn?
  `,
  spellcasting: {
    ability: Ability.Intelligence,
    slots: { 1: 2 },
    numberOfCantrips: 3,
    numberOfPreparedSpells: 3,
    spells: [
      {
        name: 'Mage Hand',
        level: 0,
        castingTime: 'Bonus Action',
        range: '30ft',
        duration: '1min',
      },
      {
        name: 'Mind Sliver',
        level: 0,
        castingTime: 'Action',
        range: '60ft',
        duration: 'round',
      },
      {
        name: 'Minor Illusion',
        level: 0,
        castingTime: 'Action',
        range: '30ft',
        duration: '1min',
      },
      {
        name: 'Charm Person',
        level: 1,
        alwaysPrepared: true,
        castingTime: 'Action',
        range: '30ft',
        duration: '1hr',
      },
      {
        name: 'Magic Missile',
        level: 1,
        alwaysPrepared: true,
        castingTime: 'Action',
        range: '120ft',
        notes: '3 darts, 1d4+1 force damage',
      },
      {
        name: 'Fog Cloud',
        level: 1,
        alwaysPrepared: true,
        concentration: true,
        castingTime: 'Action',
        range: '120ft',
        duration: '1hr',
      },
    ],
  },
};
