import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Ability } from '../../lib/models/abilities';
import type { Character } from '../../lib/models/character';
import { CharacterClass } from '../../lib/models/character-classes';
import { CharacterSheet } from '../CharacterSheet';
import { Resources } from './Resources';

function makeCharacter(overrides: Partial<Character> = {}): Character {
  return {
    name: 'Test',
    species: 'Human',
    background: 'Soldier',
    classes: [{ name: CharacterClass.Rogue, level: 3 }],
    abilities: {
      [Ability.Strength]: 10,
      [Ability.Dexterity]: 16,
      [Ability.Constitution]: 12,
      [Ability.Intelligence]: 10,
      [Ability.Wisdom]: 10,
      [Ability.Charisma]: 10,
    },
    savingThrowProficiencies: [],
    skillProficiencies: [],
    skillExpertise: [],
    baseArmorClass: 13,
    speed: 30,
    hitPoints: { maximum: 20 },
    attacks: [],
    equipment: [],
    features: [],
    armorProficiencies: [],
    weaponProficiencies: [],
    toolProficiencies: [],
    languages: [],
    ...overrides,
  };
}

describe('Resources', () => {
  it('does not render a row for a per-turn resource', () => {
    const character = makeCharacter({
      features: [
        {
          name: 'Sneak Attack',
          description: '',
          resource: {
            id: 'sneakAttack',
            name: 'Sneak Attack',
            count: {
              kind: 'class-level-steps',
              class: 'Rogue',
              steps: { 1: 1, 3: 2, 5: 3 },
            },
            refresh: { kind: 'per-turn' },
            die: { kind: 'fixed', value: 'd6' },
          },
        },
      ],
    });

    render(
      <CharacterSheet data={character}>
        <Resources />
      </CharacterSheet>
    );

    expect(screen.queryByText('Sneak Attack')).toBeNull();
  });

  it('renders a short-rest resource while omitting a per-turn resource', () => {
    const character = makeCharacter({
      features: [
        {
          name: 'Sneak Attack',
          description: '',
          resource: {
            id: 'sneakAttack',
            name: 'Sneak Attack',
            count: {
              kind: 'class-level-steps',
              class: 'Rogue',
              steps: { 1: 1, 3: 2, 5: 3 },
            },
            refresh: { kind: 'per-turn' },
            die: { kind: 'fixed', value: 'd6' },
          },
        },
        {
          name: 'Cunning Strike',
          description: '',
          resource: {
            id: 'cunningStrike',
            name: 'Cunning Strike',
            count: { kind: 'fixed', value: 1 },
            refresh: { kind: 'short-rest' },
          },
        },
      ],
    });

    render(
      <CharacterSheet data={character}>
        <Resources />
      </CharacterSheet>
    );

    expect(screen.queryByText('Sneak Attack')).toBeNull();
    expect(screen.getByText('Cunning Strike')).toBeTruthy();
  });
});
