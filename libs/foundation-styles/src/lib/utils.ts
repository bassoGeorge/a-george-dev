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
  __,
} from 'ramda';
import { paramCase } from 'param-case';

/**
 * Converts a string into param-case / kebab-case
 * Used for generating css class names
 * The paramCase function strips out some extraneous characters, we don't want
 * to do that for our utils, thus we have this wrapper
 */
export const cssCase = (input: string) =>
  paramCase(input, {
    stripRegexp: /(?!)/, // This regex matches absolutely nothing
  });

/**
 * Joins a list of strings into a kebab-cased string used for class names
 * example: ['type', 'headingXl', '', '4'] => 'type-heading-xl-4'
 */
export const joinCssClassParts: (parts: string[]) => string = compose(
  join('-'),
  map(cssCase),
  filter(Boolean)
);

/**
 * Joins a list of strings and creates a css variable name with the foundation prefix
 * example: ['type', 'headingXl', '', '4'] => 'ag-type-heading-xl-4'
 */
export const cssVarName: (parts: string[]) => string = compose(
  joinCssClassParts,
  prepend(FOUNDATION_VAR_PREFIX)
);

/**
 * Gets the core variable name from a var() statement with foundation prefix
 * example: 'var(--ag-cc-something)' => 'cc-something'
 */
const extractTailwindVarKey = (() => {
  const pattern = new RegExp(`^var\\(--${FOUNDATION_VAR_PREFIX}-(.*)\\)`);
  return (varKey: string) => varKey.match(pattern)?.[1] ?? '';
})();

/**
 * Maps from a VE theme object to a tailwind color map
 *
 * For a object {
 *  item: {
 *    variantA: 'var(--ag-<name>)'
 *  },
 *  item2: {
 *    variantB: 'var(--ag-<name2>)'
 *  }
 * }
 *
 * returns {
 *   <name>: 'var(--ag-<name>)'
 *   <name2>: 'var(--ag-<name2>)'
 * }
 */
export const getTailwindPropertyMap = compose(
  fromPairs,
  chain((set: Record<string, string>): (readonly [string, string])[] => {
    return compose(
      map((value: string) => [extractTailwindVarKey(value), value] as const),
      values
    )(set);
  }),
  values
);

/**
 * Given a pixel value, this function gets the rem value of that based on 16
 * as default browser font size
 */
export const toRem = compose((n) => `${n}rem`, divide(__, 16));
