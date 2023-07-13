import { RawColors, Theme } from '@ageorgedev/foundation-styles';
import { createVar, style } from '@vanilla-extract/css';

export const logoWrapper = style([
  'inline-block font-heading font-bold text-left',
  {
    paddingBlock: '.1em .25em',
    paddingInline: '.1em',
  },
]);

const shadowColor = createVar();

export const logoFont = style([
  {
    vars: {
      [shadowColor]: RawColors.shadow[2],
    },
    letterSpacing: '.03em',
    lineHeight: '.76em',
  },
  Theme.dark({
    vars: {
      [shadowColor]: RawColors.shadow[4],
    },
  }),
]);

export const bottomRightShadow = style({
  textShadow: `.03em .06em ${shadowColor}`,
});

export const bottomLeftShadow = style({
  textShadow: `-.03em .06em ${shadowColor}`,
});

export const firstNameColor = style([
  'text-rc-timber-400 dark:text-rc-parchment-500',
]);

export const lastNameColor = style(['text-cc-accent']);

export const firstName = style([firstNameColor]);

export const lastName = style([
  lastNameColor,
  {
    paddingInlineStart: '.5em',
  },
]);
