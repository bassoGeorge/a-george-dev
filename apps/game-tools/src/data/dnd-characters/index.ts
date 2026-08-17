import {
  type Character,
  getCharacterBrief,
  type VisualAdjustments,
} from '@ageorgedev/dnd-character-sheet';
import { compose, groupBy, map, mapObjIndexed } from 'ramda';
import { ClawData } from './claw/claw';
import ClawSpellBook from './claw/claw-spellbook.pdf?url';
import { ElnorinData } from './elnorin-lunarrest/elnorin-lunarrest';
import ElnorinSpellBook from './elnorin-lunarrest/elnorrin-spellbook.pdf?url';
import { GonvarData } from './gonvar-feathertide/gonvar-feathertide';
import { OmarinData } from './omarin-kenate/omarin-kenate';
import { RustyData } from './rusty/rusty';
import RustyMagicPlans from './rusty/rusty-magic-items.pdf';
import RustySpellBook from './rusty/rusty-spellbook.pdf';
import { SaoraData } from './saora-embervale/saora-embervale';
import SaoraSpellBook from './saora-embervale/saora-spellbook.pdf?url';
import { SplitterData } from './splitter/splitter';
import { TaliaData } from './talia-orien/talia-orien';
import { Zoynari2Data } from './zoynari/zoynari-2';
import Zoynari2SpellBook from './zoynari/zoynari-2-spellbook.pdf?url';
import { Zoynari3Data } from './zoynari/zoynari-3';
import Zoynari3SpellBook from './zoynari/zoynari-3-spellbook.pdf?url';

export type CharacterAsset = {
  id: 'spellbook' | 'magicItems' | (string & {});
  label?: string;
  url: string;
};

type BasePack = {
  data: Character;
  assets?: CharacterAsset[];
  visualAdjustments?: VisualAdjustments;
};

type CharacterPack = BasePack & {
  brief: ReturnType<typeof getCharacterBrief>;
  slug: string;
};

const characters: BasePack[] = [
  {
    data: Zoynari2Data,
    assets: [{ id: 'spellbook', url: Zoynari2SpellBook }],
  },
  {
    data: Zoynari3Data,
    assets: [{ id: 'spellbook', url: Zoynari3SpellBook }],
    visualAdjustments: {
      speciesAndFeatsFontSize: 'small',
    },
  },
  {
    data: SaoraData,
    assets: [{ id: 'spellbook', url: SaoraSpellBook }],
  },
  {
    data: ElnorinData,
    assets: [{ id: 'spellbook', url: ElnorinSpellBook }],
  },
  { data: GonvarData },
  {
    data: ClawData,
    assets: [{ id: 'spellbook', url: ClawSpellBook }],
  },
  {
    data: OmarinData,
    visualAdjustments: {
      classFeaturesFontSize: 'small',
      speciesAndFeatsFontSize: 'small',
      speciesAndFeatsCombinedPanel: true,
    },
  },
  {
    data: SplitterData,
    visualAdjustments: {
      speciesAndFeatsFontSize: 'small',
      classFeaturesFontSize: 'small',
    },
  },
  {
    data: TaliaData,
    visualAdjustments: {
      speciesAndFeatsFontSize: 'small',
      classFeaturesFontSize: 'small',
      speciesAndFeatsCombinedPanel: true,
      spellListMode: 'grouped',
    },
  },
  {
    data: RustyData,
    assets: [
      { id: 'spellbook', url: RustySpellBook },
      { id: 'magicItems', url: RustyMagicPlans, label: 'Magic Item Plans' },
    ],
  },
];

const processAndGroup = compose(
  groupBy((c: CharacterPack) => c.slug),
  map((c: BasePack): CharacterPack => {
    const brief = getCharacterBrief(c.data);
    return {
      ...c,
      brief: brief,
      slug: brief.name.toLowerCase().replace(/\W+/g, '-'),
    };
  })
);

export const AllMyCharacters = processAndGroup(characters);
export const AllMyCharactersInBrief = mapObjIndexed(
  (pack) => pack.map(({ data, ...p }) => p),
  AllMyCharacters
);

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
