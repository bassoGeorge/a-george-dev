import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Ability } from '../../lib/models/abilities';
import type { Character } from '../../lib/models/character';
import { CharacterClass } from '../../lib/models/character-classes';
import { CharacterSheet } from '../CharacterSheet';
import { SpellAbilityPanel } from './SpellAbilityPanel';

function makeCharacter(overrides: Partial<Character> = {}): Character {
  return {
    name: 'Test',
    species: 'Human',
    background: 'Acolyte',
    classes: [{ name: CharacterClass.Wizard, level: 1 }],
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
    hitPoints: { maximum: 8 },
    attacks: [],
    equipment: [],
    features: [],
    armorProficiencies: [],
    weaponProficiencies: [],
    toolProficiencies: [],
    languages: [],
    spellcasting: { ability: Ability.Intelligence, spells: [] },
    ...overrides,
  };
}

function renderPanel(overrides: Partial<Character> = {}) {
  return render(
    <CharacterSheet data={makeCharacter(overrides)}>
      <SpellAbilityPanel />
    </CharacterSheet>
  );
}

/** The value rendered beside a given row label in the two-column grid. */
function valueFor(label: string) {
  return screen.getByText(label).nextElementSibling?.textContent;
}

describe('SpellAbilityPanel', () => {
  it('renders nothing for a character who cannot cast', () => {
    const { container } = renderPanel({ spellcasting: undefined });
    expect(container).toBeEmptyDOMElement();
  });

  it('names the spellcasting ability', () => {
    renderPanel();

    expect(screen.getByText('Intelligence')).toBeInTheDocument();
    expect(screen.getByText('Spellcasting Ability')).toBeInTheDocument();
  });

  it('names a different ability when the class uses one', () => {
    renderPanel({
      classes: [{ name: CharacterClass.Cleric, level: 1 }],
      spellcasting: { ability: Ability.Wisdom, spells: [] },
    });

    expect(screen.getByText('Wisdom')).toBeInTheDocument();
  });

  describe('derived numbers', () => {
    it('shows the modifier for the casting ability, signed', () => {
      // INT 16 → mod +3
      renderPanel({
        abilities: { ...makeCharacter().abilities, [Ability.Intelligence]: 16 },
      });

      expect(valueFor('Spellcasting Modifier')).toBe('+3');
    });

    it('signs a negative modifier', () => {
      // INT 8 → mod -1
      renderPanel({
        abilities: { ...makeCharacter().abilities, [Ability.Intelligence]: 8 },
      });

      expect(valueFor('Spellcasting Modifier')).toBe('-1');
    });

    it('shows the spell save DC', () => {
      // INT 16 → mod +3, level 1 → profBonus +2, DC = 8 + 3 + 2 = 13
      renderPanel({
        abilities: { ...makeCharacter().abilities, [Ability.Intelligence]: 16 },
      });

      expect(valueFor('Spell Save DC')).toBe('13');
    });

    it('shows the spell attack bonus, signed', () => {
      // INT 16 → mod +3, level 1 → profBonus +2 → +5
      renderPanel({
        abilities: { ...makeCharacter().abilities, [Ability.Intelligence]: 16 },
      });

      expect(valueFor('Spell Attack Bonus')).toBe('+5');
    });

    it('tracks the proficiency bonus as the character levels', () => {
      // INT 16 → mod +3, level 5 → profBonus +3 → attack +6, DC 8 + 3 + 3 = 14
      renderPanel({
        classes: [{ name: CharacterClass.Wizard, level: 5 }],
        abilities: { ...makeCharacter().abilities, [Ability.Intelligence]: 16 },
      });

      expect(valueFor('Spell Attack Bonus')).toBe('+6');
      expect(valueFor('Spell Save DC')).toBe('14');
    });
  });
});
