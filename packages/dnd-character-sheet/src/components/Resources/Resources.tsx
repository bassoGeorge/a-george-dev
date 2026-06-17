// biome-ignore-all lint/suspicious/noArrayIndexKey: Not important
import { useMemo } from 'react';
import type { Character } from '../../lib/models/character';
import type { DerivedStats } from '../../lib/models/derived-stats';
import type { Feature } from '../../lib/models/feature';
import { useCharacter } from '../CharacterSheet';
import { CircleCheck } from '../layout/checkables';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

type Resource = NonNullable<Feature['resource']>;

export function Resources() {
  const { character, derived } = useCharacter();
  const resources = useMemo(() => {
    const allResources = pullAllResourcesFromFeatures(character);
    return allResources
      .map(resourceDigester(character, derived))
      .filter(Boolean) as ResourceDisplay[];
  }, [character, derived]);

  if (!resources.length) {
    return null;
  }

  return (
    <Panel>
      <PanelTitle>Resources</PanelTitle>
      <div className="columns-2 gap-3">
        {resources.map((r) => (
          <div key={r.name}>
            <span>{r.name}</span>&nbsp;
            {Array.from({ length: r.value }, (_, i) => (
              <CircleCheck key={i} />
            ))}
          </div>
        ))}
      </div>
    </Panel>
  );
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

type ResourceDisplay = {
  value: number;
  name: string;
  display: 'dots' | 'numeric';
  refresh: Resource['refresh'];
};

function resourceDigester(character: Character, stats: DerivedStats) {
  return function digest(resource: Resource): ResourceDisplay | null {
    const base = {
      name: resource.name,
      display: resource.count.display ?? 'dots',
      refresh: resource.refresh,
    };

    const config = resource.count;

    switch (config.kind) {
      case 'fixed':
        return {
          ...base,
          value: config.value,
        };

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
