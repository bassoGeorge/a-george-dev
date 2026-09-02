import { describe, expect, it } from 'vitest';
import {
  AllMyCharacters,
  AllMyCharactersInBrief,
  getCharacterBySlugAndLevel,
} from './index';

/** Exercised against the real roster rather than a fixture: the registry's whole
 * job is to index the actual character data, and a fixture would not catch a
 * character whose name produces a colliding or malformed slug. */
const slugs = Object.keys(AllMyCharacters);

describe('slug derivation', () => {
  it('indexes every character under a slug', () => {
    expect(slugs.length).toBeGreaterThan(0);
  });

  it('derives each slug from the character name, lowercased and hyphenated', () => {
    for (const [slug, packs] of Object.entries(AllMyCharacters)) {
      const expected = packs[0].brief.name.toLowerCase().replace(/\W+/g, '-');
      expect(slug).toBe(expected);
    }
  });

  it('produces url-safe slugs', () => {
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('groups every entry sharing a slug together', () => {
    for (const [slug, packs] of Object.entries(AllMyCharacters)) {
      for (const pack of packs) {
        expect(pack.slug).toBe(slug);
      }
    }
  });
});

describe('getCharacterBySlugAndLevel', () => {
  it('returns the character registered under a slug', () => {
    const slug = slugs[0];
    const pack = getCharacterBySlugAndLevel(slug);

    expect(pack.slug).toBe(slug);
    expect(pack.data).toBeDefined();
  });

  it('defaults to the first entry when no level is given', () => {
    for (const [slug, packs] of Object.entries(AllMyCharacters)) {
      expect(getCharacterBySlugAndLevel(slug)).toBe(packs[0]);
    }
  });

  it('returns the entry matching the requested level', () => {
    for (const [slug, packs] of Object.entries(AllMyCharacters)) {
      for (const pack of packs) {
        expect(getCharacterBySlugAndLevel(slug, pack.brief.level)).toBe(pack);
      }
    }
  });

  it('picks the right entry for a character that exists at several levels', () => {
    const multiLevel = Object.entries(AllMyCharacters).find(
      ([, packs]) => packs.length > 1
    );
    // The roster is expected to carry at least one levelled-up character
    expect(multiLevel).toBeDefined();

    const [slug, packs] = multiLevel as [
      string,
      (typeof AllMyCharacters)[string],
    ];
    for (const pack of packs) {
      const found = getCharacterBySlugAndLevel(slug, pack.brief.level);
      expect(found.brief.level).toBe(pack.brief.level);
    }
  });

  describe('failure cases', () => {
    it('throws for an unknown slug, naming it', () => {
      expect(() => getCharacterBySlugAndLevel('not-a-character')).toThrow(
        'No character found with slug "not-a-character"'
      );
    });

    it('throws for a known slug at a level that does not exist', () => {
      const slug = slugs[0];

      expect(() => getCharacterBySlugAndLevel(slug, 99)).toThrow(
        `No character found with slug "${slug}" and level 99`
      );
    });

    it('treats level 0 as "no level given" rather than an unknown level', () => {
      // The implementation guards on truthiness; there is no level 0 in D&D
      const slug = slugs[0];

      expect(getCharacterBySlugAndLevel(slug, 0)).toBe(
        AllMyCharacters[slug][0]
      );
    });
  });
});

describe('AllMyCharactersInBrief', () => {
  it('covers the same slugs as the full roster', () => {
    expect(Object.keys(AllMyCharactersInBrief).sort()).toEqual(slugs.sort());
  });

  it('strips the full character data, keeping the brief', () => {
    for (const packs of Object.values(AllMyCharactersInBrief)) {
      for (const pack of packs) {
        expect(pack).not.toHaveProperty('data');
        expect(pack.brief).toBeDefined();
        expect(pack.slug).toBeDefined();
      }
    }
  });

  it('keeps assets and visual adjustments available to the roster view', () => {
    const withAssets = Object.values(AllMyCharactersInBrief)
      .flat()
      .find((pack) => pack.assets?.length);

    expect(withAssets?.assets?.[0]).toMatchObject({
      id: expect.any(String),
      url: expect.any(String),
    });
  });
});
