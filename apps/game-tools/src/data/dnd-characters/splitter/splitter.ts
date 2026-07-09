import {
  Ability,
  type Character,
  Skill,
} from '@ageorgedev/dnd-character-sheet';

export const SplitterData: Character = {
  name: 'Splitter',
  species: 'Warforged',
  background: 'Soldier',
  classes: [
    {
      name: 'Barbarian',
      level: 3,
      subclass: 'Berserker',
    },
  ],
  abilities: {
    [Ability.Strength]: 16,
    [Ability.Dexterity]: 14,
    [Ability.Constitution]: 16,
    [Ability.Intelligence]: 10,
    [Ability.Wisdom]: 10,
    [Ability.Charisma]: 8,
  },
  savingThrowProficiencies: [Ability.Strength, Ability.Constitution],
  skillProficiencies: [
    Skill.Athletics,
    Skill.History,
    Skill.Nature,
    Skill.Perception,
    Skill.Survival,
    Skill.Intimidation,
  ],
  skillExpertise: [],
  armorProficiencies: ['Light Armor', 'Medium Armor', 'Shield'],
  weaponProficiencies: ['Simple weapons', 'Martial weapons'],
  baseArmorClass: 16,
  speed: 30,
  hitPoints: {
    maximum: 39,
  },
  attacks: [
    {
      name: 'Greataxe',
      kind: 'weapon',
      ability: Ability.Strength,
      damage: [{ dice: '1d12', type: 'Slashing' }],
      masteryProperty: 'Graze',
      hasMasteryByDefault: true,
      notes: 'Heavy, 2-handed',
    },
    {
      name: 'Handaxe (x4)',
      kind: 'weapon',
      ability: Ability.Strength,
      damage: [{ dice: '1d6', type: 'Slashing' }],
      masteryProperty: 'Vex',
      hasMasteryByDefault: true,
      notes: 'Light, Thrown (range 20/60)',
    },
  ],
  equipment: [
    'Backpack, Bedroll, Rope, Tinderbox, Dragonchess',
    "Healer's Kit",
    'Oil flasks = 2',
    'Torches = 10',
  ],
  toolProficiencies: ['Gaming Set - DragonChess', "Smith's Tools"],
  languages: [],
  features: [
    {
      name: 'Rage',
      castingTime: 'Bonus Action',
      cost: '1 Rage charge',
      description: `
    If not wearing Heavy Armour, you can imbue yourself with primal power. While active, you have the following effects
    <ol>
    <li><strong>Damage Resistance</strong> against Bludgeoning, Piercing, and Slashing damage.</li>
    <li><strong>Rage Damage.</strong> When making Str. based attacks (weapon or unarmed), you have +2 damage bonus.</li>
    <li>
    <strong>Duration.</strong> The Rage lasts until the end of your next turn. It ends early if you get <em>Incapacitated</em> condition. You can extend the Rage for another round by doing one of the following:
      <ul>
      <li>Make an attack roll against an enemy</li>
      <li>Force an enemy to make a saving throw</li>
      <li>Take a Bonus Action to extend the Rage</li>
      </ul>
    Rage can last up to 10 mins.
    </li>
    </ol>
    `,
      resource: {
        name: 'Rage charge',
        count: {
          kind: 'fixed',
          value: 3,
        },
        refresh: {
          kind: 'short-and-long-rest',
          numberOfRefreshesOnShortRest: 1,
        },
      },
    },
    {
      name: 'Unarmored Defence',
      description:
        "When you aren't wearing any armour, your base AC equals 10+Dex.+Con. You can use a Shield and still get this benefit.",
    },
    {
      name: 'Weapon Mastery',
      description:
        'You have mastery over 2 different weapons. You can choose to switch one mastery to a different weapon on finishing a Long Rest',
    },
    {
      name: 'Danger sense',
      description:
        'You have Advantage on Dex. saving throws unless you are Incapacitated',
    },
    {
      name: 'Primal knowledge',
      description:
        'While Rage is active, you can make the following Ability checks using Str. -- Acrobatics, Intimidation, Perception, Stealth, or Survival',
    },
    {
      name: 'Reckless Attack',
      description:
        'On the first attack roll of a turn, you can choose to go reckless. This gives you Advantage on Str. based attack rolls until the start of your next turn. But, attack rolls against you have Advantage during this time.',
    },
    {
      name: 'Frenzy',
      description:
        'If you do <em>Reckless Attack</em> while Rage is active, you do an extra 2d6 damage to the first target you hit on your turn with a Str. based attack.',
    },
  ],
  speciesTraits: [
    {
      name: 'Construct resilience',
      description:
        'You have Resistance to Poison damage. You also have Advantage on saving throws you make to avoid or end the <em>Poisoned</em> condition.',
    },
    {
      name: 'Integrated Protection',
      description:
        "You have +1 AC (already considered in this sheet). Your armour can't be removed against your will",
    },
    {
      name: "Sentry's Rest",
      description:
        "You don't need to sleep, and magic can't put you to sleep. You can finish a Long Rest in 6hrs if you spend that time inactive and motionless. You appear inert but are still conscious.",
    },
    {
      name: 'Specialised Design',
      description:
        'You gain one skill proficiency and one tool proficiency of your choice (already considered in this sheet)',
    },
    {
      name: 'Tireless',
      description:
        "You don't need to consume water, food, and don't need to breathe",
    },
  ],
  feats: [
    {
      name: 'Savage attacker',
      description:
        "Once per turn, you may roll a weapon's damage dice twice and use either rolls.",
    },
  ],
  appearance:
    'Warforged are mechanical beings built as weapons to fight in the Last War. You comprise a blend of organic and inorganic materials. Rootlike chords infused with alchemical fluids serve as your muscles, wrapped around a framework of steel, darkwood or stone',
  backstory:
    '<strong>Soldier.</strong> War is the only thing you knew since you came into being. Now that the Last War is over, you have somehow made yourself useful. The nation which made you, Cyre, is no more. Where were you when Cyre was destroyed in that magical catastrophe?',
};
