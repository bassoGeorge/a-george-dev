import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Ability } from '../../lib/models/abilities';
import type { Attack } from '../../lib/models/attacks';
import type { Character } from '../../lib/models/character';
import { CharacterClass } from '../../lib/models/character-classes';
import { CharacterSheet } from '../CharacterSheet';
import { AttackList } from './AttackList';

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

function renderAttackList(character: Character) {
  return render(
    <CharacterSheet data={character}>
      <AttackList />
    </CharacterSheet>
  );
}

describe('AttackList', () => {
  it('renders nothing when character has no attacks', () => {
    const { container } = renderAttackList(makeCharacter());
    expect(container.firstChild).toBeNull();
  });

  it('weapon attack: bonus = abilityMod + profBonus + attackBonusMod', () => {
    // STR 16 → mod +3, level 1 → profBonus +2, attackBonusMod +1 → total +6
    const attack: Attack = {
      name: 'Longsword',
      kind: 'weapon',
      ability: Ability.Strength,
      attackBonusMod: 1,
      damage: [{ dice: '1d8', type: 'Slashing' }],
    };
    renderAttackList(
      makeCharacter({
        abilities: { ...makeCharacter().abilities, [Ability.Strength]: 16 },
        attacks: [attack],
      })
    );
    expect(screen.getByText('+6')).toBeInTheDocument();
  });

  it('weapon attack with notProficient: profBonus excluded from bonus', () => {
    // STR 16 → mod +3, notProficient → no profBonus → bonus = +3
    const attack: Attack = {
      name: 'Longsword',
      kind: 'weapon',
      ability: Ability.Strength,
      notProficient: true,
      damage: [{ dice: '1d8', type: 'Slashing' }],
    };
    renderAttackList(
      makeCharacter({
        abilities: { ...makeCharacter().abilities, [Ability.Strength]: 16 },
        attacks: [attack],
      })
    );
    expect(screen.getByText('+3')).toBeInTheDocument();
  });

  it('spell-with-attack: displays derived spellAttackBonus', () => {
    // INT 16 → mod +3, level 1 → profBonus +2 → spellAttackBonus = +5
    const attack: Attack = {
      name: 'Firebolt',
      kind: 'spell-with-attack',
      damage: [{ dice: '1d10', type: 'Fire' }],
    };
    renderAttackList(
      makeCharacter({
        abilities: { ...makeCharacter().abilities, [Ability.Intelligence]: 16 },
        attacks: [attack],
        spellcasting: { ability: Ability.Intelligence, spells: [] },
      })
    );
    expect(screen.getByText('+5')).toBeInTheDocument();
  });

  it('spell-with-save: displays saveAbility short name and DC', () => {
    // INT 16 → mod +3, level 1 → profBonus +2 → spellSaveDC = 8+2+3 = 13
    const attack: Attack = {
      name: 'Thunderwave',
      kind: 'spell-with-save',
      saveAbility: Ability.Constitution,
      damage: [{ dice: '2d8', type: 'Thunder' }],
    };
    renderAttackList(
      makeCharacter({
        abilities: { ...makeCharacter().abilities, [Ability.Intelligence]: 16 },
        attacks: [attack],
        spellcasting: { ability: Ability.Intelligence, spells: [] },
      })
    );
    expect(screen.getByText('Con. save, DC 13')).toBeInTheDocument();
  });

  it('mastery column appears for an eligible class, showing the annotated mastery', () => {
    const attack: Attack = {
      name: 'Rapier',
      kind: 'weapon',
      ability: Ability.Dexterity,
      masteryProperty: 'Vex',
      damage: [{ dice: '1d8', type: 'Piercing' }],
    };
    renderAttackList(makeCharacter({ attacks: [attack] }));
    expect(screen.getByText('Mastery')).toBeInTheDocument();
    expect(screen.getByText('Vex')).toBeInTheDocument();
  });

  it('marks a default mastery with a suggested DiamondCheck', () => {
    const attack: Attack = {
      name: 'Rapier',
      kind: 'weapon',
      ability: Ability.Dexterity,
      masteryProperty: 'Vex',
      hasMasteryByDefault: true,
      damage: [{ dice: '1d8', type: 'Piercing' }],
    };
    renderAttackList(makeCharacter({ attacks: [attack] }));
    // 'suggested' fills the marker with bg-page-2, distinct from the
    // bg-page-4 of an unchecked marker
    expect(screen.getByText('Vex').querySelector('span')).toHaveClass(
      'bg-page-2'
    );
  });

  it('leaves a non-default mastery marker unchecked', () => {
    const attack: Attack = {
      name: 'Rapier',
      kind: 'weapon',
      ability: Ability.Dexterity,
      masteryProperty: 'Vex',
      damage: [{ dice: '1d8', type: 'Piercing' }],
    };
    renderAttackList(makeCharacter({ attacks: [attack] }));
    expect(screen.getByText('Vex').querySelector('span')).toHaveClass(
      'bg-page-4'
    );
  });

  it('mastery column absent for an ineligible class', () => {
    const attack: Attack = {
      name: 'Dagger',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [{ dice: '1d4', type: 'Piercing' }],
    };
    renderAttackList(
      makeCharacter({
        classes: [{ name: CharacterClass.Wizard, level: 1 }],
        attacks: [attack],
      })
    );
    expect(screen.queryByText('Mastery')).not.toBeInTheDocument();
  });

  it('mastery column appears for an eligible class with no annotated attacks, with cells aligned', () => {
    const attack: Attack = {
      name: 'Dagger',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [{ dice: '1d4', type: 'Piercing' }],
    };
    renderAttackList(makeCharacter({ attacks: [attack] }));
    expect(screen.getByText('Mastery')).toBeInTheDocument();

    // 4 headers + Mastery, and every body row (the attack plus the trailing
    // empty row) carries the same cell count as the header row
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);
    for (const row of rows) {
      expect(row.children).toHaveLength(5);
    }
  });

  it('mastery column absent for an ineligible class despite an annotated attack', () => {
    const attack: Attack = {
      name: 'Quarterstaff',
      kind: 'weapon',
      ability: Ability.Strength,
      masteryProperty: 'Slow',
      damage: [{ dice: '1d6', type: 'Bludgeoning' }],
    };
    renderAttackList(
      makeCharacter({
        classes: [{ name: CharacterClass.Wizard, level: 1 }],
        attacks: [attack],
      })
    );
    expect(screen.queryByText('Mastery')).not.toBeInTheDocument();
  });

  it('mastery column appears via the Weapon Master feat on an ineligible class', () => {
    const attack: Attack = {
      name: 'Dagger',
      kind: 'weapon',
      ability: Ability.Dexterity,
      damage: [{ dice: '1d4', type: 'Piercing' }],
    };
    renderAttackList(
      makeCharacter({
        classes: [{ name: CharacterClass.Wizard, level: 1 }],
        feats: [{ name: 'Weapon Master', description: 'Mastery' }],
        attacks: [attack],
      })
    );
    expect(screen.getByText('Mastery')).toBeInTheDocument();
  });

  it('damage with disableModifier omits the bonus', () => {
    // STR 16 → mod +3 (damageBonus), disableModifier=true → suffix omitted
    const attack: Attack = {
      name: 'Sneak Attack',
      kind: 'weapon',
      ability: Ability.Strength,
      damage: [{ dice: '2d6', type: 'Piercing', disableModifier: true }],
    };
    renderAttackList(
      makeCharacter({
        abilities: { ...makeCharacter().abilities, [Ability.Strength]: 16 },
        attacks: [attack],
      })
    );
    expect(screen.getByText('2d6 Piercing')).toBeInTheDocument();
    expect(screen.queryByText(/\+3/)).not.toBeInTheDocument();
  });
});
