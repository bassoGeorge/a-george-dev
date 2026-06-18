import Mustache from 'mustache';
import type { Character } from './models';
import type { DerivedStats } from './models/derived-stats';
import type { Feature } from './models/feature';

export function enrichCharacterData(
  character: Character,
  stats: DerivedStats
): Character {
  const dataValues = {
    level: {
      total: stats.characterLevel,
      ...Object.fromEntries(character.classes.map((c) => [c.name, c.level])),
    },
  };

  const enricher = (str: string) => Mustache.render(str, dataValues);
  const enrichFeature = (f: Feature): Feature => ({
    ...f,
    description: enricher(f.description),
  });

  return {
    ...character,
    feats: character.feats?.map(enrichFeature),
    features: character.features.map(enrichFeature),
    speciesTraits: character.speciesTraits?.map(enrichFeature),
  };
}
