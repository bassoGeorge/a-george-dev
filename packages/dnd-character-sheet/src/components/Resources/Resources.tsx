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
    <Panel topLeftCorner="scooped" topRightCorner="scooped">
      <PanelTitle>Resources</PanelTitle>
      <div className="columns-2 gap-4 mt-2">
        {resources.map((r) => (
          <div key={r.name} className="flex items-center text-sm gap-1">
            <span className="font-bold">{r.name}</span>
            <em className="text-neutral-subdued text-xs">{r.refresh}</em>
            <div className="flex-1 border-b border-dotted border-neutral-subdued"></div>
            {r.display === 'dots' ? (
              Array.from({ length: r.value }, (_, i) => <CircleCheck key={i} />)
            ) : (
              <>
                <div className="self-stretch border-b border-neutral-subdued w-6"></div>
                <span className="text-base">/ {r.value}</span>
              </>
            )}
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
  refresh: string;
};

function resourceDigester(character: Character, stats: DerivedStats) {
  return function digest(resource: Resource): ResourceDisplay | null {
    const base = {
      name: resource.name,
      display: resource.count.display ?? 'dots',
      refresh: `[${getRefreshText(resource.refresh)}]`,
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

function getRefreshText(refresh: Resource['refresh']) {
  switch (refresh.kind) {
    case 'any-rest':
      return 'Any Rest';

    case 'long-rest':
      return 'Long Rest';

    case 'short-rest':
      return 'Short Rest';

    case 'short-and-long-rest':
      return `${refresh.numberOfRefreshesOnShortRest} / Short Rest, all on Long Rest`;
  }
}
