import type { Ability } from './abilities';
import type { Character } from './character';
import type { CharacterClass } from './character-classes';
import type { DerivedStats } from './derived-stats';

export type Effect =
  | { kind: 'character'; mod: (c: Character) => Character }
  | {
      kind: 'derived';
      mod: (args: {
        character: Character;
        stats: DerivedStats;
      }) => DerivedStats;
    };

export interface Feature {
  name: string;
  source?: string;
  description: string;

  castingTime?: 'Action' | 'Bonus Action' | 'Reaction';
  duration?: string;

  // Either it uses a resource
  cost?: Cost;

  // or introduces a new resource
  resource?: {
    id: string;
    name: string;
    count: ResourceCount;
    refresh: Refresh;
    die?: ResourceDie;
  };

  effects?: Effect[];
}

type ResourceCount = {
  display?: 'dots' | 'numeric';
} & (
  | {
      kind: 'character-level';
      multiplier?: number;
    }
  | {
      kind: 'proficiency-bonus';
      multiplier?: number;
    }
  | {
      kind: 'class-level';
      class: CharacterClass;
      multiplier?: number;
    }
  | {
      kind: 'class-level-steps';
      class: CharacterClass;
      steps: Record<number, number>;
    }
  | {
      kind: 'ability';
      ability: Ability;
      min?: number;
      multiplier?: number;
    }
  | {
      kind: 'fixed';
      value: number;
    }
);

type ResourceDie =
  | { kind: 'fixed'; value: string }
  | { kind: 'class-level-steps'; class: string; steps: Record<number, string> };

type Cost = string;

type Refresh =
  | {
      // per-turn: computes like a tracked resource but is intentionally hidden from the Resources panel
      kind: 'short-rest' | 'long-rest' | 'any-rest' | 'per-turn';
    }
  | {
      kind: 'short-and-long-rest';
      numberOfRefreshesOnShortRest: number;
    };
