import type { Ability } from './abilities';

export interface Feature {
  name: string;
  source: string;
  description: string;

  // Either it uses a resource
  cost?: Cost;

  // or introduces a new resource
  resource?: {
    name: string;
    count: ResourceCount;
    refresh: Refresh;
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
      multiplier?: number;
    }
  | {
      kind: 'fixed';
      count: number;
    }
);

type Cost = string;

type Refresh =
  | {
      kind: 'short-rest' | 'long-rest';
    }
  | {
      kind: 'short-and-long-rest';
      numberOfRefreshesOnShortRest: number;
    };
