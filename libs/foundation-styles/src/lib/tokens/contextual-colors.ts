import { createGlobalThemeContract } from '@vanilla-extract/css';
import { FOUNDATION_CONTEXTUAL_COLOR_PREFIX } from '../constants';
import { cssVarName } from '../utils';

const vName = (baseName: string) => (grade: string | number) =>
  cssVarName([FOUNDATION_CONTEXTUAL_COLOR_PREFIX, baseName, grade + '']);

const pageName = vName('page');
const neutralName = vName('neutral');
const neutralInverseName = vName('neutral-inverse');
const shadowName = vName('shadow');
const lineName = vName('line');
const accentName = vName('accent');
const altAccentName = vName('alt-accent');
const dangerName = vName('danger');

export const ContextualColors = createGlobalThemeContract({
  page: {
    0: pageName(0),
    1: pageName(1),
    2: pageName(2),
    3: pageName(3),
    4: pageName(4),
  },
  neutral: {
    DEFAULT: neutralName(''),
    subtle: neutralName('subtle'),
    subtlest: neutralName('subtlest'),
  },
  neutralInverse: {
    DEFAULT: neutralInverseName(''),
    subtle: neutralInverseName('subtle'),
    subtlest: neutralInverseName('subtlest'),
  },
  shadow: {
    DEFAULT: shadowName(''),
    near: shadowName('near'),
    far: shadowName('far'),
  },
  line: {
    DEFAULT: lineName(''),
    dark: lineName('dark'),
  },
  accent: {
    DEFAULT: accentName(''),
    subtle: accentName('subtle'),
  },
  altAccent: {
    DEFAULT: altAccentName(''),
    subtle: altAccentName('subtle'),
  },
  danger: {
    DEFAULT: dangerName(''),
    bg: dangerName('bg'),
    fg: dangerName('fg'),
  },
});
