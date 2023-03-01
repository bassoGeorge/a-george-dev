import { AccessibleRawColors } from './tokens/raw-colors';
import { Spacing } from './tokens/spacing';
import { mapObjIndexed } from 'ramda';
import { Screens } from './tokens/responsive';
import { cssCaseKeys, getTailwindPropertyMap } from './utils';
import { ContextualColors } from './tokens/contextual-colors';
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
