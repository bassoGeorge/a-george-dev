import { ContextualColors, RawColors } from '@ageorgedev/foundation-styles';
import { createVar, globalStyle, style } from '@vanilla-extract/css';

// NOTE: this is affecting styles in other pages as well. Currently isolated using print media query
globalStyle('html', {
  '@media': {
    print: {
      fontSize: '12px',
    },
  },
});

const bg = createVar();

const rotation = 'rotate(-2deg)';
const paper = style([
  'relative before:inset-0 before:absolute',
  {
    ':before': {
      background: bg,
      zIndex: -1,
      transform: rotation,
    },
  },
]);

export const page = style([
  'grid',
  {
    height: '100dvh',
    gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 8fr)',
    gridTemplateRows: 'max-content 1fr',
    gridTemplateAreas: `
    'header header'
    'aside article'
  `,
    overflow: 'hidden',
    printColorAdjust: 'exact',
  },
]);

export const header = style([
  'flex items-start justify-between px-5 pt-6 relative',
  {
    vars: {
      [bg]: ContextualColors.page[0],
    },
    zIndex: 2,
    background: bg,
    ':before': {
      transformOrigin: '33.33% center',
      transform: `${rotation} scale(1.1, 1.5)`,
    },
  },
  paper,
  {
    gridArea: 'header',
  },
  {
    ':before': {
      boxShadow: '-4px 6px rgb(0 0 0 / .1)',
      border: `2px solid ${RawColors.dNeutral['300']}`,
    },
  },
]);

const mainSectionVerticalPadding = 'pt-9 pb-5';

export const aside = style([
  mainSectionVerticalPadding,
  'pl-5 pr-2 grid content-between',
  {
    vars: {
      [bg]: ContextualColors.page[1],
    },
    zIndex: 1,
    ':before': {
      transformOrigin: 'top right',
      transform: `${rotation} scale(1.2, 1)`,
    },
  },
  paper,
  {
    gridArea: 'aside',
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
]);

export const article = style([
  mainSectionVerticalPadding,
  'pr-8 pl-6 flex flex-col gap-7',
  {
    vars: {
      [bg]: ContextualColors.page[4],
    },
    zIndex: 3,
    ':before': {
      transformOrigin: 'top left',
      transform: `${rotation} scale(1.5, 1.5)`,
    },
  },
  paper,
  {
    gridArea: 'article',
  },
  {
    ':before': {
      boxShadow: '-8px 4px rgb(0 0 0 / .25)',
      border: `4px solid ${RawColors.dNeutral['500']}`,
    },
  },
]);

export const eduGrid = style([
  'grid gap-x-2 gap-y-3',
  {
    gridTemplateColumns: 'max-content minmax(0, 1fr)',
  },
]);

export const expGrid = style([
  'grid gap-x-4 gap-y-2 items-baseline',
  {
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 3fr)',
  },
]);
