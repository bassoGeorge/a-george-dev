import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Ability } from '../../lib/models/abilities';
import type { Character } from '../../lib/models/character';
import { CharacterClass } from '../../lib/models/character-classes';
import type { Spell } from '../../lib/models/spellcasting';
import { CharacterSheet } from '../CharacterSheet';
import { VisualAdjustmentsContext } from '../VisualAdjustmentsContext';
import { SpellList } from './SpellList';

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

function renderSpellList(
  spells: Spell[],
  characterOverrides: Partial<Character> = {}
) {
  const character = makeCharacter({
    ...characterOverrides,
    spellcasting: { ability: Ability.Intelligence, spells },
  });
  return render(
    <CharacterSheet data={character}>
      <VisualAdjustmentsContext.Provider
        value={{ spellRows: spells.length + 2, inventoryRows: 10 }}
      >
        <SpellList />
      </VisualAdjustmentsContext.Provider>
    </CharacterSheet>
  );
}

describe('SpellList', () => {
  describe('sorting', () => {
    it('renders spells sorted ascending by level', () => {
      const spells: Spell[] = [
        { name: 'Fireball', level: 3 },
        { name: 'Magic Missile', level: 1 },
        { name: 'Mage Hand', level: 0 },
      ];
      renderSpellList(spells);

      const rows = screen.getAllByRole('row');
      // row 0 = header, row 1 = first spell, etc.
      expect(rows[1]).toHaveTextContent('Mage Hand');
      expect(rows[2]).toHaveTextContent('Magic Missile');
      expect(rows[3]).toHaveTextContent('Fireball');
    });

    it('alwaysPrepared spell appears before regular spell at the same level', () => {
      const spells: Spell[] = [
        { name: 'Magic Missile', level: 1 },
        { name: 'Shield', level: 1, alwaysPrepared: true },
      ];
      renderSpellList(spells);

      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('Shield');
      expect(rows[2]).toHaveTextContent('Magic Missile');
    });

    it('sorts alphabetically within the same level and prep status', () => {
      const spells: Spell[] = [
        { name: 'Thunderwave', level: 1 },
        { name: 'Burning Hands', level: 1 },
      ];
      renderSpellList(spells);

      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('Burning Hands');
      expect(rows[2]).toHaveTextContent('Thunderwave');
    });
  });

  describe('prep column', () => {
    it('shows "AP" for alwaysPrepared spells', () => {
      renderSpellList([{ name: 'Shield', level: 1, alwaysPrepared: true }]);
      expect(screen.getByText('AP')).toBeInTheDocument();
    });

    it('shows no checkbox and no "AP" for cantrips (level 0)', () => {
      renderSpellList([{ name: 'Firebolt', level: 0 }]);
      expect(screen.queryByText('AP')).not.toBeInTheDocument();
      // CircleCheck renders a span with rounded-full; cantrips render an empty span instead
      expect(document.querySelector('.rounded-full')).toBeNull();
    });
  });

  describe('casting time display', () => {
    it('normalises "action" (any case) to "Action"', () => {
      renderSpellList([{ name: 'Firebolt', level: 0, castingTime: 'action' }]);
      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('normalises "bonus action" (any case) to "Bonus"', () => {
      renderSpellList([
        { name: 'Healing Word', level: 1, castingTime: 'bonus action' },
      ]);
      expect(screen.getByText('Bonus')).toBeInTheDocument();
    });
  });

  describe('alternate ability', () => {
    it('shows short name, to-hit, and DC for spells with alternativeAbility', () => {
      // STR 16 → mod +3, level 1 → profBonus +2 → toHit +5, DC 13
      renderSpellList(
        [
          {
            name: 'Shillelagh',
            level: 0,
            alternativeAbility: Ability.Strength,
          },
        ],
        { abilities: { ...makeCharacter().abilities, [Ability.Strength]: 16 } }
      );
      expect(screen.getByText(/Str\. spell/)).toBeInTheDocument();
      expect(screen.getByText(/\+5 to Hit/)).toBeInTheDocument();
      expect(screen.getByText(/DC 13/)).toBeInTheDocument();
    });
  });
});
