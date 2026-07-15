import {
  Ability,
  characterEffect,
  derivedEffect,
  type Feature,
  grantSkillExpertise,
  Skill,
} from '@ageorgedev/dnd-character-sheet';

export const weaponMastery = (count: number): Feature => ({
  name: 'Weapon Mastery',
  description: `You have mastery over ${count} different weapons. You can choose to switch one mastery to a different weapon on finishing a Long Rest`,
});

const listFormatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

export const expertise = (skills: Skill[]): Feature => ({
  name: 'Expertise',
  description: `You gain expertise in ${listFormatter.format(skills)}`,
  effects: skills.map((s) => grantSkillExpertise(s)),
});

// Fighter

export const SECOND_WIND: Feature = {
  name: 'Second Wind',
  castingTime: 'Bonus Action',
  description: 'Regain Hit Points equal to 1d10+<%= level.Fighter %>',
  cost: '1 Second Wind charge',
  resource: {
    id: 'secondWind',
    name: 'Second Wind',
    count: { kind: 'fixed', value: 2 },
    refresh: {
      kind: 'short-and-long-rest',
      numberOfRefreshesOnShortRest: 1,
    },
  },
};

export const TACTICAL_MIND: Feature = {
  name: 'Tactical Mind',
  cost: '1 Second Wind charge',
  description:
    'When you fail an Ability check, you can roll 1d10 and add to the roll. Second Wind charge not spent if check still unsuccessful',
};

export const ACTION_SURGE: Feature = {
  name: 'Action Surge',
  description: 'Take 1 extra Action (except magic)',
  resource: {
    id: 'actionSurge',
    name: 'Action Surge',
    count: { kind: 'fixed', value: 1 },
    refresh: { kind: 'any-rest' },
  },
};

// Battle Master

export const COMBAT_SUPERIORITY: Feature = {
  name: 'Combat Superiority',
  description:
    'You have <%= resources.superiorityDice.count %> Superiority Dice (each a <%= resources.superiorityDice.die %>). You regain all expended dice on a Short or Long Rest. You know manoeuvres from the Battle Master list.',
  resource: {
    id: 'superiorityDice',
    name: 'Superiority Dice',
    count: {
      kind: 'class-level-steps',
      class: 'Fighter',
      steps: { 3: 4, 7: 5, 15: 6 },
    },
    refresh: { kind: 'short-rest' },
    die: {
      kind: 'class-level-steps',
      class: 'Fighter',
      steps: { 3: 'd8', 10: 'd10', 18: 'd12' },
    },
  },
};

// Cleric

export const DIVINE_ORDER_THAUMATURGE: Feature = {
  name: 'Divine Order: Thaumaturge',
  description:
    '<ol><li>You gain 1 additional cantrip</li><li>Bonus +<%= abilityModifiers.WIS %> to Arcana & Religion checks (considered in this sheet)</li></ol>',
  effects: [
    characterEffect((c) => ({
      ...c,
      spellcasting: !c.spellcasting
        ? undefined
        : {
            ...c.spellcasting,
            numberOfCantrips: (c.spellcasting?.numberOfCantrips ?? 0) + 1,
          },
    })),
    derivedEffect(({ stats }) => {
      const mod = stats.abilityModifiers[Ability.Wisdom];
      return {
        ...stats,
        skills: {
          ...stats.skills,
          [Skill.Arcana]: {
            ...stats.skills[Skill.Arcana],
            modifier: stats.skills[Skill.Arcana].modifier + mod,
          },
          [Skill.Religion]: {
            ...stats.skills[Skill.Religion],
            modifier: stats.skills[Skill.Religion].modifier + mod,
          },
        },
      };
    }),
  ],
};

export const CHANNEL_DIVINITY: Feature = {
  name: 'Channel Divinity',
  description:
    'You can channel divine energy directly from the Outer Planes to fuel magical effects.',
  resource: {
    id: 'channelDivinity',
    name: 'Channel Divinity',
    count: {
      kind: 'class-level-steps',
      class: 'Cleric',
      steps: { 2: 2, 6: 3 },
    },
    refresh: {
      kind: 'short-and-long-rest',
      numberOfRefreshesOnShortRest: 1,
    },
  },
};
