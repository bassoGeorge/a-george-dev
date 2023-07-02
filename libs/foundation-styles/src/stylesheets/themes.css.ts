import { assignVars, globalStyle } from '@vanilla-extract/css';
import { ContextualColors } from '../lib/tokens/contextual-colors';
import { RawColors } from '../lib/tokens/raw-colors';

const lightStyle = {
  vars: assignVars(ContextualColors, {
    page: {
      0: RawColors.parchment[500],
      1: RawColors.parchment[400],
      2: RawColors.parchment[300],
      3: RawColors.parchment[200],
      4: RawColors.parchment[100],
    },
    neutral: {
      DEFAULT: RawColors.dNeutral[500],
      subtle: RawColors.dNeutral[300],
      subtlest: RawColors.dNeutral[200],
    },
    neutralInverse: {
      DEFAULT: RawColors.lNeutral[500],
      subtle: RawColors.lNeutral[300],
      subtlest: RawColors.lNeutral[200],
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
    accent: {
      DEFAULT: RawColors.pAccent[500],
      subtle: RawColors.pAccent[300],
    },
    altAccent: {
      DEFAULT: RawColors.sAccent[500],
      subtle: RawColors.sAccent[400],
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
      DEFAULT: RawColors.lNeutral[500],
      subtle: RawColors.lNeutral[300],
      subtlest: RawColors.lNeutral[200],
    },
    neutralInverse: {
      DEFAULT: RawColors.dNeutral[500],
      subtle: RawColors.dNeutral[300],
      subtlest: RawColors.dNeutral[200],
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
    accent: {
      DEFAULT: RawColors.pAccent[300],
      subtle: RawColors.pAccent[400],
    },
    altAccent: {
      DEFAULT: RawColors.sAccent[300],
      subtle: RawColors.sAccent[400],
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
