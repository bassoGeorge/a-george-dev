import { describe, expect, it } from 'vitest';
import { CharacterClass } from '../lib/models/character-classes';
import { DndClassColors } from './class-colors';

describe('DndClassColors', () => {
  it.each(
    Object.values(CharacterClass)
  )('maps %s to a complete color way', (characterClass) => {
    const colors = DndClassColors[characterClass];
    expect(colors.text).toEqual(expect.any(String));
    expect(colors.text.length).toBeGreaterThan(0);
    expect(colors.surface).toEqual(expect.any(String));
    expect(colors.surface.length).toBeGreaterThan(0);
    expect(colors.onSurfaceText).toEqual(expect.any(String));
    expect(colors.onSurfaceText.length).toBeGreaterThan(0);
    expect(colors.bgAsText).toEqual(expect.any(String));
    expect(colors.bgAsText.length).toBeGreaterThan(0);
  });
});
