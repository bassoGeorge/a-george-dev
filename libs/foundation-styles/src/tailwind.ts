import { Spacing } from './lib/spacing';
import { Screens } from './lib/responsive';
import { cssCaseKeys } from './lib/utils';
import { mapObjIndexed } from 'ramda';
import { RawColorsForTailwind } from './lib/raw-colors';
import { ContextualColorsForTailwind } from './lib/contextual-colors';

export default {
  theme: {
    spacing: Spacing,
    screens: mapObjIndexed((query) => ({ raw: query }), cssCaseKeys(Screens)),
    colors: {
      ...RawColorsForTailwind,
      ...ContextualColorsForTailwind,
    },
  },
};
