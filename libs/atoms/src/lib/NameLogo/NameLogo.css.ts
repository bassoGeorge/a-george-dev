import { createVar, style } from '@vanilla-extract/css';
import { Theme } from '@ageorgedev/foundation-styles';

export const logoWrapper = style([
  'inline-block font-heading font-bold',
  {
    paddingBlock: '.1em .25em',
    paddingInline: '.1em',
  },
]);

const shadowColor = createVar();

export const logoFont = style([
  {
    vars: {
      [shadowColor]: 'rgb(0 0 0 / .25)',
    },
    letterSpacing: '.03em',
    lineHeight: '.76em',
  },
  Theme.dark({
    vars: {
      [shadowColor]: 'rgb(0 0 0 / .8)',
    },
  }),
]);

export const bottomRightShadow = style({
  textShadow: `.03em .06em ${shadowColor}`,
});

export const bottomLeftShadow = style({
  textShadow: `-.03em .06em ${shadowColor}`,
});

export const firstName = style([
  'text-rc-timber-400 dark:text-rc-parchment-500',
]);

export const lastName = style([
  'text-rc-p-accent-500 dark:text-rc-p-accent-200',
  {
    paddingInlineStart: '.5em',
  },
]);
