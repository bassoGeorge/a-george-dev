import type { Ability } from './abilities';
import type { Skill } from './skills';

export interface Feature {
  name: string;
  source?: string;
  description: string;

  castingTime?: 'Action' | 'Bonus Action' | 'Reaction';

  // Either it uses a resource
  cost?: Cost;

  // or introduces a new resource
  resource?: {
    name: string;
    count: ResourceCount;
    refresh: Refresh;
  };

  skillMod?:
    | {
        kind: 'static-additions';
        mods: { skill: Skill; modifier: number }[];
      }
    | {
        kind: 'function';
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
      class: string;
      multiplier?: number;
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

type Cost = string;

type Refresh =
  | {
      kind: 'short-rest' | 'long-rest' | 'any-rest';
    }
  | {
      kind: 'short-and-long-rest';
      numberOfRefreshesOnShortRest: number;
    };
