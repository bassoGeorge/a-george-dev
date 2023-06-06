import { ContextualColors, Spacing } from '@ageorgedev/foundation-styles';
import { createVar, fallbackVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const d = createVar('delta');

const tlX = createVar('tlX');
const tlY = createVar('tlY');

const trX = createVar('trX');
const trY = createVar('trY');

const blX = createVar('blX');
const blY = createVar('blY');

const brX = createVar('brX');
const brY = createVar('brY');

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

export const skewedBoxShadowContainer = recipe({
  base: 'drop-shadow',
  variants: {
    shape: {
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
    },
    interactive: {
      true: [
        'hover:drop-shadow-far active:drop-shadow-near transition',
        {
          ':hover': {
            transform: 'translate(-2px, -4px)',
          },
          ':active': {
            transform: 'translate(2px, 4px)',
          },
        },
      ],
    },
    skewStrength: {
      none: {
        vars: {
          [d]: '0px',
        },
      },
      light: {
        vars: {
          [d]: Spacing[1],
        },
      },
      medium: {
        vars: {
          [d]: Spacing[2],
        },
      },
      heavy: {
        vars: {
          [d]: Spacing[4],
        },
      },
    },
  },
  defaultVariants: {
    skewStrength: 'medium',
  },
});

export const skewedBoxBorderContainer = recipe({
  base: ['bg-cc-neutral-500', skewStyle],
  variants: {
    border: {
      all: 'p-1',
      bottom: 'pb-1',
      none: '',
    },
  },
  defaultVariants: {
    border: 'all',
  },
});

export const skewedBoxContents = style([
  'p-6',
  skewStyle,
  {
    backgroundColor: ContextualColors.page[1], // kind of acts as a default. can be overridden by passing in bg-cc-*
  },
]);
