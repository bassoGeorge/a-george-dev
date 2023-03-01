import type { Config } from 'tailwindcss';
import { Spacing } from './lib/spacing';
import { Screens } from './lib/responsive';
import { cssCaseKeys } from './lib/utils';
import { mapObjIndexed } from 'ramda';
import { RawColorsForTailwind } from './lib/raw-colors';
import { ContextualColorsForTailwind } from './lib/contextual-colors';

export default {
  theme: {
    spacing: Spacing,
    screens: mapObjIndexed(
      (query: string) => ({ raw: query }),
      cssCaseKeys(Screens) as Record<string, string>
    ),
    colors: {
      ...RawColorsForTailwind,
      ...ContextualColorsForTailwind,
    },
    fontFamily: {
      sans: ['Alegreya Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      sc: ['Alegreya Sans SC', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      serif: ['Alegreya', 'ui-serif', 'serif'],
    },
  },
} satisfies Partial<Config>;
