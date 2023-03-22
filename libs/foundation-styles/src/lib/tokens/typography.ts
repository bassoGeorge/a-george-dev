import { joinCssClassParts, toRem } from '../utils';
import { mapObjIndexed, mergeAll, mergeRight, values } from 'ramda';
import { StyleRule } from '@vanilla-extract/css';
import { mapKeys } from '@ageorgedev/toolbelt';
import { TailwindMedia } from './responsive';

//                   xs  sm   .  md  lg  xl 2xl 3xl 4xl 5xl 6xl
//                    0   1   2   3   4   5   6   7   8   9  10
const pxSizeScale = [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72] as const;

export const FontFamily = {
  heading: 'Alegreya, ui-serif, serif',
  interface: '"Alegreya Sans SC", ui-sans-serif, system-ui, sans-serif',
  body: '"Alegreya Sans", ui-sans-serif, system-ui, sans-serif',
};

function sizing(index: number, lineHeight = 1): StyleRule {
  return {
    fontSize: toRem(pxSizeScale[index]),
    lineHeight,
  };
}

const headingFont = mergeRight<StyleRule>({ fontFamily: FontFamily.heading });
const interfaceFont = mergeRight<StyleRule>({
  fontFamily: FontFamily.interface,
});

const typography: Record<string, Record<string, StyleRule>> = {
  heading: {
    1: headingFont({
      ...sizing(10, 1.05),
    }),
    2: headingFont({
      ...sizing(9, 1.075),
      ...TailwindMedia.phoneOnly(sizing(5, 1.075)),
    }),
    3: headingFont({
      ...sizing(8, 1.1),
      ...TailwindMedia.phoneOnly(sizing(4, 1.1)),
    }),
  },
  body: {
    xl: sizing(5, 1.125),
    lg: sizing(4, 1.15),
    md: sizing(3, 1.15),
    '': sizing(2, 1.15),
    sm: {
      ...sizing(1, 1.15),
      letterSpacing: '0.01em',
    },
    xs: {
      ...sizing(0, 1.15),
      letterSpacing: '0.02em',
    },
  },
  interface: {
    '2xl': interfaceFont(sizing(6)),
    xl: interfaceFont(sizing(5)),
    lg: interfaceFont(sizing(4)),
    md: interfaceFont(sizing(3)),
    '': interfaceFont(sizing(2)),
  },
};

console.log(typography['heading'][2]);

export const TailwindTypography = mergeAll(
  values(
    mapObjIndexed(
      (
        familyMembers: Record<string, StyleRule>,
        familyName: string
      ): Record<string, StyleRule> =>
        mapKeys(
          (memberName) => joinCssClassParts(['.type', familyName, memberName]),
          familyMembers
        ),
      typography
    )
  )
);

console.log(TailwindTypography);
