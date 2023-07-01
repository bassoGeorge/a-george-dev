import { style } from '@vanilla-extract/css';

export const slideMainGap = 'gap-5';
export const slideXMargin = 'px-6';
export const slideWithFooterBottomMargin = 'pb-6';
export const slideWithoutFooterBottomMargin = 'pb-9';
export const slideMainReset = `h-full ${slideXMargin}`;
export const slideContentReset = 'h-full';

export const slideCenterStyles = `flex flex-col justify-center items-center`;

export const slideHeaderGrid = style([
  'grid place-items-center gap-7',
  {
    gridTemplateRows: '.2fr .8fr',
  },
]);
