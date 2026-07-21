import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { bumpAbility } from '../lib/effects/helpers';
import { Ability } from '../lib/models/abilities';
import type { Character } from '../lib/models/character';
import { CharacterClass } from '../lib/models/character-classes';
import { Skill } from '../lib/models/skills';
import { CharacterSheet, useCharacter } from './CharacterSheet';

function makeCharacter(overrides: Partial<Character> = {}): Character {
  return {
    name: 'Test',
    species: 'Human',
    background: 'Soldier',
    classes: [{ name: CharacterClass.Fighter, level: 1 }],
    abilities: {
      [Ability.Strength]: 10,
      [Ability.Dexterity]: 10,
      [Ability.Constitution]: 10,
      [Ability.Intelligence]: 10,
      [Ability.Wisdom]: 10,
      [Ability.Charisma]: 10,
    },
    savingThrowProficiencies: [],
    skillProficiencies: [],
    skillExpertise: [],
    baseArmorClass: 10,
    speed: 30,
    hitPoints: { maximum: 10 },
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

function ContextDisplay() {
  const { derived } = useCharacter();
  return (
    <div>
      <span data-testid="prof-bonus">{derived.proficiencyBonus}</span>
      <span data-testid="str-mod">
        {derived.abilityModifiers[Ability.Strength]}
      </span>
      <span data-testid="athletics">
        {derived.skills[Skill.Athletics].modifier}
      </span>
    </div>
  );
}

function CharacterDisplay() {
  const { character } = useCharacter();
  return (
    <div>
      <span data-testid="str-score">
        {character.abilities[Ability.Strength]}
      </span>
      <span data-testid="feature-description">
        {character.features[0]?.description}
      </span>
    </div>
  );
}

function ResourcesDisplay() {
  const { resources } = useCharacter();
  return (
    <ul>
      {resources.map((r) => (
        <li key={r.id} data-testid={`resource-${r.id}`}>
          {r.count}
        </li>
      ))}
    </ul>
  );
}

describe('CharacterSheet', () => {
  it('provides derived stats to context consumers', () => {
    render(
      <CharacterSheet data={makeCharacter()}>
        <ContextDisplay />
      </CharacterSheet>
    );

    expect(screen.getByTestId('prof-bonus')).toHaveTextContent('2');
    expect(screen.getByTestId('str-mod')).toHaveTextContent('0');
    expect(screen.getByTestId('athletics')).toHaveTextContent('0');
  });

  it('recomputes proficiency bonus based on character level', () => {
    render(
      <CharacterSheet
        data={makeCharacter({
          classes: [{ name: CharacterClass.Fighter, level: 5 }],
        })}
      >
        <ContextDisplay />
      </CharacterSheet>
    );

    expect(screen.getByTestId('prof-bonus')).toHaveTextContent('3');
  });

  it('throws when useCharacter is called outside a CharacterSheet provider', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    function Consumer() {
      useCharacter();
      return null;
    }

    expect(() => render(<Consumer />)).toThrow(
      'useCharacter must be used inside a <CharacterSheet> provider'
    );

    errorSpy.mockRestore();
  });

  it('exposes the effective character (post character-effects), not the raw data', () => {
    render(
      <CharacterSheet
        data={makeCharacter({
          abilities: {
            [Ability.Strength]: 10,
            [Ability.Dexterity]: 10,
            [Ability.Constitution]: 10,
            [Ability.Intelligence]: 10,
            [Ability.Wisdom]: 10,
            [Ability.Charisma]: 10,
          },
          features: [
            {
              name: 'Fighting Style: Dueling',
              description: 'Bumps strength.',
              effects: [bumpAbility(Ability.Strength, 2)],
            },
          ],
        })}
      >
        <CharacterDisplay />
        <ContextDisplay />
      </CharacterSheet>
    );

    // base STR 10 + bumpAbility(2) = 12 -> modifier (12-10)/2 = 1
    expect(screen.getByTestId('str-score')).toHaveTextContent('12');
    expect(screen.getByTestId('str-mod')).toHaveTextContent('1');
  });

  it('enriches feature descriptions with derived stats via EJS templating', () => {
    render(
      <CharacterSheet
        data={makeCharacter({
          classes: [{ name: CharacterClass.Fighter, level: 5 }],
          features: [
            {
              name: 'Second Wind',
              description: 'Regain HP equal to <%= proficiencyBonus %>.',
            },
          ],
        })}
      >
        <CharacterDisplay />
      </CharacterSheet>
    );

    // level 5 -> proficiency bonus 3
    expect(screen.getByTestId('feature-description')).toHaveTextContent(
      'Regain HP equal to 3.'
    );
  });

  it('exposes resources computed from feature resource configs', () => {
    render(
      <CharacterSheet
        data={makeCharacter({
          features: [
            {
              name: 'Second Wind',
              description: 'A short rest resource.',
              resource: {
                id: 'second-wind',
                name: 'Second Wind',
                count: { kind: 'fixed', value: 1 },
                refresh: { kind: 'short-rest' },
              },
            },
          ],
        })}
      >
        <ResourcesDisplay />
      </CharacterSheet>
    );

    expect(screen.getByTestId('resource-second-wind')).toHaveTextContent('1');
  });

  it('recomputes character, derived stats, and resources when the data prop changes', () => {
    const { rerender } = render(
      <CharacterSheet
        data={makeCharacter({
          classes: [{ name: CharacterClass.Fighter, level: 1 }],
        })}
      >
        <ContextDisplay />
      </CharacterSheet>
    );
    expect(screen.getByTestId('prof-bonus')).toHaveTextContent('2');

    rerender(
      <CharacterSheet
        data={makeCharacter({
          classes: [{ name: CharacterClass.Fighter, level: 9 }],
        })}
      >
        <ContextDisplay />
      </CharacterSheet>
    );
    expect(screen.getByTestId('prof-bonus')).toHaveTextContent('4');
  });
});
