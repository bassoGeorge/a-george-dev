import type { HitDiceType } from '../types.js';

export const DEFAULTS = {
  level: 1,
  experiencePoints: 0,
  abilityScore: 10,
  armorClass: 10,
  speed: 30,
  hitDiceType: 'd10' as HitDiceType,
} as const;
