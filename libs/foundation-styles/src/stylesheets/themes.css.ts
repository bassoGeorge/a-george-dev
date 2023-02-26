import { createGlobalTheme } from '@vanilla-extract/css';
import { ContextualColors } from '../lib/contextual-colors';
import { RawColors } from '../lib/raw-colors';

createGlobalTheme(':root', ContextualColors, {
  page: {
    0: RawColors.parchment['500'],
    1: RawColors.parchment['400'],
    2: RawColors.parchment['300'],
    3: RawColors.parchment['200'],
    4: RawColors.parchment['100'],
  },
  neutral: {
    100: RawColors.dNeutral['100'],
    200: RawColors.dNeutral['200'],
    300: RawColors.dNeutral['300'],
    400: RawColors.dNeutral['400'],
    500: RawColors.dNeutral['500'],
  },
});

createGlobalTheme(':root.dark', ContextualColors, {
  page: {
    0: RawColors.timber['500'],
    1: RawColors.timber['400'],
    2: RawColors.timber['300'],
    3: RawColors.timber['200'],
    4: RawColors.timber['100'],
  },
  neutral: {
    100: RawColors.lNeutral['100'],
    200: RawColors.lNeutral['200'],
    300: RawColors.lNeutral['300'],
    400: RawColors.lNeutral['400'],
    500: RawColors.lNeutral['500'],
  },
});
