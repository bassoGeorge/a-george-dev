import { globalStyle } from '@vanilla-extract/css';
import { chain, compose, fromPairs, map, toPairs } from 'ramda';
import { CoreColors } from '../lib/core-colors';
import { createCssVarName } from '../lib/utils';

const CORE_COLOR_PREFIX = 'color';

const colorVars = compose(
  fromPairs,
  chain(([colorName, obj]: [string, Record<string, string>]) => {
    return compose(
      map(([grade, color]: [string, string]): [string, string] => [
        createCssVarName([CORE_COLOR_PREFIX, colorName, grade]),
        color,
      ]),
      toPairs
    )(obj);
  }),
  toPairs
)(CoreColors);

globalStyle(':root', {
  vars: colorVars,
});
