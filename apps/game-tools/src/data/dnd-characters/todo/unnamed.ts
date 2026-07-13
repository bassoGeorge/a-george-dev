import {
  Ability,
  ArmorProficiency,
  type Character,
  CharacterClass,
  Skill,
} from '@ageorgedev/dnd-character-sheet';
import { CHANNEL_DIVINITY } from '../common';

export const UnnamedData: Character = {
  name: 'Unnamed (WIP)',
  species: 'Human',
  background: 'House Orien Heir',
  creatureType: 'Humanoid',
  classes: [
    {
      name: CharacterClass.Cleric,
      level: 5,
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
    {
      name: 'Versatile',
      description: 'You gain an Origin feat of your choice - Lucky',
    },
  ],
  feats: [
    // TODO both
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
      name: 'Lucky',
      description: `
      You can use Luck Points to either give yourself Advantage on a d20 test, or impost disadvantage on a creature making an attack roll against you.
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
    spells: [],
  },
  appearance: `
  Kalashtar are a union of humanity and spirits from the plane of dreams. Often seen as wise, spiritual people. You have symmetric, slightly angular features and your eyes often glow when you are focused or express strong emotions.
  `,
  backstory: `
  <p><strong>Hermit</strong>: You spent years in seclusion, meditation to bring change within, as the first step in your faith -- <em>Path of Light.</em> The next step, is to bring light into the world, using courage and compassion to banish the darkness in the people around you.</p>
  <p><strong>Quirks</strong>: You discuss things with your quori spirit (the dream spirit that's bonded with your bloodline)</p>
  `,
};
