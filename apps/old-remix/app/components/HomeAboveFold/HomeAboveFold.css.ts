import { createVar, style } from '@vanilla-extract/css';
import {
  ContextualColors,
  Media,
  RawColors,
  Spacing,
} from '@ageorgedev/foundation-styles';

const deg = createVar('skewDeg');
const nDeg = createVar('negativeSkewDeg');

export const container = style([
  {
    vars: {
      [deg]: '3deg',
      [nDeg]: `calc(${deg} * -1)`,
    },
    gridTemplateColumns: '1fr',
    gridTemplateRows: '3fr 2fr max-content',
    color: ContextualColors.neutral.DEFAULT,
    height: '100vh',
    '@supports': {
      '(height: 100dvh)': {
        height: '100dvh',
      },
    },
  },
  Media.tablet({
    gridTemplateColumns: '4fr 3fr',
    gridTemplateRows: '1fr max-content',
  }),
  Media.desktop({
    vars: {
      [deg]: '2deg',
    },
    gridTemplateColumns: '5fr 3fr',
  }),
]);

export const nameSection = style({
  background: ContextualColors.page[0],
});

const bg = createVar();

const paper = style({
  background: bg,
  ':before': {
    content: '',
    position: 'absolute',
    background: bg,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
  },
});

export const subTextSection = style([
  paper,
  {
    vars: {
      [bg]: ContextualColors.page[0],
    },
    zIndex: 1,
    ':before': {
      content: 'unset',
      top: -5,
      transform: `skew(${nDeg}, ${deg})`,
      transformOrigin: 'top left',
      boxShadow: `-4px 4px ${RawColors.shadow[1]}`,
      borderLeft: `${Spacing['medium-line']} solid ${ContextualColors.line.dark}`,
    },
  },
  Media.tablet({
    vars: {
      [bg]: ContextualColors.page[1],
    },
    ':before': {
      content: '',
    },
  }),
]);

export const conSection = style([
  paper,
  {
    vars: {
      [bg]: ContextualColors.page[2],
    },
    zIndex: 2,
    ':before': {
      right: -5,
      transform: `skew(0deg, ${deg}) scaleY(2)`,
      transformOrigin: 'top right',
      boxShadow: `-4px -8px ${RawColors.shadow[2]}`,
      borderTop: `${Spacing['thick-line']} solid ${ContextualColors.line.dark}`,
    },
  },
]);

export const name = style({
  textShadow: '4px 8px rgb(0 0 0 / .25)',
});
