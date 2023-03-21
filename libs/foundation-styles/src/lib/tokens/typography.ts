import { toRem } from '../utils';
import { mapObjIndexed, mergeAll, values } from 'ramda';
import { StyleRule } from '@vanilla-extract/css';
import { mapKeys } from '@ageorgedev/toolbelt';

const pxSizeScale = [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72] as const;

export const FontFamily = {
  heading: 'Alegreya, ui-serif, serif',
  interface: '"Alegreya Sans SC", ui-sans-serif, system-ui, sans-serif',
  body: '"Alegreya Sans", ui-sans-serif, system-ui, sans-serif',
};

function sizing(index: number, lineHeight: number): StyleRule {
  const px = pxSizeScale[index];
  return {
    fontSize: toRem(px),
    lineHeight,
  };
}

const typography: Record<string, Record<string, StyleRule>> = {
  heading: {
    1: {
      fontFamily: FontFamily.heading,
      ...sizing(10, 1.05),
    },
    2: {
      fontFamily: FontFamily.heading,
      ...sizing(9, 1.075),
    },
  },
  body: {
    '': {
      ...sizing(2, 1.15),
    },
    md: {
      ...sizing(3, 1.15),
    },
  },
};

export const TailwindTypography = mergeAll(
  values(
    mapObjIndexed(
      (
        familyMembers: Record<string, StyleRule>,
        familyName: string
      ): Record<string, StyleRule> =>
        mapKeys(
          (memberName) => ['.type', familyName, memberName].join('-'),
          familyMembers
        ),
      typography
    )
  )
);
