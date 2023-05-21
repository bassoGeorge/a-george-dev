import { AccessibleRawColors } from './tokens/raw-colors';
import { Spacing } from './tokens/spacing';
import { mapObjIndexed } from 'ramda';
import { Screens } from './tokens/responsive';
import { cssCase, getTailwindPropertyMap } from './utils';
import { ContextualColors } from './tokens/contextual-colors';
import type { Config } from 'tailwindcss';
import {
  FontFamily,
  FontSize,
  LetterSpacing,
  LineHeight,
} from './tokens/typography';
import { mapKeys } from '@ageorgedev/toolbelt';

export const TailwindTheme = {
  spacing: Spacing,
  screens: mapObjIndexed(
    (query: string) => ({ raw: query }),
    mapKeys(cssCase, Screens)
  ),
  colors: {
    ...getTailwindPropertyMap(AccessibleRawColors),
    ...getTailwindPropertyMap(ContextualColors),
  },
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
} satisfies Config['theme'];
