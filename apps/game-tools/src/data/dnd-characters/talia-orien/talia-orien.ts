import {
  Ability,
  ArmorProficiency,
  type Character,
  CharacterClass,
  Skill,
} from '@ageorgedev/dnd-character-sheet';
import { CHANNEL_DIVINITY } from '../common';

export const TaliaData: Character = {
  name: "Talia d'Orien",
  species: 'Human',
  background: 'House Orien Heir',
  creatureType: 'Humanoid',
  classes: [
    {
      name: CharacterClass.Cleric,
      level: 5,
      subclass: 'Trickery Domain',
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
  skillProficiencies: [Skill.Acrobatics, Skill.Athletics],
  skillExpertise: [],
  baseArmorClass: 10,
  speed: 35,
  hitPoints: {
    maximum: 20,
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
  equipment: [
    "Bedroll, Backpack, Blanket, Book (philosophy), Lamp, Traveller's clothes, Holy water, Rope, Tinderbox, Herbalism Kit",
    "Healer's Kit (use) = 10",
    'Oil flasks = 3',
    'Chain shirt, Shield, Mace',
    'Holy Symbol (spellcasting focus)',
  ],
  features: [
    {
      name: 'Divine Order: Thaumaturge',
      description:
        '<ol><li>You gain 1 additional cantrip</li><li>Bonus +3 to Arcana & Religion checks (already considered in this sheet)</li></ol>',
      statMod: {
        kind: 'static-skill-additions',
        mods: [
          { skill: Skill.Arcana, modifier: 3 },
          { skill: Skill.Religion, modifier: 3 },
        ],
      },
    },
    CHANNEL_DIVINITY,
    {
      name: 'Divine Spark',
      cost: '1 Channel Divinity',
      castingTime: 'Action',
      description:
        '<em>Choose 1 target in 30ft range</em>. Roll 1d8+3. The target either: Regains Hit points equal to roll OR makes a CON save, taking rolled damage of either Necrotic or Radiant on failure, half as much on success.',
    },
    {
      name: 'Turn & Sear Undead',
      cost: '1 Channel Divinity',
      castingTime: 'Action',
      description: `Each Undead creature of your choice in a 30ft radius makes a Wis. saving throw. On failure: 
        <ul>
        <li>they have Frightened & Incapacitated condition for 1min, and during this time, they try to move away from you each turn. Condition ends early if they take damage, or you get Incapacitated condition, or you die.</li>
        <li>they take <%= abilityModifiers.WIS %>d8 Radiant damage. This does not end the above effect</li>
        </ul>
        `,
    },
    {
      name: 'Blessing of the Trickster',
      castingTime: 'Action',
      description:
        'You can choose yourself or a willing creature within 30ft of you to have Advantage on Stealth checks. This blessing lasts till you finish a Long Rest or you use this feature again.',
    },
    {
      name: 'Invoke Duplicity',
      castingTime: 'Bonus Action',
      cost: '1 Channel Divinity',
      duration: '1 minute',
      description: `
      You can create a perfect visual illusion of yourself in an unoccupied space you can within 30ft of yourself. The illusion is animated and mimics your expressions and gestures. While it persists, you gain the following benefits.
      <ul>
      <li><strong>Cast spells.</strong> You can cast spells as though you were in the illusion's space, but you must still use your own senses</li>
      <li><strong>Distract.</strong> When both you and your illusion are within 5ft of a creature you can see, you have Advantage on attack rolls against that creature.</li>
      <li><strong>Move.</strong> As a Bonus Action, you can move the illusion upto 30ft to an unoccupied space you can see within 120ft of yourself.</li>
      </ul>
      `,
    },
  ],
  speciesTraits: [
    {
      name: 'Resourceful',
      description: 'Gain heroic inspiration on completing a Long Rest',
    },
    {
      name: 'Skillful',
      description: 'You gain proficiency in one skill of your choice - TODO',
    },
  ],
  feats: [
    {
      name: 'Lucky',
      description: `
      You can use Luck Points to either give yourself Advantage on a d20 test, or impose Disadvantage on a creature making an attack roll against you.
       `,
      resource: {
        name: 'Luck Points',
        id: 'luckPoints',
        count: {
          kind: 'proficiency-bonus',
        },
        refresh: {
          kind: 'long-rest',
        },
      },
    },
    {
      name: 'Mark of Passage',
      description: `
      You gain the following benefits
      <ul>
      <li><strong>Courier's Speed.</strong> Your Speed increases by 5ft.</li>
      <li><strong>Intuitive Motion.</strong> When you make an Athletics or Acrobatics check, you can roll 1d4 and add the number rolled to the Ability check.</li>
      <li><strong>Spells</strong> You always have the <em>Misty Step</em> spell prepared with 1 free use per Long Rest. Other mark spells are added to your spell casting list</li>
      </ul>
      `,
    },
    {
      name: 'War Caster',
      description: ` You gain the following benefits
      <ul>
      <li><strong>Concentration.</strong> You have Advantage on Constitution saving throws you make to maintain concentration</li>
      <li><strong>Reactive Spell.</strong> When a creature provokes an Opportunity attack from you for leaving your reach, you can take a Reaction to cast a spell at them. The spell must have a casting time of Action and target only that creature.</li>
      <li><strong>Somatic components.</strong> You can perform the somatic components of a spell even when you have weapons or shield in one or both hands.</li>
      </ul>
      `,
    },
  ],
  armorProficiencies: [
    ArmorProficiency.LightArmor,
    ArmorProficiency.MediumArmor,
    ArmorProficiency.Shield,
  ],
  weaponProficiencies: ['Simple weapons'],
  toolProficiencies: ["Cartographer's Tools"],
  languages: ['Common'],
  appearance: `
  TODO
  `,
  backstory: `
  <p><strong>TODO</strong>: You spent years in seclusion, meditation to bring change within, as the first step in your faith -- <em>Path of Light.</em> The next step, is to bring light into the world, using courage and compassion to banish the darkness in the people around you.</p>
  <p><strong>TODO</strong>: You discuss things with your quori spirit (the dream spirit that's bonded with your bloodline)</p>
  `,
  spellcasting: {
    ability: Ability.Wisdom,
    numberOfCantrips: 5,
    numberOfPreparedSpells: 9,
    spellChangeTrait:
      'You can change prepared spells after a Long Rest. Use the cleric list.',
    slots: {
      1: 4,
      2: 3,
      3: 2,
    },
    spells: [
      {
        name: 'Guidance',
        level: 0,
        range: 'Touch',
        duration: '1min',
        concentration: true,
        notes: '1d4 to checks',
      },
      {
        name: 'Light',
        level: 0,
        range: 'Touch',
        duration: '1hr',
      },
      {
        name: 'Mending',
        level: 0,
        castingTime: '1min',
        range: 'Touch',
      },
      {
        name: 'Word of Radiance',
        level: 0,
        range: '5ft emanation',
        notes: 'Con. save, failure: 2d6 radiant damage',
      },
      {
        name: 'Toll the Dead',
        level: 0,
        range: '60ft',
        notes: 'Wis. save',
      },
      {
        name: 'Misty Step',
        level: 2,
        alwaysPrepared: true,
        freeUses: 1,
        castingTime: 'Bonus Action',
        range: 'Self',
      },
      {
        name: 'Charm Person',
        level: 1,
        alwaysPrepared: true,
        range: '30ft',
        duration: '1hr',
      },
      {
        name: 'Disguise Self',
        level: 1,
        alwaysPrepared: true,
        range: 'Self',
        duration: '1hr',
      },
      {
        name: 'Invisibility',
        level: 2,
        alwaysPrepared: true,
        range: 'Touch',
        duration: '1hr',
        concentration: true,
      },
      {
        name: 'Pass without Trace',
        level: 2,
        alwaysPrepared: true,
        range: 'Self',
        duration: '1hr',
        concentration: true,
      },
      {
        name: 'Hypnotic Pattern',
        level: 3,
        alwaysPrepared: true,
        range: '120ft',
        duration: '1min',
        concentration: true,
      },
      {
        name: 'Nondetection',
        level: 3,
        alwaysPrepared: true,
        range: 'Touch',
        duration: '8hrs',
      },
    ],
  },
};
