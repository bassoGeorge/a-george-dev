import { AccessibleRawColors } from './raw-colors';
import { Spacing } from './spacing';
import { mapObjIndexed } from 'ramda';
import { Screens } from './responsive';
import { cssCaseKeys, getTailwindPropertyMap } from './utils';
import { ContextualColors } from './contextual-colors';
import type { Config } from 'tailwindcss';

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
    sans: ['Alegreya Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    sc: ['Alegreya Sans SC', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    serif: ['Alegreya', 'ui-serif', 'serif'],
  },
} satisfies Config['theme'];
