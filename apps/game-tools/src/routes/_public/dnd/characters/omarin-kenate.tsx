import {
  Ability,
  type Character,
  CharacterClass,
  Skill,
  StandardCharacterSheet,
} from '@ageorgedev/dnd-character-sheet';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/dnd/characters/omarin-kenate')({
  component: RouteComponent,
});

function RouteComponent() {
  return <StandardCharacterSheet data={OmarinData} />;
}

const OmarinData: Character = {
  name: 'Omarin Kenate',
  species: 'Drow Elf',
  background: 'Farmer',
  size: 'Medium',
  classes: [
    {
      name: CharacterClass.Monk,
      level: 2,
    },
    {
      name: CharacterClass.Fighter,
      level: 3,
      subclass: 'Battle master',
    },
  ],
  experiencePoints: 0,
  abilities: {
    [Ability.Strength]: 8,
    [Ability.Dexterity]: 17,
    [Ability.Constitution]: 14,
    [Ability.Intelligence]: 12,
    [Ability.Wisdom]: 15,
    [Ability.Charisma]: 8,
  },
  savingThrowProficiencies: [Ability.Strength, Ability.Dexterity],
  skillProficiencies: [
    Skill.Stealth,
    Skill.Nature,
    Skill.AnimalHandling,
    Skill.Insight,
    Skill.Perception,
  ],
  skillExpertise: [],
  armorClass: 15,
  speed: 40,
  hitPoints: {
    maximum: 52,
  },
  attacks: [
    {
      name: 'Shortsword',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [{ dice: '1d6', type: 'Piercing' }],
      masteryProperty: 'Vex',
      notes: 'Light, Finesse',
    },
    {
      name: 'Scimitar',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [{ dice: '1d6', type: 'Slashing' }],
      masteryProperty: 'Nick',
      notes: 'Light, Finesse',
    },
    {
      name: 'Unarmed Stike',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [{ dice: '1d6', type: 'Bludgeoning' }],
    },
    {
      name: 'Daggers (x5)',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [{ dice: '1d4', type: 'Piercing' }],
      masteryProperty: 'Nick',
      notes: 'Light, Finesse, Thrown (range 20/60)',
    },
    {
      name: 'Light Crossbow',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [{ dice: '1d8', type: 'Piercing' }],
      notes: 'Ammo (80/20, Bolt), Loading, 2-handed',
    },
  ],
  equipment: [],
  currency: {
    cp: 0,
    sp: 0,
    ep: 0,
    gp: 0,
    pp: 0,
  },
  armorProficiencies: ['Light armor', 'Medium armor', 'Shields'],
  weaponProficiencies: [
    'Simple',
    'Martial',
    'Monk Weapons (Simple Melee, or Martial weapons with Light property)',
  ],
  toolProficiencies: ["Tinker's Tools", "Carpenter's Tools"],
  languages: [],
  personality: {
    traits: '',
    ideals: '',
    bonds: '',
    flaws: '',
  },
  features: [
    {
      name: 'Martial Arts',
      description:
        'On using only monk weapons, wearing no armor, and holding no shield, you gain the following benefits. 1) Unarmed strikes as Bonus Actions 2) Can use Dex. modifier for attacks and damage rolls; 1d6 instead of normal damage -- for unarmed strikes and Monk weapons',
    },
    {
      name: 'Unarmored Defence + Movement',
      description:
        'When not wearing armor and not holding Shield: AC = 10 + Dex. + Wis. modifiers, Speed + 10',
    },
    {
      name: 'Weapon Mastery',
      description: 'You have mastery over 3 different weapons',
    },
    {
      name: "Monk's Focus",
      description: 'You have 2 Focus Points to fuel monk features',
      resource: {
        name: 'Focus Points',
        count: {
          kind: 'fixed',
          value: 2,
        },
        refresh: {
          kind: 'any-rest',
        },
      },
    },
    {
      name: 'Second Wind',
      duration: 'Bonus Action',
      // TODO: Fighter level
      description: 'Regain Hit Points equal to 1d10+{{level.Fighter}}',
      cost: '1 Second Wind charge',
      resource: {
        name: 'Second Wind',
        count: { kind: 'fixed', value: 2 },
        refresh: {
          kind: 'short-and-long-rest',
          numberOfRefreshesOnShortRest: 1,
        },
      },
    },
    {
      name: 'Tactical Mind',
      cost: '1 Second Wind charge',
      description:
        'When you fail an Ability check, you can roll 1d10 and add to the roll. Second Wind charge not spent if check still unsuccessful',
    },
    {
      name: 'Combat Superiority',
      description:
        'You learn manuevers that are fueled by Superiority Dice. Your Superiority Dice is a D8',
      resource: {
        name: 'Superiority Dice',
        count: { kind: 'fixed', value: 4 },
        refresh: { kind: 'any-rest' },
      },
    },
    {
      name: 'Action Surge',
      description: 'Take 1 extra Action (except magic)',
      resource: {
        name: 'Action Surge',
        count: { kind: 'fixed', value: 1 },
        refresh: { kind: 'any-rest' },
      },
    },
    {
      name: 'Uncanny Metabolism',
      description:
        'On rolling Initiative, regain all expended Focus Points, and regain 1d6+{{level.Monk}} HP',
      resource: {
        name: 'Uncanny Metabolism',
        count: { kind: 'fixed', value: 1 },
        refresh: { kind: 'long-rest' },
      },
    },
  ],
  speciesTraits: [
    {
      name: 'Darkvision',
      description: '120ft',
    },
    {
      name: 'Fey Ancestry',
      description:
        'You have Advantage on saving throws you make to avoid or end the Charmed condition',
    },
    {
      name: 'Keen Sense',
      description: 'Proficiency in Perception skill',
    },
    {
      name: 'Trance',
      description:
        "You don't need sleep and magic can't put you to sleep. You can finish a Long Rest in 4 hourse if you spend that time in a trance like state",
    },
    {
      name: 'Elven Lineage',
      description:
        'You know the Faerie Fire, and Darkness spells. You can cast them once without a spell slot. Refresh on Long Rest. Wisdom is your spell-casting ability for this',
    },
  ],
  feats: [
    {
      name: 'Tough',
      description:
        'Whenever you gain character levels, your Hit Point maximum increases by an additional 2 points',
    },
    {
      name: 'Two-Weapon Fighting',
      description:
        'When making the extra attack of the Light property, you can add the modifier to the damage',
    },
  ],
};
