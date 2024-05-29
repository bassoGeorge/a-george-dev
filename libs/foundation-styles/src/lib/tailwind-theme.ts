import { mapKeys } from '@ageorgedev/toolbelt';
import { mapObjIndexed } from 'ramda';
import type { Config } from 'tailwindcss';
import { allTailwindColors } from './tokens/new-colors';
import { Screens } from './tokens/responsive';
import { Shadows } from './tokens/shadows';
import { BorderWidth, Spacing } from './tokens/spacing';

import {
  FontFamily,
  FontSize,
  LetterSpacing,
  LineHeight,
} from './tokens/typography';
import { cssCase } from './utils';

export const TailwindTheme = {
  spacing: Spacing,
  borderWidth: BorderWidth,
  screens: mapObjIndexed(
    (query: string) => ({ raw: query }),
    mapKeys(cssCase, Screens)
  ),
  colors: allTailwindColors,
  fontFamily: {
    sans: FontFamily.body,
    body: FontFamily.body,
    interface: FontFamily.interface,
    heading: FontFamily.heading,
    code: FontFamily.code,
  },
  fontSize: FontSize,
  letterSpacing: LetterSpacing,
  lineHeight: LineHeight,
  boxShadow: {
    ...Shadows,
  },
  dropShadow: {
    ...Shadows,
  },
} satisfies Config['theme'];
