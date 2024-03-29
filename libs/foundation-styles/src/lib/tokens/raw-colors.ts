import { createGlobalThemeContract } from '@vanilla-extract/css';
import { mapObjIndexed } from 'ramda';
import { FOUNDATION_RAW_COLOR_PREFIX } from '../constants';
import { cssVarName } from '../utils';

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
  shadow: {
    1: 'rgb(0 0 0 / .1)',
    2: 'rgb(0 0 0 / .25)',
    3: 'rgb(0 0 0 / .6)',
    4: 'rgb(0 0 0 / .8)',
    5: 'rgb(0 0 0)',
  },
  line: {
    main: 'hsl(189 67% 6%)',
    inverse: 'hsl(83 5% 46%)',
  },
  red: {
    100: 'hsl(360, 82%, 89%)',
    200: 'hsl(360, 71%, 66%)',
    400: 'hsl(360, 67%, 44%)',
    500: 'hsl(360, 92%, 20%)',
  },
};

type RC = typeof RAW_COLORS;

//
//
/**
 * map the RAW_COLORS structure to variable names which can be used by
 * theme contract builder
 * {
 *   timber: {
 *     '100': 'ag-rc-timber-100',
 *     '200': 'ag-rc-timber-200',
 *     ...
 *   },
 *   ...
 * }
 */
const rawColorsVariableNames = mapObjIndexed(
  (set, setName) =>
    mapObjIndexed(
      (value, grade) =>
        cssVarName([FOUNDATION_RAW_COLOR_PREFIX, setName, grade]),
      set
    ),
  RAW_COLORS
) as RC;

/**
 * RC structure against var() declarations
 * {
 *   timber: {
 *     '100': 'var(--ag-rc-timber-100)',
 *     '200': 'var(--ag-rc-timber-200)',
 *     ...
 *   },
 *   ...
 * }
 */
export const RawColors = createGlobalThemeContract(rawColorsVariableNames);
