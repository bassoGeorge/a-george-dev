import {
  Ability,
  type Character,
  Skill,
} from '@ageorgedev/dnd-character-sheet';

export const ElnorinData: Character = {
  name: 'Elnorin Lunarrest',
  species: 'Wood Elf (Tairnadal)',
  background: 'Acolyte',
  classes: [
    {
      name: 'Sorcerer',
      level: 3,
      subclass: 'Clockwork Sorcery',
    },
  ],
  abilities: {
    [Ability.Strength]: 10,
    [Ability.Dexterity]: 12,
    [Ability.Constitution]: 14,
    [Ability.Intelligence]: 10,
    [Ability.Wisdom]: 12,
    [Ability.Charisma]: 16,
  },
  savingThrowProficiencies: [Ability.Constitution, Ability.Charisma],
  skillProficiencies: [
    Skill.Arcana,
    Skill.Religion,
    Skill.Insight,
    Skill.Perception,
    Skill.Persuasion,
  ],
  skillExpertise: [],
  baseArmorClass: 11,
  speed: 35, // due to species trait
  hitPoints: {
    maximum: 21,
  },
  weaponProficiencies: ['Simple weapons'],
  toolProficiencies: ["Calligrapher's supplies"],
  languages: ['Common', 'Elvish'],
  attacks: [
    {
      kind: 'spell-with-attack',
      name: 'Shocking Grasp',
      damage: [{ dice: '1d8', type: 'Lightning' }],
      notes: 'target loses Opportunity attacks',
    },
    {
      kind: 'weapon',
      name: 'Dagger (x4)',
      ability: Ability.Dexterity,
      damage: [{ dice: '1d4', type: 'Piercing' }],
      notes: 'Finesse, Light, Thrown (range 20/60)',
    },
    {
      kind: 'weapon',
      name: 'Spear',
      ability: Ability.Strength,
      damage: [{ dice: '1d6', type: 'Piercing' }],
      notes: 'Versatile (1d8), Thrown (range 20/60)',
    },
    // TODO: add the damage cantrips
  ],
  armorProficiencies: [],
  equipment: [
    'Backpack, Bedroll, Book (prayers), Holy symbol, Parchment (10 sheets), Robe, Caltrops, Crowbar, Tinderbox, Rope, Waterskin',
    'Oil flasks = 2',
    'Rations (days) = 5',
    'Torches = 5',
    'Arcane focus - Crystal',
  ],
  appearance:
    'Elves live a long time and are driven by respect for tradition and past. Tairnadal, the wood elves, have decicated themselves to the arts of war. They have distinct religious traditions of revering their famous ancestors.',
  backstory: `
  <p><strong>Acolyte.</strong> You have spent several years in a temple or monastry, in service of a god. Why are you still not in that place? How did you gain your sorcerous powers?</p>
  <p><strong>Manifestation of Order.</strong> The cosmic forces of the Order have suffused you with magic. The power arives arises from <em>Mechanus</em>, a plane of existence shaped entirely by clockwork efficiency. When you cast sorcerer spells, you manifest this connection in some way, maybe spectral cogwheels hover behind you or the ticking of gears/ring, of clock can be heard by you and those affected by your spells.</p>`,
  features: [
    {
      name: 'Innate Sorcery',
      duration: '1min',
      description: `
      You unlease magic for 1min. During this time, you have the following effects:
      <ol>
      <li>+1 to Spell save DC of sorcerer spells</li>
      <li>Advantage on Attack rolls of sorcerer spells</li>
      </ol>
      `,
      cost: '1 innate sorcery charge',
      resource: {
        name: 'Innate Sorcery charge',
        count: {
          kind: 'fixed',
          value: 2,
        },
        refresh: {
          kind: 'long-rest',
        },
      },
    },
    {
      name: 'Font of magic',
      description: `
      You have sorcery points that fuel special meta magic abilities. Additionally you can do the following:
      <ol>
      <li>As a <em>Free Action</em>, you can spend 1 spell slot to gain sorcery points equal to the level of the slot</li>
      <li>
        As a <em>Bonus Action</em>, you can spend sorcery points to create spell slots using the following conversion
        <ul>
          <li>1st level slot: 2 sorcery points</li>
          <li>2nd level slot: 3 sorcery points</li>
        </ul>
      </li>
      </ol>
      `,
      resource: {
        name: 'Sorcery Points',
        count: {
          kind: 'fixed',
          value: 3,
        },
        refresh: {
          kind: 'long-rest',
        },
      },
    },
    {
      name: 'Metamagic',
      description:
        'You can alter your spells being cast using the following metamagic options. Unless stated otherwise, only one metamagic option can be used on a single spell cast',
    },
    {
      name: 'Metamagic: Distant Spell',
      cost: '1 sorcery point',
      description:
        'Doubles the range of a spell. A spell with the range of Touch turns into a range of 30ft',
    },
    {
      name: 'Metamagic: Empowered Spell',
      cost: '1 sorcery point',
      description:
        'Can reroll upto <%= abilityModifiers.CHA %> damage dice of a spell. Must use the new roll. Can be used even if a different metamagic option is used in the casting of this spell',
    },
    {
      name: 'Restore balance',
      castingTime: 'Reaction',
      description:
        'When a creature you can see within 60ft of yourself is about to roll a d20 with Advantage or Disadvantage, you can take a Reaction to prevent the roll from being affected by that Advantage/Disadvantage and make them roll straight.',
    },
  ],
  speciesTraits: [
    {
      name: 'Elven Lineage (Wood Elf)',
      description:
        'Your speed increases to 35ft. You know the <em>Druidcraft</em> cantrip.',
    },
    {
      name: 'Fey Ancestry',
      description:
        'You have Advantage on Saving throws you make to avoid or end the <em>Charmed</em> condition.',
    },
    {
      name: 'Keen Senses',
      description: 'You have proficiency in Perception skill.',
    },
    {
      name: 'Trance',
      description:
        "You don't need sleep. Magic can't put you to sleep. You can finish a Long Rest in 4hrs if you spend that time in a trance like meditative state.",
    },
  ],
  feats: [
    {
      name: 'Magic Initiate - Cleric',
      description:
        'You gain 2 cantrips from the Cleric list. You also gain a level 1 spell from the same list, which you can cast once without a spell slot. After casting this way, you need to spend spell slots to cast it again until you finish a Long Rest.',
    },
  ],
  spellcasting: {
    ability: Ability.Charisma,
    numberOfCantrips: 4,
    numberOfPreparedSpells: 6,
    slots: {
      1: 4,
      2: 2,
    },
    spells: [
      {
        name: 'Light',
        level: 0,
        castingTime: 'Action',
        range: 'Touch',
        duration: '1hr',
      },
      {
        name: 'Prestidigitation',
        level: 0,
        castingTime: 'Action',
        range: '10ft',
        duration: '1hr',
      },
      {
        // TODO: add to attacks
        name: 'Shocking Grasp',
        level: 0,
        castingTime: 'Action',
        range: 'Touch',
        notes: '1d8 Lightning',
      },
      {
        // TODO: add to attacks
        name: 'Sorcerous Burst',
        level: 0,
        castingTime: 'Action',
        range: '120ft',
      },
      {
        name: 'Guidance',
        level: 0,
        castingTime: 'Action',
        range: 'Touch',
      },
      {
        name: 'Thaumaturgy',
        level: 0,
        castingTime: 'Action',
        range: '30ft',
        duration: '1min',
      },
      {
        name: 'Healing Word',
        level: 1,
        castingTime: 'Bonus Action',
        range: '60ft',
        alwaysPrepared: true,
        freeUses: 1,
        notes: '2d4+3 Healing',
      },
      {
        name: 'Aid',
        level: 2,
        castingTime: 'Action',
        range: '30ft',
        alwaysPrepared: true,
      },
      {
        name: 'Alarm',
        level: 1,
        castingTime: '1min',
        range: '30ft',
        ritual: true,
        alwaysPrepared: true,
      },
      {
        name: 'Lesser Restoration',
        level: 2,
        castingTime: 'Bonus Action',
        range: 'Touch',
        alwaysPrepared: true,
      },
      {
        name: 'Protection from Evil & Good',
        level: 1,
        castingTime: 'Action',
        range: 'Touch',
        concentration: true,
        duration: '10min',
        alwaysPrepared: true,
      },
      {
        name: 'Burning Hands',
        level: 1,
        castingTime: 'Action',
        range: '15ft cone',
      },
      {
        name: 'Detect Magic',
        level: 1,
        castingTime: 'Action',
        range: 'Self',
        concentration: true,
        ritual: true,
      },
      {
        name: 'Shield',
        level: 1,
        castingTime: 'Reaction',
        range: 'Self',
      },
      {
        name: 'Witch Bolt',
        level: 1,
        castingTime: 'Action',
        range: '60ft',
        duration: '1min',
        concentration: true,
      },
      {
        name: 'Mage Armour',
        level: 1,
        castingTime: 'Action',
        range: 'Touch',
        duration: '8hrs',
      },
      {
        name: 'Shatter',
        level: 2,
        castingTime: 'Action',
        range: '60ft',
      },
    ],
  },
};
