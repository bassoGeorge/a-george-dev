import { createVar, style } from '@vanilla-extract/css';

const deg = createVar('skewDeg');
const nDeg = createVar('negativeSkewDeg');

export const container = style([
  {
    vars: {
      [deg]: '3deg',
      [nDeg]: `calc(${deg} * -1)`,
    },
    gridTemplateColumns: '1fr',
    gridTemplateRows: '2fr 1fr max-content',
  },
  onTablet({
    gridTemplateColumns: '4fr 3fr',
    gridTemplateRows: '1fr max-content',
  }),
  onDesktop({
    vars: {
      [deg]: '2deg',
    },
    gridTemplateColumns: '5fr 3fr',
  }),
]);

export const nameSection = style({});

export const subTextSection = style(
  onTablet({
    zIndex: 1,
    // background: 'black',
    background: '#FFF1D8',
    ':before': {
      content: '',
      position: 'absolute',
      background: '#FFF1D8',
      top: -5,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: -1,
      transform: `skew(${nDeg}, ${deg})`,
      transformOrigin: 'top left',
      boxShadow: '-4px 4px rgb(0 0 0 / .1)',
      borderLeft: '4px solid hsl(189 67% 6% / .4)',
    },
  })
);

export const conSection = style({
  zIndex: 2,
  // background: 'black',
  background: '#FFF7E8',
  ':before': {
    content: '',
    position: 'absolute',
    background: '#FFF7E8',
    top: 0,
    left: 0,
    bottom: 0,
    right: -5,
    zIndex: -1,
    transform: `skew(0deg, ${deg})`,
    transformOrigin: 'top right',
    boxShadow: '-4px -8px rgb(0 0 0 / .25)',
    borderTop: '4px solid #051619',
  },
});

function onTablet(styles: object) {
  return {
    '@media': {
      'screen and (min-width: 768px)': styles,
    },
  };
}

function onDesktop(styles: object) {
  return {
    '@media': {
      'screen and (min-width: 1024px)': styles,
    },
  };
}
