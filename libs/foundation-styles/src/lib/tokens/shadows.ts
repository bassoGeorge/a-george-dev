import { map } from 'ramda';
import { allTailwindColors } from './colors';

export const Shadows = {
  near: `2px 4px ${allTailwindColors['cc-shadow-near']}`,
  DEFAULT: `4px 8px ${allTailwindColors['cc-shadow-DEFAULT']}`,
  far: `6px 12px ${allTailwindColors['cc-shadow-far']}`,
};

export const DropShadows: typeof Shadows = map(
  (v) => `drop-shadow(${v})`,
  Shadows
);
