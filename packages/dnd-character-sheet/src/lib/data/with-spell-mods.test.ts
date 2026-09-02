import { describe, expect, it } from 'vitest';
import { Ability } from '../models/abilities';
import type { Spell } from '../models/spellcasting';
import { withMaterial, withSpellMods } from './with-spell-mods';

const fireball: Spell = {
  name: 'Fireball',
  level: 3,
  castingTime: 'Action',
  components: { verbal: true, somatic: true },
};

describe('withSpellMods', () => {
  it('adds modifiers without touching the rest of the spell', () => {
    const result = withSpellMods(fireball, { alwaysPrepared: true });

    expect(result).toMatchObject({
      name: 'Fireball',
      level: 3,
      castingTime: 'Action',
      alwaysPrepared: true,
    });
  });

  it('leaves the original spell untouched, so shared data stays reusable', () => {
    withSpellMods(fireball, { alwaysPrepared: true, notes: 'From a scroll' });

    expect(fireball.alwaysPrepared).toBeUndefined();
    expect(fireball.notes).toBeUndefined();
  });

  it('applies every supported modifier', () => {
    const result = withSpellMods(fireball, {
      freeUses: 2,
      alwaysPrepared: true,
      notes: 'Domain spell',
      alternativeAbility: Ability.Wisdom,
    });

    expect(result).toMatchObject({
      freeUses: 2,
      alwaysPrepared: true,
      notes: 'Domain spell',
      alternativeAbility: Ability.Wisdom,
    });
  });

  it('overwrites a modifier the spell already had', () => {
    const prepared: Spell = { ...fireball, alwaysPrepared: true, freeUses: 1 };

    const result = withSpellMods(prepared, {
      alwaysPrepared: false,
      freeUses: 3,
    });

    expect(result.alwaysPrepared).toBe(false);
    expect(result.freeUses).toBe(3);
  });

  it('merges components rather than replacing the whole object', () => {
    const result = withSpellMods(fireball, {
      components: { materialConsumed: true },
    });

    // verbal/somatic came from the spell, materialConsumed from the mods
    expect(result.components).toEqual({
      verbal: true,
      somatic: true,
      materialConsumed: true,
    });
  });

  it('adds components to a spell that declared none', () => {
    const bare: Spell = { name: 'Mage Hand', level: 0 };

    const result = withSpellMods(bare, {
      components: { materialConsumed: true },
    });

    expect(result.components).toEqual({ materialConsumed: true });
  });

  it('returns an equivalent spell when given no modifiers', () => {
    expect(withSpellMods(fireball, {})).toEqual(fireball);
  });
});

describe('withMaterial', () => {
  it('flags the spell as consuming its material component', () => {
    expect(withMaterial(fireball).components?.materialConsumed).toBe(true);
  });

  it('keeps the other components intact', () => {
    expect(withMaterial(fireball).components).toEqual({
      verbal: true,
      somatic: true,
      materialConsumed: true,
    });
  });

  it('leaves the original spell untouched', () => {
    withMaterial(fireball);

    expect(fireball.components?.materialConsumed).toBeUndefined();
  });
});
