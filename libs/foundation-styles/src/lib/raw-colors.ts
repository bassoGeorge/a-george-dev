import {
  chain,
  compose,
  fromPairs,
  map,
  mapObjIndexed,
  toPairs,
  values,
} from 'ramda';
import { fullCssVarName } from './utils';
import { FOUNDATION_RAW_COLOR_PREFIX } from './constants';

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

/** Adjusting the types for CoreColors for intellisense */
type C = typeof CORE_COLORS;

type NameValue = {
  name: string;
  value: string;
};

type C2 = {
  [k in keyof C]: {
    [k2 in keyof C[k]]: NameValue;
  };
};

export const midTransform: (colors: C) => C2 = compose(
  mapObjIndexed((set, setName) =>
    mapObjIndexed(
      (value, grade) => ({
        name: fullCssVarName([FOUNDATION_RAW_COLOR_PREFIX, setName, grade]),
        value,
      }),
      set
    )
  )
) as (colors: C) => C2;

export const midTransformedColors = midTransform(CORE_COLORS);

/** Used by Stylesheet */
export const ColorPropertiesMap = compose(
  fromPairs,
  chain((set: C2[keyof C2]): (readonly [string, string])[] => {
    return compose(
      map(({ name, value }: NameValue) => [name, value] as const),
      values
    )(set);
  }),
  values
)(midTransformedColors);

/** Used by vanilla extract */
export const RawColors = mapObjIndexed(
  mapObjIndexed(({ name }) => `var(${name})`),
  midTransformedColors
) as C;
