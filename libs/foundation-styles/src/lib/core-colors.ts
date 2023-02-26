import { chain, compose, fromPairs, map, toPairs } from 'ramda';
import { fullCssVarName } from './utils';

const timber = 'timber' as const;
const parchment = 'parchment' as const;
const pAccent = 'pAccent' as const;
const sAccent = 'sAccent' as const;
const dNeutral = 'dNeutral' as const;
const lNeutral = 'lNeutral' as const;

const CORE_COLORS = {
  [timber]: {
    100: 'hsl(191, 17%, 32%)',
    200: 'hsl(190, 18%, 19%)',
    300: 'hsl(189, 31%, 13%)',
    400: 'hsl(188, 47%, 10%)',
    500: 'hsl(189, 67%, 6%)',
  },
  [parchment]: {
    100: 'hsl(45, 100%, 99%)',
    200: 'hsl(38, 100%, 98%)',
    300: 'hsl(39, 100%, 95%)',
    400: 'hsl(38, 100%, 92%)',
    500: 'hsl(39, 100%, 89%)',
  },
  [pAccent]: {
    100: 'hsl(83, 50%, 86%)',
    200: 'hsl(83, 33%, 68%)',
    300: 'hsl(83, 27%, 53%)',
    400: 'hsl(83, 33%, 41%)',
    500: 'hsl(83, 49%, 30%)',
  },
  [sAccent]: {
    100: 'hsl(348, 56%, 96%)',
    200: 'hsl(351, 58%, 81%)',
    300: 'hsl(351, 58%, 81%)',
    400: 'hsl(352, 40%, 64%)',
    500: 'hsl(352, 36%, 48%)',
  },
  [dNeutral]: {
    100: 'hsl(189 67% 6% / 0.2)',
    200: 'hsl(189 67% 6% / 0.4)',
    300: 'hsl(189 67% 6% / 0.6)',
    400: 'hsl(189 67% 6% / 0.8)',
    500: 'hsl(189 67% 6%)',
  },
  [lNeutral]: {
    100: 'hsl(45 100% 99% / 0.2)',
    200: 'hsl(45 100% 99% / 0.4)',
    300: 'hsl(45 100% 99% / 0.6)',
    400: 'hsl(45 100% 99% / 0.8)',
    500: 'hsl(45 100% 99%)',
  },
};

export const midTransform: (colors: {
  [k in string]: Record<string, string>;
}) => Array<{ value: string; cssName: string; name: string }> = compose(
  chain(([colorName, obj]: [string, Record<string, string>]) => {
    return compose(
      map(([grade, color]: [string, string]) => ({
        value: color,
        cssName: fullCssVarName(['color', colorName, grade]),
        name: colorName + grade,
      })),
      toPairs
    )(obj);
  }),
  toPairs
);

const middleTransformedValue = midTransform(CORE_COLORS);

/** Used by Stylesheet */
export const ColorPropertiesMap = fromPairs(
  map(({ value, cssName }) => [cssName, value], middleTransformedValue)
);

/** Used by vanilla extract */
export const CoreColors = fromPairs(
  map(({ name, cssName }) => [name, `var(${cssName})`], middleTransformedValue)
) as CoreColors;

/** Adjusting the types for CoreColors for intellisense */
type C = typeof CORE_COLORS;
type CKtype =
  | `${typeof timber}${keyof C[typeof timber]}`
  | `${typeof parchment}${keyof C[typeof parchment]}`
  | `${typeof pAccent}${keyof C[typeof pAccent]}`
  | `${typeof sAccent}${keyof C[typeof sAccent]}`
  | `${typeof dNeutral}${keyof C[typeof dNeutral]}`
  | `${typeof lNeutral}${keyof C[typeof lNeutral]}`;

type CoreColors = { [k in CKtype]: string };
