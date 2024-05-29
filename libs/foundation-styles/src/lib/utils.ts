import { paramCase } from 'param-case';
import { __, compose, divide } from 'ramda';

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
 * Given a pixel value, this function gets the rem value of that based on 16
 * as default browser font size
 */
export const toRem = compose((n) => `${n}rem`, divide(__, 16));
