import ejs from 'ejs';
import type { Character } from './models';
import type { DerivedStats } from './models/derived-stats';
import type { Feature } from './models/feature';

export function enrichCharacterData(
  character: Character,
  stats: DerivedStats
): Character {
  const enricher = (str: string) => ejs.render(str, { ...stats });
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
