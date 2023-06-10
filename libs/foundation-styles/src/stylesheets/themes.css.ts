import { assignVars, globalStyle } from '@vanilla-extract/css';
import { ContextualColors } from '../lib/tokens/contextual-colors';
import { RawColors } from '../lib/tokens/raw-colors';

const lightStyle = {
  vars: assignVars(ContextualColors, {
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
    neutralInverse: {
      100: RawColors.lNeutral['100'],
      200: RawColors.lNeutral['200'],
      300: RawColors.lNeutral['300'],
      400: RawColors.lNeutral['400'],
      500: RawColors.lNeutral['500'],
    },
    shadow: {
      far: RawColors.shadow[2],
      DEFAULT: RawColors.shadow[3],
      near: RawColors.shadow[4],
    },
    line: {
      DEFAULT: RawColors.line.main,
      dark: RawColors.line.main,
    },
  }),
};

const darkStyle = {
  vars: assignVars(ContextualColors, {
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
    neutralInverse: {
      100: RawColors.dNeutral['100'],
      200: RawColors.dNeutral['200'],
      300: RawColors.dNeutral['300'],
      400: RawColors.dNeutral['400'],
      500: RawColors.dNeutral['500'],
    },
    shadow: {
      far: RawColors.shadow[3],
      DEFAULT: RawColors.shadow[4],
      near: RawColors.shadow[5],
    },
    line: {
      DEFAULT: RawColors.line.inverse,
      dark: RawColors.line.main,
    },
  }),
};

globalStyle(':root.light', lightStyle);

globalStyle(':root.dark', darkStyle);

globalStyle(':root', {
  '@media': {
    '(prefers-color-scheme: light)': lightStyle,
    '(prefers-color-scheme: dark)': darkStyle,
  },
});
