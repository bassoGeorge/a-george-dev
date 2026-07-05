import {
  type Character,
  getCharacterBrief,
  type VisualAdjustments,
} from '@ageorgedev/dnd-character-sheet';
import { compose, groupBy, map } from 'ramda';
import { ClawData } from './claw/claw';
import { GonvarData } from './gonvar-feathertide/gonvar-feathertide';
import { OmarinData } from './omarin-kenate/omarin-kenate';
import { SaoraData } from './saora-embervale/saora-embervale';
import SaoraSpellBook from './saora-embervale/saora-spellbook.pdf?url';
import { Zoynari2Data } from './zoynari/zoynari-2';
import Zoynari2SpellBook from './zoynari/zoynari-2-spellbook.pdf?url';
import { Zoynari3Data } from './zoynari/zoynari-3';
import Zoynari3SpellBook from './zoynari/zoynari-3-spellbook.pdf?url';

type BasePack = {
  data: Character;
  spellBook?: string;
  visualAdjustments?: VisualAdjustments;
};

type CharacterPack = BasePack & {
  brief: ReturnType<typeof getCharacterBrief>;
  slug: string;
};

const characters: BasePack[] = [
  { data: Zoynari2Data, spellBook: Zoynari2SpellBook },
  { data: Zoynari3Data, spellBook: Zoynari3SpellBook },
  {
    data: SaoraData,
    spellBook: SaoraSpellBook,
    visualAdjustments: { spellRows: 35 },
  },
  { data: GonvarData },
  { data: ClawData },
  { data: OmarinData },
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
