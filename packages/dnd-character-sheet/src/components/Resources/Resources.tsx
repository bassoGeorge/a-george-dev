import type { Character } from '../../lib/models/character';
import type { DerivedStats } from '../../lib/models/derived-stats';
import type { Feature } from '../../lib/models/feature';
import { useCharacter } from '../CharacterSheet';

type Resource = NonNullable<Feature['resource']>;

export function Resources() {
  const { character } = useCharacter();
}

function pullAllResourcesFromFeatures(character: Character) {
  return [
    ...character.features,
    ...(character.speciesTraits ?? []),
    ...(character.feats ?? []),
  ]
    .map((feature) => feature.resource)
    .filter(Boolean) as Resource[];
}

function resourceDigester(character: Character, stats: DerivedStats) {
  return function digest(resource: Resource) {
    const base = {
      name: resource.name,
      display: resource.count.display ?? 'dots',
      refresh: resource.refresh,
    };

    const config = resource.count;

    switch (config.kind) {
      case 'character-level': {
        return {
          ...base,
          value: stats.characterLevel * (config.multiplier ?? 1),
        };
      }
      case 'class-level': {
        const cls = character.classes.find((c) => c.class === config.class);
        if (!cls) {
          console.warn(
            `Resource ${resource.name} depends on class ${config.class} which the character doesn't have.`
          );
          return null;
        }
        return {
          ...base,
          value: cls.level * (config.multiplier ?? 1),
        };
      }
      case 'ability': {
        const mod = stats.abilityModifiers[config.ability];
        return {
          ...base,
          value: Math.max(mod * (config.multiplier ?? 1), config.min ?? 0),
        };
      }
    }
  };
}
