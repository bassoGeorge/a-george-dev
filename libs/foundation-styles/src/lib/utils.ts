import { FOUNDATION_VAR_PREFIX } from './constants';
import { compose, concat, join, map, prepend } from 'ramda';
import { paramCase } from 'param-case';

export const createCssVarName: (parts: string[]) => string = compose(
  join('-'),
  prepend(FOUNDATION_VAR_PREFIX),
  map(paramCase)
);
