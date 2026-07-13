import type { Character } from './models/character';
import type { DerivedStats } from './models/derived-stats';
import type { Feature } from './models/feature';

type Resource = NonNullable<Feature['resource']>;

export type ComputedResource = {
  id: string;
  name: string;
  count: number;
  die?: string;
  display: 'dots' | 'numeric';
  refresh: Resource['refresh'];
};

export function computeResources(
  character: Character,
  stats: DerivedStats
): ComputedResource[] {
  return pullAllResourcesFromFeatures(character)
    .map(resourceDigester(character, stats))
    .filter(Boolean) as ComputedResource[];
}

function pullAllResourcesFromFeatures(character: Character): Resource[] {
  return [
    ...character.features,
    ...(character.speciesTraits ?? []),
    ...(character.feats ?? []),
  ]
    .map((feature) => feature.resource)
    .filter(Boolean) as Resource[];
}

function resolveSteps<T>(steps: Record<number, T>, level: number): T | null {
  const keys = Object.keys(steps)
    .map(Number)
    .sort((a, b) => a - b);
  let resolved: T | null = null;
  for (const key of keys) {
    if (key <= level) {
      resolved = steps[key];
    }
  }
  return resolved;
}

function resourceDigester(character: Character, stats: DerivedStats) {
  return function digest(resource: Resource): ComputedResource | null {
    const base = {
      id: resource.id,
      name: resource.name,
      display: (resource.count.display ?? 'dots') as 'dots' | 'numeric',
      refresh: resource.refresh,
    };

    const config = resource.count;
    let count: number;

    switch (config.kind) {
      case 'fixed':
        count = config.value;
        break;

      case 'character-level':
        count = stats.level.total * (config.multiplier ?? 1);
        break;

      case 'proficiency-bonus':
        count = stats.proficiencyBonus * (config.multiplier ?? 1);
        break;

      case 'class-level': {
        const cls = character.classes.find((c) => c.name === config.class);
        if (!cls) {
          console.warn(
            `Resource ${resource.name} depends on class ${config.class} which the character doesn't have.`
          );
          return null;
        }
        count = cls.level * (config.multiplier ?? 1);
        break;
      }

      case 'class-level-steps': {
        const cls = character.classes.find((c) => c.name === config.class);
        if (!cls) {
          console.warn(
            `Resource ${resource.name} depends on class ${config.class} which the character doesn't have.`
          );
          return null;
        }
        const resolved = resolveSteps(config.steps, cls.level);
        if (resolved === null) {
          console.warn(
            `Resource ${resource.name}: class level ${cls.level} is below the lowest step for class ${config.class}.`
          );
          return null;
        }
        count = resolved;
        break;
      }

      case 'ability': {
        const mod = stats.abilityModifiers[config.ability];
        count = Math.max(mod * (config.multiplier ?? 1), config.min ?? 0);
        break;
      }
    }

    // Resolve die if present
    let die: string | undefined;
    if (resource.die) {
      const dieDef = resource.die;
      if (dieDef.kind === 'fixed') {
        die = dieDef.value;
      } else {
        const cls = character.classes.find((c) => c.name === dieDef.class);
        if (!cls) {
          console.warn(
            `Resource ${resource.name} die depends on class ${dieDef.class} which the character doesn't have.`
          );
          return null;
        }
        const resolved = resolveSteps(dieDef.steps, cls.level);
        if (resolved === null) {
          console.warn(
            `Resource ${resource.name} die: class level ${cls.level} is below the lowest step for class ${dieDef.class}.`
          );
          return null;
        }
        die = resolved;
      }
    }

    return { ...base, count, ...(die !== undefined ? { die } : {}) };
  };
}
