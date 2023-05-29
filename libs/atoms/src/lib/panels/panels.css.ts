import { Spacing } from '@ageorgedev/foundation-styles';
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

export const skewedBox = style([
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
  'p-6 bg-cc-page-3',
]);

export const skewedBoxShadow = style({
  filter: 'drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.2))',
});
