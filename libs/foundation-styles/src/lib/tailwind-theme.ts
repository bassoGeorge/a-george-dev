import { AccessibleRawColors } from './tokens/raw-colors';
import { Spacing } from './tokens/spacing';
import { mapObjIndexed } from 'ramda';
import { Screens } from './tokens/responsive';
import { cssCaseKeys, getTailwindPropertyMap } from './utils';
import { ContextualColors } from './tokens/contextual-colors';
import type { Config } from 'tailwindcss';
import { FontFamily } from './tokens/typography';

export const TailwindTheme = {
  spacing: Spacing,
  screens: mapObjIndexed(
    (query: string) => ({ raw: query }),
    cssCaseKeys(Screens) as Record<string, string>
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
  },
} satisfies Config['theme'];
