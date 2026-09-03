import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Ability } from '../../lib/models/abilities';
import type { Character } from '../../lib/models/character';
import { CharacterClass } from '../../lib/models/character-classes';
import { CharacterSheet } from '../CharacterSheet';
import {
  DEFAULT_VISUAL_ADUSTMENTS,
  type VisualAdjustments,
  VisualAdjustmentsContext,
} from '../VisualAdjustmentsContext';
import { SpellcastingBlock } from './SpellcastingBlock';

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
    spellcasting: {
      ability: Ability.Intelligence,
      slots: { 1: 2 },
      spells: [{ name: 'Magic Missile', level: 1 }],
    },
    ...overrides,
  };
}

function renderBlock(
  adjustments: VisualAdjustments = {},
  characterOverrides: Partial<Character> = {}
) {
  return render(
    <CharacterSheet data={makeCharacter(characterOverrides)}>
      <VisualAdjustmentsContext.Provider
        value={{ ...DEFAULT_VISUAL_ADUSTMENTS, ...adjustments }}
      >
        <SpellcastingBlock />
      </VisualAdjustmentsContext.Provider>
    </CharacterSheet>
  );
}

/** The table variant renders a real <table>; the grouped variant does not. */
const renderedAsTable = () =>
  screen.queryByRole('table') !== null ||
  screen.queryByRole('region', { name: 'Spell table' }) !== null;

describe('SpellcastingBlock', () => {
  it('always shows the ability and slots panels', () => {
    renderBlock();

    expect(screen.getByText('Spellcasting Ability')).toBeInTheDocument();
    expect(screen.getByText('Spell Slots')).toBeInTheDocument();
  });

  describe('spell list mode', () => {
    it('renders the table list by default', () => {
      renderBlock();

      expect(renderedAsTable()).toBe(true);
    });

    it('renders the table list when the mode is "table"', () => {
      renderBlock({ spellListMode: 'table' });

      expect(renderedAsTable()).toBe(true);
    });

    it('renders the grouped list when the mode is "grouped"', () => {
      renderBlock({ spellListMode: 'grouped' });

      expect(renderedAsTable()).toBe(false);
      // The grouped list buckets under a level heading; the table has no such heading
      expect(
        screen.getByRole('heading', { level: 3, name: 'Level 1' })
      ).toBeInTheDocument();
    });

    it('shows the spells either way', () => {
      renderBlock({ spellListMode: 'grouped' });
      expect(screen.getByText('Magic Missile')).toBeInTheDocument();
    });
  });

  it('omits both panels for a character who cannot cast, keeping the list', () => {
    renderBlock({}, { spellcasting: undefined });

    expect(screen.queryByText('Spellcasting Ability')).not.toBeInTheDocument();
    expect(screen.queryByText('Spell Slots')).not.toBeInTheDocument();
  });
});
