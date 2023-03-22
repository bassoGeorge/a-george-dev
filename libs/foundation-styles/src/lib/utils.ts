import { FOUNDATION_VAR_PREFIX } from './constants';
import {
  chain,
  compose,
  concat,
  divide,
  filter,
  flip,
  fromPairs,
  join,
  map,
  prepend,
  values,
} from 'ramda';
import { paramCase } from 'param-case';

// So param case does strip out some extraneous characters, we don't want
// that behaviour
export const cssCase = (input: string) =>
  paramCase(input, {
    stripRegexp: /(?!)/, // This regex matches absolutely nothing
  });

export const joinCssClassParts = compose(
  join('-'),
  map(cssCase),
  filter(Boolean)
);

export const cssVarName: (parts: string[]) => string = compose(
  joinCssClassParts,
  prepend(FOUNDATION_VAR_PREFIX)
);

export const fullCssVarName: (parts: string[]) => string = compose(
  concat('--'),
  cssVarName
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

// Given a pixel value, this function gets the rem value of that based on 16
// as default browser font size
export const toRem = compose((n) => `${n}rem`, flip(divide)(16));
