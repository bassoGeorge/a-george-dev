import { createVar, style } from '@vanilla-extract/css';

export const logoWrapper = style([
  {
    paddingBlock: '.1em .25em',
    paddingInline: '.1em',
  },
]);

const shadowColor = createVar();

export const logoFont = style({
  vars: {
    [shadowColor]: 'rgb(0 0 0 / .25)',
  },
  letterSpacing: '.03em',
  lineHeight: '.76em',
  textShadow: `.03em .06em ${shadowColor}`,
  selectors: {
    '.dark &': {
      vars: {
        [shadowColor]: 'rgb(0 0 0 / .8)',
      },
    },
  },
});

export const lastName = style({
  paddingInlineStart: '.5em',
});
