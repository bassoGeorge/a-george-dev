import { describe, expect, it } from 'vitest';
import { Ability } from './abilities';
import type { Creature } from './creature';

describe('Creature model', () => {
  it('supports a creature with only a name', () => {
    const creature: Creature = { name: 'Familiar' };

    expect(creature).toEqual({ name: 'Familiar' });
  });

  it('supports partial abilities, flexible notation, and generic details', () => {
    const creature: Creature = {
      name: 'Guard Beast',
      armorClass: '15 (natural armor)',
      speed: '30 ft., Fly 60 ft.',
      challengeRating: '1/2',
      abilities: { [Ability.Wisdom]: 14 },
      details: [{ label: 'Resistances', value: 'Fire' }],
    };

    expect(creature.abilities).toEqual({ [Ability.Wisdom]: 14 });
    expect(creature.details?.[0]).toEqual({
      label: 'Resistances',
      value: 'Fire',
    });
  });
});
