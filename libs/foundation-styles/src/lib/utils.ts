import { FOUNDATION_VAR_PREFIX } from './constants';
import {
  chain,
  compose,
  concat,
  divide,
  flip,
  fromPairs,
  join,
  map,
  prepend,
  toPairs,
  values,
} from 'ramda';
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

export const extractTailwindVarKey = (varKey: string): string =>
  varKey.match(/^var\(--ag-(.*)\)/)?.[1] ?? '';

export const getTailwindPropertyMap = (
  styles: Record<string, Record<string, string>>
): Record<string, string> => {
  return compose(
    fromPairs,
    chain((set: Record<string, string>): (readonly [string, string])[] => {
      return compose(
        map((value: string) => [extractTailwindVarKey(value), value] as const),
        values
      )(set);
    }),
    values
  )(styles);
};

export const toRem = compose((n) => `${n}rem`, flip(divide)(16));
