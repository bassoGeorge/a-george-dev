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

export const ContextualColors = createGlobalThemeContract({
  page: {
    0: pageName(0),
    1: pageName(1),
    2: pageName(2),
    3: pageName(3),
    4: pageName(4),
  },
  neutral: {
    100: neutralName(100),
    200: neutralName(200),
    300: neutralName(300),
    400: neutralName(400),
    500: neutralName(500),
  },
  neutralInverse: {
    100: neutralInverseName(100),
    200: neutralInverseName(200),
    300: neutralInverseName(300),
    400: neutralInverseName(400),
    500: neutralInverseName(500),
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
});
