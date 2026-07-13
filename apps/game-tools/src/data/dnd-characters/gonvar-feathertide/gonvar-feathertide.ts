import {
  Ability,
  type Character,
  Skill,
} from '@ageorgedev/dnd-character-sheet';
import {
  ACTION_SURGE,
  ALERT,
  COMBAT_SUPERIORITY,
  SAVAGE_ATTACKER,
  SECOND_WIND,
  TACTICAL_MIND,
  weaponMastery,
} from '../common';

export const GonvarData: Character = {
  name: 'Gonvar Feathertide',
  species: 'Human',
  background: 'Guard',
  classes: [
    {
      name: 'Fighter',
      level: 3,
      subclass: 'Battle Master',
    },
  ],
  abilities: {
    [Ability.Strength]: 16,
    [Ability.Dexterity]: 14,
    [Ability.Constitution]: 13,
    [Ability.Intelligence]: 8,
    [Ability.Wisdom]: 12,
    [Ability.Charisma]: 12,
  },
  savingThrowProficiencies: [Ability.Strength, Ability.Constitution],
  skillProficiencies: [
    Skill.Athletics,
    Skill.Acrobatics,
    Skill.History,
    Skill.Perception,
    Skill.Survival,
    Skill.Intimidation,
  ],
  skillExpertise: [],
  baseArmorClass: 14,
  speed: 30,
  hitPoints: {
    maximum: 29,
  },
  attacks: [
    {
      ability: Ability.Strength,
      kind: 'weapon',
      name: 'Scimitar',
      masteryProperty: 'Nick',
      hasMasteryByDefault: true,
      damage: [{ dice: '1d6', type: 'Slashing' }],
      notes: 'Light, Finesse',
    },
    {
      ability: Ability.Strength,
      kind: 'weapon',
      name: 'Dagger',
      masteryProperty: 'Nick',
      damage: [{ dice: '1d4', type: 'Piercing' }],
      notes: 'Light, Finesse, Thrown (range 20/60)',
    },
    {
      ability: Ability.Strength,
      kind: 'weapon',
      name: 'Pike',
      masteryProperty: 'Push',
      hasMasteryByDefault: true,
      damage: [{ dice: '1d10', type: 'Piercing' }],
      notes: '2-handed, Heavy, Reach (+5ft melee)',
    },
    {
      ability: Ability.Dexterity,
      kind: 'weapon',
      name: 'Crossbow',
      masteryProperty: 'Slow',
      hasMasteryByDefault: true,
      damage: [{ dice: '1d8', type: 'Piercing' }],
      notes: 'Ammo (bolt; 80/320), Loading, 2-handed',
    },
  ],
  equipment: [
    "Backpack, Bedroll, Tinderbox, Water skin, Traveler's cloak, Manacles, Hooded lantern, Rope, Playing cards",
    "Woodcarver's tools",
    'Rations (days) = 5',
    'Oil flasks = 2',
    'Torches = 5',
    'Crossbow bolts = 20',
    'Studded Leather Armour',
  ],
  armorProficiencies: ['Heavy Armor', 'Light Armor', 'Medium Armor', 'Shield'],
  weaponProficiencies: ['Simple and Martial weapons'],
  toolProficiencies: ['Playing Card Set', "Woodcarver's tools"],
  languages: [],
  features: [
    weaponMastery(3),
    {
      name: 'Interception fighting style',
      castingTime: 'Reaction',
      description:
        'When a creature you see hits another creature within 5ft of you with an attack roll, you can take a Reaction to reduce the damage by 1d10 + <%= proficiencyBonus %>. You must be holding a Simple / Melee weapon or Shield to do this.',
    },
    SECOND_WIND,
    TACTICAL_MIND,
    ACTION_SURGE,
    COMBAT_SUPERIORITY,
    {
      name: 'Commanding Presence',
      cost: '1 Superiority die',
      description:
        'When you make an Intimidation, Persuasion or Performance check, you can expend 1 Superiority die and add the result to the roll',
    },
    {
      name: 'Bait and Switch',
      cost: '1 Superiority die',
      description:
        'On your turn, within 5ft of a willing creature, you can spend a Superiority die + 5ft of movement to switch places with them. Until the start of your next turn, you OR that creature has additional AC equal to the superiority die roll',
    },
    {
      name: 'Trip Attack',
      cost: '1 Superiority die',
      description:
        'On hitting a creature with a weapon or unarmed strike, expend a Superiority die and add it to the damage. If the target is <em>Large</em> or smaller, it must succeed on a Str. saving throw (DC <%= abilitySaveDCs.STR %>) or falls <em>Prone</em>',
    },
  ],
  speciesTraits: [
    {
      name: 'Resourceful',
      description: 'Gain heroic inspiration on completing a Long Rest',
    },
  ],
  feats: [ALERT, SAVAGE_ATTACKER],
  appearance:
    'Humans are numerous and resourceful. Spread throughout the Five Nations of Khorvaire',
  backstory:
    'You have spent years guarding settlements or supply lines. Being watchful of the dangers, not just from outside, but from within as well',
};
