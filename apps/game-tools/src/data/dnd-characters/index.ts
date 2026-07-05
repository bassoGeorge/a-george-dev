import {
  type Character,
  getCharacterBrief,
} from '@ageorgedev/dnd-character-sheet';
import { compose, groupBy, map } from 'ramda';
import { GonvarData } from './gonvar-feathertide/gonvar-feathertide';
import { SaoraData } from './saora-embervale/saora-embervale';
import { Zoynari2Data } from './zoynari/zoynari-2';
import { Zoynari3Data } from './zoynari/zoynari-3';
import Zoynari2SpellBook from './zoynari/zoynari-spellbook-2.pdf?url';

type BasePack = {
  data: Character;
  spellBook?: string;
};

type CharacterPack = BasePack & {
  brief: ReturnType<typeof getCharacterBrief>;
  slug: string;
};

const characters: BasePack[] = [
  { data: Zoynari2Data, spellBook: Zoynari2SpellBook },
  { data: Zoynari3Data },
  { data: SaoraData },
  { data: GonvarData },
];

const processAndGroup = compose(
  groupBy((c: CharacterPack) => c.slug),
  map((c: BasePack): CharacterPack => {
    const brief = getCharacterBrief(c.data);
    return {
      ...c,
      brief: brief,
      slug: brief.name.toLowerCase().replace(/\s+/g, '-'),
    };
  })
);

export const AllMyCharacters = processAndGroup(characters);

export function getCharacterBySlugAndLevel(slug: string, level?: number) {
  const chars = AllMyCharacters[slug];
  if (!chars || chars.length === 0) {
    throw new Error(`No character found with slug "${slug}"`);
  }
  // never gonna have level 0
  if (level) {
    const char = chars.find((c) => c.brief.level === level);
    if (!char) {
      throw new Error(
        `No character found with slug "${slug}" and level ${level}`
      );
    }
    return char;
  } else {
    return chars[0];
  }
}
