import type { Ability } from './abilities';
import type { CharacterClass } from './character-classes';
import type { DerivedStats } from './derived-stats';
import type { Skill } from './skills';

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

  statMod?:
    | {
        kind: 'static-skill-additions';
        mods: { skill: Skill; modifier: number }[];
      }
    | {
        kind: 'skill-function';
        mod: ({
          skill,
          currentBonus,
          isProficient,
          hasExpertise,
        }: {
          skill: Skill;
          currentBonus: number;
          isProficient: boolean;
          hasExpertise: boolean;
        }) => number;
      }
    | {
        kind: 'generic-derived';
        mod: (stats: DerivedStats) => DerivedStats;
      };
}

type ResourceCount = {
  display?: 'dots' | 'numeric';
} & (
  | {
      kind: 'character-level';
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
