import { RawColors, Spacing } from '@ageorgedev/foundation-styles';
import { style, createVar, fallbackVar } from '@vanilla-extract/css';

const d = createVar('delta');
const tlY = createVar('tlY');
const trY = createVar('trY');
const blY = createVar('blY');
const brY = createVar('brY');

const tlX = createVar('tlX');
const trX = createVar('trX');
const blX = createVar('blX');
const brX = createVar('brX');

const skewStrength = style({
  vars: {
    [d]: Spacing[2],
  },
});

export const boxTypeA = style({
  vars: {
    [trY]: d,
    [brY]: d,
  },
});

export const boxTypeB = style({
  vars: {
    [tlY]: d,
    [blY]: d,
  },
});

const skewStyle = style([
  skewStrength,
  {
    clipPath: `polygon(
      ${fallbackVar(tlX, '0px')} 
      ${fallbackVar(tlY, '0px')}, 

      calc(100% - ${fallbackVar(trX, '0px')}) 
      ${fallbackVar(trY, '0px')}, 

      calc(100% - ${fallbackVar(brX, '0px')}) 
      calc(100% - ${fallbackVar(brY, '0px')}),

      ${fallbackVar(blX, '0px')} 
      calc(100% - ${fallbackVar(blY, '0px')})
    )`,
  },
]);

export const skewedBoxBorder = style(['bg-cc-neutral-500 p-1', skewStyle]);

export const skewedBox = style(['p-6 bg-cc-page-2', skewStyle]);

export const skewedBoxShadow = style({
  filter: `drop-shadow(4px 8px 0 ${RawColors.shadow[2]})`,
});
