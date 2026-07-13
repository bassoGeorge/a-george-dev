import {
  Ability,
  ArmorProficiency,
  type Character,
  CharacterClass,
  Skill,
  SPELL,
  withSpellMods,
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
    [Ability.Strength]: 8,
    [Ability.Dexterity]: 14,
    [Ability.Constitution]: 14,
    [Ability.Intelligence]: 10,
    [Ability.Wisdom]: 18,
    [Ability.Charisma]: 12,
  },
  savingThrowProficiencies: [Ability.Wisdom, Ability.Charisma],
  skillProficiencies: [
    Skill.Insight,
    Skill.Persuasion,
    Skill.Acrobatics,
    Skill.Athletics,
  ],
  skillExpertise: [],
  baseArmorClass: 14,
  isWieldingShield: true,
  speed: 35,
  hitPoints: {
    maximum: 38,
  },
  attacks: [
    {
      name: 'Dagger (x5)',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [
        {
          dice: '1d4',
          type: 'Piercing',
        },
      ],
      notes: 'Light, Thrown (Range 20/60)',
    },
    {
      name: 'Toll the Dead',
      kind: 'spell-with-save',
      saveAbility: Ability.Wisdom,
      damage: [
        {
          dice: '2d8',
          type: 'Necrotic',
        },
      ],
      notes: 'If target is missing any HP, use 2d12 instead',
    },
    {
      name: 'Word of Radiance',
      kind: 'spell-with-save',
      saveAbility: Ability.Constitution,
      damage: [
        {
          dice: '2d6',
          type: 'Radiant',
        },
      ],
      notes: '5-foot emanation',
    },
  ],
  equipment: [
    "Bedroll, Backpack, Blanket, Book (philosophy), Lamp, Traveller's clothes, Holy water, Rope, Tinderbox, Herbalism Kit",
    "Cartographer's Tools",
    "Healer's Kit (use) = 10",
    'Oil flasks = 3',
    'Chain shirt, Shield, Daggers (x4)',
    'Holy Symbol (spellcasting focus)',
  ],
  features: [
    {
      name: 'Divine Order: Thaumaturge',
      description:
        '<ol><li>You gain 1 additional cantrip</li><li>Bonus +4 to Arcana & Religion checks (already considered in this sheet)</li></ol>',
      statMod: {
        kind: 'static-skill-additions', // TODO: really, this is the current modifier
        mods: [
          { skill: Skill.Arcana, modifier: 4 },
          { skill: Skill.Religion, modifier: 4 },
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
  You are a Dragonmarked scion of House Orien. The Mark of Passage is visible somewhere on your body.
  `,
  backstory: `
  <p><strong>House Orien Heir</strong>:
  Before the Last War, Orien's influence covered Khorvaire, and its trade roads and lightning rails were the lifeblood of a vibrant kingdom. But the war cut those arteries, leaving Galifar dead and House Orien bloodied. 
  While the house's couriers and shippers still keep goods moving on both sides of the continent, finding a way to reestablish routes across the Mournland remains the house's top priority.
  In the meantime, Orien adventurers can serve their house by investigating missing couriers, recovering goods stolen from caravans , and trouble-shooting disruptions to the lightning rail.
  </p>
  <p><strong>Cleric of Kol Korran</strong>: You are devoted to the Kol Korran, the Sovereign of World and Wealth, who guards travelers and guides traders.
  </p>
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
      SPELL.Guidance,
      SPELL.Light,
      SPELL.Mending,
      withSpellMods(SPELL.WordOfRadiance, {
        notes: 'Con. save, failure: 2d6 radiant damage',
      }),
      withSpellMods(SPELL.TollTheDead, {
        notes: '(2d8 or 2d12) Necrotic, Wis. save',
      }),
      withSpellMods(SPELL.MistyStep, { alwaysPrepared: true, freeUses: 1 }),
      withSpellMods(SPELL.CharmPerson, { alwaysPrepared: true }),
      withSpellMods(SPELL.DisguiseSelf, { alwaysPrepared: true }),
      withSpellMods(SPELL.Invisibility, { alwaysPrepared: true }),
      withSpellMods(SPELL.PassWithoutTrace, { alwaysPrepared: true }),
      withSpellMods(SPELL.HypnoticPattern, { alwaysPrepared: true }),
      withSpellMods(SPELL.Nondetection, { alwaysPrepared: true }),

      // level 1 spells
      SPELL.Bane,
      SPELL.Bless,
      SPELL.Command,
      SPELL.CreateOrDestroyWater,
      SPELL.CureWounds,
      SPELL.DetectEvilAndGood,
      SPELL.DetectMagic,
      SPELL.DetectPoisonAndDisease,
      SPELL.GuidingBolt,
      SPELL.HealingWord,
      SPELL.InflictWounds,
      SPELL.ProtectionFromEvilAndGood,
      SPELL.PurifyFoodAndDrink,
      SPELL.Sanctuary,
      SPELL.ShieldOfFaith,
      SPELL.ExpeditiousRetreat,
      SPELL.Jump,

      // level 2 spells
      SPELL.Aid,
      SPELL.Augury,
      SPELL.BlindnessDeafness,
      SPELL.CalmEmotions,
      SPELL.ContinualFlame,
      SPELL.EnhanceAbility,
      SPELL.FindTraps,
      SPELL.GentleRepose,
      SPELL.HoldPerson,
      SPELL.LesserRestoration,
      SPELL.LocateObject,
      SPELL.PrayerOfHealing,
      SPELL.ProtectionFromPoison,
      SPELL.Silence,
      SPELL.SpiritualWeapon,
      SPELL.WardingBond,
      SPELL.ZoneOfTruth,
      SPELL.FindSteed,
      SPELL.PassWithoutTrace,

      // level 3 spells,
      SPELL.AnimateDead,
      SPELL.AuraOfVitality,
      SPELL.BeaconOfHope,
      SPELL.BestowCurse,
      SPELL.Clairvoyance,
      SPELL.CreateFoodAndWater,
      SPELL.Daylight,
      SPELL.DispelMagic,
      SPELL.FeignDeath,
      SPELL.GlyphOfWarding,
      SPELL.MagicCircle,
      SPELL.MassHealingWord,
      SPELL.MeldIntoStone,
      SPELL.ProtectionFromEnergy,
      SPELL.RemoveCurse,
      SPELL.Revivify,
      SPELL.Sending,
      SPELL.SpeakWithDead,
      SPELL.SpiritGuardians,
      SPELL.Tongues,
      SPELL.WaterWalk,

      SPELL.Blink,
      SPELL.PhantomSteed,
    ],
  },
};
