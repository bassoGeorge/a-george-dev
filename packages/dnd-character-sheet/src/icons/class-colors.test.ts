import { describe, expect, it } from 'vitest';
import { CharacterClass } from '../lib/models/character-classes';
import { CLASS_COLORS } from './class-colors';

describe('CLASS_COLORS', () => {
  it.each(
    Object.values(CharacterClass)
  )('maps %s to a defined color class', (characterClass) => {
    expect(CLASS_COLORS[characterClass]).toEqual(expect.any(String));
    expect(CLASS_COLORS[characterClass].length).toBeGreaterThan(0);
  });
});
