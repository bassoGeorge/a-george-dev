import {
  Ability,
  ArmorProficiency,
  type Character,
  CharacterClass,
  Skill,
  StandardCharacterSheet,
} from '@ageorgedev/dnd-character-sheet';
import { createFileRoute } from '@tanstack/react-router';

const ZoynariData: Character = {
  name: 'Zoynari',
  species: 'Kalashtar',
  background: 'Hermit',
  classes: [
    {
      name: CharacterClass.Cleric,
      subclass: 'Light Domain',
      level: 3,
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
  skillProficiencies: [
    Skill.Arcana,
    Skill.Religion,
    Skill.Insight,
    Skill.Medicine,
    Skill.Persuasion,
  ],
  skillExpertise: [],
  baseArmorClass: 12,
  isWieldingShield: true,
  speed: 30,
  hitPoints: {
    maximum: 28,
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
    {
      name: 'Channel Divinity',
      description:
        'You can channel divine energy directly from the Outer Planes to fuel magical effects.',
      resource: {
        name: 'Channel Divinity',
        count: {
          kind: 'fixed',
          value: 2, // Todo: is based on a class table
        },
        refresh: {
          kind: 'short-and-long-rest',
          numberOfRefreshesOnShortRest: 1,
        },
      },
    },
    {
      name: 'Divine Spark',
      cost: '1 Channel Divinity',
      castingTime: 'Action',
      description:
        '<em>Choose 1 target in 30ft range</em>. Roll 1d8+3. The target either: Regains Hit points equal to roll OR makes a CON save, taking rolled damage of either Necrotic or Radiant on failure, half as much on success.',
    },
    {
      name: 'Turn Undead',
      cost: '1 Channel Divinity',
      castingTime: 'Action',
      description:
        'Each Undead creature of your choice in a 30ft radius makes a Wis. saving throw. On failure, they have Frightened & Incapacitated condition for 1min, and during this time, they try to move away from you each turn. Condition ends early if they take damage, or you get Incapacitated condition, or you die.',
    },
    {
      name: 'Radiance of Dawn',
      cost: '1 Channel Divinity',
      castingTime: 'Action',
      description:
        'Emit light in a 30ft sphere originating at yourself. Dispels any magical darkness. Each creature of your choice in range makes a Con. saving throw, taking 2d10+<%= level.Cleric %> Radiant damage, or half as much on success.',
    },
    {
      name: 'Warding flare',
      castingTime: 'Reaction',
      cost: '1 Warding flare',
      description:
        'When a creature you can see within 30ft of yourself makes an attack roll, you can take a reaction to impose Disadvantage by causing a light to flare.',
      resource: {
        name: 'Warding flare',
        count: {
          kind: 'ability',
          ability: Ability.Wisdom,
        },
        refresh: {
          kind: 'long-rest',
        },
      },
    },
  ],
  speciesTraits: [
    {
      name: 'Dual Mind',
      description: 'Advantage on Wis. & Cha. saving throws.',
    },
    {
      name: 'Mental Discipline',
      description: 'Resistance to Psychic damage.',
    },
    {
      name: 'Mind Link',
      description:
        'You have telepathy within range of <%= level.total * 10 %>ft. When using this trait to speak telepathically to a creature, you can take a Magic action to give that creature the ability to speak telepathically with you for 1hr, or until you take a Magic action to end the effect.',
    },
    {
      name: 'Severed from dreams',
      description:
        "You can't be the target of the <em>Dream</em> spell. Also, <span class='underline'>when you finish a Long Rest, you gain proficiency in one skill of your choice.</span> This proficiency lasts until you finish another Long Rest.",
    },
  ],
  feats: [
    {
      name: 'Healer',
      description: `
      <ol>
        <li><strong>Battle Medic</strong>: Expend 1 use of Healer's Kit to tend to a creature within 5ft (Utilise action). Creature can expend their 1 hit dice that you roll. Creature regains roll + <%= proficiencyBonus %> Hit Points.</li>
        <li><strong>Healing Rerolls</strong>: Whenever you roll a die to determine Hit Points you restore with a spell or the above Battle Medic ability, you can reroll the die if it rolls a 1 and use the new roll.</li>
      </ol>
      `,
    },
  ],
  armorProficiencies: [
    ArmorProficiency.LightArmor,
    ArmorProficiency.MediumArmor,
    ArmorProficiency.Shield,
  ],
  weaponProficiencies: ['Simple weapons'],
  toolProficiencies: ['Herbalism Kit'],
  languages: ['Common', 'Quori'],
  spellcasting: {
    ability: Ability.Wisdom,
    numberOfCantrips: 4,
    numberOfPreparedSpells: 6,
    spellChangeTrait:
      'You can change prepared spells after a Long Rest. Use the cleric list.',
    slots: {
      1: 4,
      2: 2,
    },
    spells: [
      {
        name: 'Guidance',
        level: 0,
        range: 'Touch',
        duration: '1min',
        concentration: true,
      },
      {
        name: 'Sacred Flame',
        level: 0,
        range: '60ft',
        notes: 'Dex. save, 1d8 Radiant',
      },
      {
        name: 'Thaumaturgy',
        level: 0,
        range: '30ft',
      },
      {
        name: 'Toll the Dead',
        level: 0,
        range: '60ft',
        notes: 'Wis. save',
      },
      {
        name: 'Burning Hands',
        level: 1,
        range: 'Self',
        alwaysPrepared: true,
      },
      {
        name: 'Faerie Fire',
        level: 1,
        range: '60ft',
        alwaysPrepared: true,
      },
      {
        name: 'Scorching Ray',
        level: 2,
        range: '120ft',
        alwaysPrepared: true,
      },
      {
        name: 'See Invisibility',
        level: 2,
        range: 'Self',
        alwaysPrepared: true,
      },
      {
        name: 'Bless',
        level: 1,
        range: '30ft',
        concentration: true,
      },
      {
        name: 'Cure Wounds',
        level: 1,
        range: 'Touch',
        notes: '2d8+3 healing',
      },
      {
        name: 'Healing Word',
        level: 1,
        castingTime: 'Bonus Action',
        range: '60ft',
        notes: '2d4+3 healing',
      },
      {
        name: 'Shield of Faith',
        level: 1,
        range: '60ft',
        duration: '10min',
        concentration: true,
      },
      {
        name: 'Guiding Bolt',
        level: 1,
        range: '120ft',
        notes: 'ranged attack, 4d6 Radiant',
      },
      {
        name: 'Locate Object',
        level: 2,
        range: 'Self',
        duration: '10min',
        concentration: true,
      },
    ],
  },
  appearance: `
  Kalashtar are a union of humanity and spirits from the plane of dreams. Often seen as wise, spiritual people. You have symmetric, slightly angular features and your eyes often glow when you are focused or express strong emotions.
  `,
  backstory: `
  <p><strong>Hermit</strong>: You spent years in seclusion, meditation to bring change within, as the first step in your faith -- <em>Path of Light.</em> The next step, is to bring light into the world, using courage and compassion to banish the darkness in the people around you.</p>
  <p><strong>Quirks</strong>: You discuss things with your quori spirit (the dream spirit that's bonded with your bloodline)
  `,
};

export const Route = createFileRoute('/_public/dnd/characters/_sheet/zoynari')({
  component: RouteComponent,
  staticData: {
    character: {
      name: ZoynariData.name,
      level: ZoynariData.classes.reduce((acc, { level }) => acc + level, 0),
      description: 'Kalashtar Cleric of the Light',
    },
  },
});

function RouteComponent() {
  return (
    <StandardCharacterSheet
      data={ZoynariData}
      visualAdjustments={{ inventoryRows: 18 }}
    />
  );
}
