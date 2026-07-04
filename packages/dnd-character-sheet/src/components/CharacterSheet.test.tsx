import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
});
