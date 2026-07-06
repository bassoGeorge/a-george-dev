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
      notes: 'Heavy, 2-handed',
    },
    {
      name: 'Handaxe (x4)',
      kind: 'weapon',
      ability: Ability.Strength,
      damage: [{ dice: '1d6', type: 'Slashing' }],
      masteryProperty: 'Vex',
      notes: 'Light, Thrown (range 20/60)',
    },
  ],
  equipment: [],
  toolProficiencies: [],
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
    Rage can last upto 10 mins.
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
  ],
};
