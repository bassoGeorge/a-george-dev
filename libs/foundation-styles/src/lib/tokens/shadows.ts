import { map } from 'ramda';
import { ContextualColors } from './contextual-colors';

export const Shadows = {
  near: `2px 4px ${ContextualColors.shadow.near}`,
  DEFAULT: `4px 8px ${ContextualColors.shadow.DEFAULT}`,
  far: `6px 12px ${ContextualColors.shadow.far}`,
};

export const DropShadows: typeof Shadows = map(
  (v) => `drop-shadow(${v})`,
  Shadows
);
