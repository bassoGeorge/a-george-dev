import {
  Ability,
  type Character,
  Skill,
} from '@ageorgedev/dnd-character-sheet';
import { mapObjIndexed } from 'ramda';
import { expertise } from '../common';

export const SaoraData: Character = {
  name: 'Saora Embervale',
  species: 'Halfling',
  background: 'Charlatan',
  size: 'Small',
  classes: [
    {
      name: 'Bard',
      level: 3,
      subclass: 'College of Lore',
    },
  ],
  abilities: {
    [Ability.Strength]: 8,
    [Ability.Dexterity]: 16,
    [Ability.Constitution]: 12,
    [Ability.Intelligence]: 13,
    [Ability.Wisdom]: 10,
    [Ability.Charisma]: 16,
  },
  savingThrowProficiencies: [Ability.Dexterity, Ability.Charisma],
  skillProficiencies: [
    Skill.Acrobatics,
    Skill.SleightOfHand,
    Skill.Arcana,
    Skill.History,
    Skill.Religion,
    Skill.Insight,
    Skill.Survival,
    Skill.Deception,
    Skill.Performance,
    Skill.Persuasion,
  ],
  skillExpertise: [Skill.Insight, Skill.Deception],
  baseArmorClass: 13,
  speed: 30,
  hitPoints: {
    maximum: 24,
  },
  attacks: [
    {
      name: 'Dagger (x2)',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [{ dice: '1d4', type: 'Piercing' }],
      notes: 'Light, Finesse, Thrown (range 20/60)',
    },
    {
      name: 'Vicious Mockery',
      kind: 'spell-with-save',
      saveAbility: Ability.Wisdom,
      damage: [{ dice: '1d6', type: 'Psychic' }],
      notes:
        'target has disadvantage on next attack roll till end of its next turn',
    },
  ],
  equipment: [
    'Bedroll, Bell, Bullseye Lantern, 2 Costumes, Fine clothes, Mirror, Tinderbox, Waterskin',
    'Flute, Forgery kit, Disguise kit',
    'Oil Flasks = 3',
    'Ration (days) = 2',
    'Leather Armour',
  ],
  armorProficiencies: ['Light Armor'],
  weaponProficiencies: ['Simple weapons'],
  toolProficiencies: [
    'Forgery kit',
    'Disguise kit',
    'Musical instruments - Drum, Flute, Lute',
  ],
  languages: ['Halfling', 'Elvish'],
  appearance:
    'Halflings are small humanoid creatures with strong communities. You may also have some connections with the Boromar clan, the biggest family-run criminal organisation in Sharn and beyond.',
  backstory:
    "<strong>Charlatan.</strong> You have been running petty schemes for a while. Sham potions for wealthy ladies, investment opportunities to drunkards. You probably don't stick around in towns to be found out.",
  features: [
    {
      name: 'Bardic Inspiration',
      castingTime: 'Bonus Action',
      cost: '1 Bardic die',
      description:
        'Inspire another creature you can see within 60ft. They get a bardic die (d6) that they can use in the next hour. On a failed d20 test, they can roll the d6 to add to result. If the check still fails, the die is not spent. A creature can have only 1 bardic die at a time.',
      resource: {
        id: 'bardicDie',
        name: 'Bardic die (d6)',
        count: {
          kind: 'ability',
          ability: Ability.Charisma,
        },
        refresh: {
          kind: 'long-rest',
        },
      },
    },
    expertise('Insight and Deception'),
    {
      name: 'Jack of all trades',
      description:
        'You can add half your Proficiency Bonus, rounded down, to any ability check for a skill you are not proficient in (already considered in this sheet).',
      statMod: {
        kind: 'generic-derived',
        mod: (stats) => {
          const updatedSkills = mapObjIndexed(
            (sk) => ({
              ...sk,
              modifier: sk.quality === 'normal' ? sk.modifier + 1 : sk.modifier,
            }),
            stats.skills
          );
          return { ...stats, skills: updatedSkills };
        },
      },
    },
    {
      name: 'Bonus Proficiencies',
      description:
        'You gain proficiency with three skills of your choice (already considered in this sheet).',
    },
    {
      name: 'Cutting Words',
      castingTime: 'Reaction',
      cost: '1 Bardic die',
      description: `
      <p>You use your wit to supernaturally distract, confuse, and otherwise sap the confidence and competence in others. </p>
      <p>When a creature you can see within 60ft of yourself makes one of the following</p>
      <ol>
      <li>Succeeds an Ability check</li>
      <li>Hits with an Attack roll</li>
      <li>Rolls damage dice</li>
      </ol>
      <p>you can expend one of your Bardic dice and subtract the number rolled from the creature's roll, reducing the damage or potentially failing the check</p>
      `,
    },
  ],
  speciesTraits: [
    {
      name: 'Brave',
      description:
        'You have Advantage on saving throws you make to avoid or end the <em>Frightened</em> condition.',
    },
    {
      name: 'Halfling nimbleness',
      description:
        'You can move through a space of any creature larger than you, but cannot stop in that space.',
    },
    {
      name: 'Luck',
      description:
        'When you roll a 1 on a d20 test, you can reroll the die and must use the new roll.',
    },
    {
      name: 'Naturally stealthy',
      description:
        'You can take the <em>Hide</em> action when you are obscured by a creature larger than you.',
    },
  ],
  feats: [
    {
      name: 'Skilled',
      description:
        'You have additional proficiency in any combination of 3 skills or tools (already considered in this sheet)',
    },
  ],
  spellcasting: {
    ability: Ability.Charisma,
    slots: {
      1: 4,
      2: 2,
    },
    numberOfCantrips: 2,
    numberOfPreparedSpells: 6,
    spells: [
      {
        name: 'Vicious Mockery',
        level: 0,
        castingTime: 'Action',
        range: '60ft',
      },
      {
        name: 'Minor Illusion',
        level: 0,
        castingTime: 'Action',
        range: '30ft',
      },
      {
        name: 'Charm Person',
        level: 1,
        castingTime: 'Action',
        duration: '1hr',
        range: '30ft',
      },
      {
        name: 'Color Spray',
        level: 1,
        castingTime: 'Action',
        range: '15ft cone',
      },
      {
        name: 'Dissonant Whispers',
        level: 1,
        castingTime: 'Action',
        range: '60ft',
      },
      {
        name: 'Healing Word',
        level: 1,
        castingTime: 'Bonus Action',
        range: '60ft',
        notes: '2d4+3 healing',
      },
      {
        name: 'Enlarge / Reduce',
        level: 2,
        castingTime: 'Action',
        range: '30ft',
        concentration: true,
        duration: '1min',
      },
      {
        name: 'Mirror Image',
        level: 2,
        castingTime: 'Action',
        range: 'Self',
        duration: '1min',
      },
    ],
  },
};
