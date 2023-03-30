import { mapObjIndexed, pick } from 'ramda';
import { cssVarName } from '../utils';
import { FOUNDATION_RAW_COLOR_PREFIX } from '../constants';
import { createGlobalThemeContract } from '@vanilla-extract/css';

export const RAW_COLORS = {
  timber: {
    100: 'hsl(191, 17%, 32%)',
    200: 'hsl(190, 18%, 19%)',
    300: 'hsl(189, 31%, 13%)',
    400: 'hsl(188, 47%, 10%)',
    500: 'hsl(189, 67%, 6%)',
  },
  parchment: {
    100: 'hsl(45, 100%, 99%)',
    200: 'hsl(38, 100%, 98%)',
    300: 'hsl(39, 100%, 95%)',
    400: 'hsl(38, 100%, 92%)',
    500: 'hsl(39, 100%, 89%)',
  },
  pAccent: {
    100: 'hsl(83, 50%, 86%)',
    200: 'hsl(83, 33%, 68%)',
    300: 'hsl(83, 27%, 53%)',
    400: 'hsl(83, 33%, 41%)',
    500: 'hsl(83, 49%, 30%)',
  },
  sAccent: {
    100: 'hsl(348, 56%, 96%)',
    200: 'hsl(351, 57%, 88%)',
    300: 'hsl(351, 58%, 81%)',
    400: 'hsl(352, 40%, 64%)',
    500: 'hsl(352, 36%, 48%)',
  },
  dNeutral: {
    100: 'hsl(189 67% 6% / 0.2)',
    200: 'hsl(189 67% 6% / 0.4)',
    300: 'hsl(189 67% 6% / 0.6)',
    400: 'hsl(189 67% 6% / 0.8)',
    500: 'hsl(189 67% 6%)',
  },
  lNeutral: {
    100: 'hsl(45 100% 99% / 0.2)',
    200: 'hsl(45 100% 99% / 0.4)',
    300: 'hsl(45 100% 99% / 0.6)',
    400: 'hsl(45 100% 99% / 0.8)',
    500: 'hsl(45 100% 99%)',
  },
};

type RC = typeof RAW_COLORS;

// map the RAW_COLORS structure to variable names which can be used by
// theme contract builder
const rawColorsVariableNames = mapObjIndexed(
  (set, setName) =>
    mapObjIndexed(
      (value, grade) =>
        cssVarName([FOUNDATION_RAW_COLOR_PREFIX, setName, grade]),
      set
    ),
  RAW_COLORS
) as RC;

/** Used by vanilla extract */
export const RawColors = createGlobalThemeContract(rawColorsVariableNames);
export const AccessibleRawColors = pick(
  ['timber', 'parchment', 'pAccent', 'sAccent'] satisfies (keyof RC)[],
  RawColors
);
