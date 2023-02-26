import { createGlobalTheme } from '@vanilla-extract/css';
import { ContextualColors } from '../lib/contextual-colors';
import { CoreColors } from '../lib/core-colors';

createGlobalTheme(':root', ContextualColors, {
  page: {
    0: CoreColors.parchment500,
    1: CoreColors.parchment400,
    2: CoreColors.parchment300,
    3: CoreColors.parchment200,
    4: CoreColors.parchment100,
  },
  neutral: {
    100: CoreColors.dNeutral100,
    200: CoreColors.dNeutral200,
    300: CoreColors.dNeutral300,
    400: CoreColors.dNeutral400,
    500: CoreColors.dNeutral500,
  },
});

createGlobalTheme(':root.dark', ContextualColors, {
  page: {
    0: CoreColors.timber500,
    1: CoreColors.timber400,
    2: CoreColors.timber300,
    3: CoreColors.timber200,
    4: CoreColors.timber100,
  },
  neutral: {
    100: CoreColors.lNeutral100,
    200: CoreColors.lNeutral200,
    300: CoreColors.lNeutral300,
    400: CoreColors.lNeutral400,
    500: CoreColors.lNeutral500,
  },
});
