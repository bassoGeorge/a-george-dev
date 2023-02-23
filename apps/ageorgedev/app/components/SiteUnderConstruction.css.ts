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
    gridTemplateRows: '3fr 2fr max-content',
    color: 'var(--ag-color-d-neutral-500)',
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

export const nameSection = style({
  background: 'var(--ag-color-parchment-500)',
});

const bg = createVar();

export const subTextSection = style([
  {
    vars: {
      [bg]: 'var(--ag-color-parchment-500)',
    },
    background: bg,
  },
  onTablet({
    vars: {
      [bg]: 'var(--ag-color-parchment-400)',
    },
    zIndex: 1,
    ':before': {
      content: '',
      position: 'absolute',
      background: bg,
      top: -5,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: -1,
      transform: `skew(${nDeg}, ${deg})`,
      transformOrigin: 'top left',
      boxShadow: '-4px 4px rgb(0 0 0 / .1)',
      borderLeft: '4px solid var(--ag-color-d-neutral-200)',
    },
  }),
]);

export const conSection = style({
  vars: {
    [bg]: 'var(--ag-color-parchment-300)',
  },
  zIndex: 2,
  background: bg,
  ':before': {
    content: '',
    position: 'absolute',
    background: bg,
    top: 0,
    left: 0,
    bottom: 0,
    right: -5,
    zIndex: -1,
    transform: `skew(0deg, ${deg})`,
    transformOrigin: 'top right',
    boxShadow: '-4px -8px rgb(0 0 0 / .25)',
    borderTop: '4px solid var(--ag-color-d-neutral-500)',
  },
});

export const name = style({
  textShadow: '4px 8px rgb(0 0 0 / .25)',
});

export const arch = style({
  color: 'var(--ag-color-d-neutral-300)',
});

export const webDev = style({
  color: 'var(--ag-color-s-accent-400)',
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
