import { Spacing } from './lib/spacing';
import { Screens } from './lib/responsive';
import { cssCaseKeys } from './lib/utils';
import { mapObjIndexed } from 'ramda';

export default {
  theme: {
    spacing: Spacing,
    screens: mapObjIndexed((query) => ({ raw: query }), cssCaseKeys(Screens)),
  },
};
