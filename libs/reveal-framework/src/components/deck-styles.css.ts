import { ContextualColors } from '@ageorgedev/foundation-styles';
import { style } from '@vanilla-extract/css';

export const slideMainGap = 'gap-5';
export const slideXMargin = 'px-6';
export const slideWithFooterBottomMargin = 'pb-6';
export const slideWithoutFooterBottomMargin = 'pb-9';
export const slideMainReset = `h-full ${slideXMargin}`;
export const slideContentReset = 'h-full';

export const slideCenterStyles = `flex flex-col justify-center items-center`;

export const slideHeaderGrid = style([
  'grid place-items-center gap-6 large-desktop:gap-7',
  {
    gridTemplateRows: '.2fr .8fr',
  },
]);

export const middleDivider = style({
  position: 'relative',
  ':after': {
    content: '',
    position: 'absolute',
    left: 'calc(50% - 1px)',
    top: 0,
    width: '2px',
    height: '100%',
    backgroundColor: ContextualColors.line.DEFAULT,
  },
});
