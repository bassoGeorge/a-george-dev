import { toRem } from '../utils';
import { map } from 'ramda';
import type { ThemeConfig } from 'tailwindcss/types/config';

//                   xs  sm   .  md  lg  xl 2xl 3xl 4xl 5xl 6xl
//                    0   1   2   3   4   5   6   7   8   9  10
const pxSizeScale = [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72] as const;
const remScale = map(toRem, pxSizeScale);

export const FontFamily = {
  heading: 'Alegreya, ui-serif, serif',
  interface: '"Alegreya Sans SC", ui-sans-serif, system-ui, sans-serif',
  body: '"Alegreya Sans", ui-sans-serif, system-ui, sans-serif',
};

export const LineHeight = {
  none: '1',
  tight: '1.125',
  snug: '1.15',
  normal: '1.2',
  relaxed: '1.25',
  loose: '1.6',
} satisfies ThemeConfig['lineHeight'];

export const LetterSpacing = {
  normal: '0',
  wide: '0.01em',
  wider: '0.02em',
} satisfies ThemeConfig['letterSpacing'];

export const FontSize = {
  '6xl': [remScale[10], '1.05'],
  '5xl': [remScale[9], '1.075'],
  '4xl': [remScale[8], '1.1'],
  '3xl': [remScale[7], LineHeight.tight],
  '2xl': [remScale[6], LineHeight.tight],
  xl: [remScale[5], LineHeight.tight],
  lg: [remScale[4], LineHeight.snug],
  md: [remScale[3], LineHeight.snug],
  base: [remScale[2], LineHeight.normal],
  sm: [
    remScale[1],
    {
      lineHeight: LineHeight.relaxed,
      letterSpacing: LetterSpacing.wide,
    },
  ],
  xs: [
    remScale[0],
    {
      lineHeight: LineHeight.loose,
      letterSpacing: LetterSpacing.wider,
    },
  ],
} satisfies ThemeConfig['fontSize'];
