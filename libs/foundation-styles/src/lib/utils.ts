import { FOUNDATION_VAR_PREFIX } from './constants';
import { compose, concat, fromPairs, join, map, prepend, toPairs } from 'ramda';
import { paramCase } from 'param-case';

export const cssVarName: (parts: string[]) => string = compose(
  join('-'),
  prepend(FOUNDATION_VAR_PREFIX),
  map(paramCase)
);

export const fullCssVarName: (parts: string[]) => string = compose(
  concat('--'),
  cssVarName
);

export const cssCaseKeys = compose(
  fromPairs,
  map(([k, v]) => [paramCase(k), v] as const),
  toPairs
);
