import { describe, expect, it } from 'vitest';
import { groupCharactersByLevel } from './group-characters-by-level';

function snapshot(name: string, level: number) {
  return { brief: { name, level } };
}

describe('groupCharactersByLevel', () => {
  it('groups snapshots into ascending, non-empty level sections', () => {
    const groups = groupCharactersByLevel({
      zoynari: [snapshot('Zoynari', 5)],
      claw: [snapshot('Claw', 3)],
      saora: [snapshot('Saora', 2)],
    });

    expect(groups.map((g) => g.level)).toEqual([2, 3, 5]);
  });

  it('renders one card per saved snapshot, not per unique character', () => {
    const groups = groupCharactersByLevel({
      zoynari: [snapshot('Zoynari', 2), snapshot('Zoynari', 3)],
    });

    const level2 = groups.find((g) => g.level === 2);
    const level3 = groups.find((g) => g.level === 3);
    expect(level2?.characters).toHaveLength(1);
    expect(level3?.characters).toHaveLength(1);
    expect(level2?.characters[0].hasMultipleLevels).toBe(true);
    expect(level3?.characters[0].hasMultipleLevels).toBe(true);
  });

  it('flags a single saved snapshot as not having multiple levels', () => {
    const groups = groupCharactersByLevel({
      claw: [snapshot('Claw', 3)],
    });

    expect(groups[0].characters[0].hasMultipleLevels).toBe(false);
  });

  it('sorts characters within a level section alphabetically by name', () => {
    const groups = groupCharactersByLevel({
      zoynari: [snapshot('Zoynari', 3)],
      claw: [snapshot('Claw', 3)],
    });

    expect(groups[0].characters.map((c) => c.brief.name)).toEqual([
      'Claw',
      'Zoynari',
    ]);
  });
});
