import {
  ContextualColors,
  DropShadows,
  RawColors,
  Shadows,
  Spacing,
} from '@ageorgedev/foundation-styles';
import {
  style,
  createVar,
  fallbackVar,
  styleVariants,
} from '@vanilla-extract/css';

const d = createVar('delta');
const tlY = createVar('tlY');
const trY = createVar('trY');
const blY = createVar('blY');
const brY = createVar('brY');

const tlX = createVar('tlX');
const trX = createVar('trX');
const blX = createVar('blX');
const brX = createVar('brX');

export const skewStrength = style({
  vars: {
    [d]: Spacing[2],
  },
});

export const shapes = styleVariants({
  trapRight: {
    vars: {
      [trY]: d,
      [brY]: d,
    },
  },
  trapLeft: {
    vars: {
      [tlY]: d,
      [blY]: d,
    },
  },
  triUpperRight: {
    vars: {
      [brY]: d,
    },
  },
  triUpperLeft: {
    vars: {
      [blY]: d,
    },
  },
});

const skewStyle = style({
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
});

export const skewedBoxBorder = style(['bg-cc-neutral-500', skewStyle]);

export const skewedBox = style([
  'p-6',
  skewStyle,
  {
    backgroundColor: ContextualColors.page[1], // kind of acts as a default. can be overridden by passing in bg-cc-*
  },
]);

export const skewedBoxShadow = style({
  filter: DropShadows.DEFAULT,
});

export const interactiveShadow = style({
  transition: 'filter 0.15s ease-out, transform 0.15s ease-out',
  ':hover': {
    filter: DropShadows.far,
    transform: 'translate(-2px, -4px)',
  },
  ':active': {
    filter: DropShadows.near,
    transform: 'translate(2px)',
  },
});

export const simpleShadow = style({
  boxShadow: Shadows.DEFAULT,
});
