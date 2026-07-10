import type { Feature } from '@ageorgedev/dnd-character-sheet';

export const weaponMastery = (count: number): Feature => ({
  name: 'Weapon Mastery',
  description: `You have mastery over ${count} different weapons. You can choose to switch one mastery to a different weapon on finishing a Long Rest`,
});

export const expertise = (skills: string): Feature => ({
  name: 'Expertise',
  description: `You gain expertise in ${skills}`,
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

// todo change dice at different levels
export const COMBAT_SUPERIORITY: Feature = {
  name: 'Combat Superiority',
  description:
    'You know manoeuvres that are fueled by Superiority Dice which are d8s',
  resource: {
    id: 'superiorityDice',
    name: 'Superiority Dice (d8)',
    count: { kind: 'fixed', value: 4 },
    refresh: { kind: 'any-rest' },
  },
};

// Cleric

export const channelDivinity = (uses: number): Feature => ({
  name: 'Channel Divinity',
  description:
    'You can channel divine energy directly from the Outer Planes to fuel magical effects.',
  resource: {
    id: 'channelDivinity',
    name: 'Channel Divinity',
    count: { kind: 'fixed', value: uses },
    refresh: {
      kind: 'short-and-long-rest',
      numberOfRefreshesOnShortRest: 1,
    },
  },
});
