import { createVar, globalStyle, style } from '@vanilla-extract/css';
import { ContextualColors } from '@ageorgedev/foundation-styles';

globalStyle('body', {
  background: 'red',
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

const loremStyles = 'p-6 flex flex-col gap-3';

export const page = style([
  'grid',
  {
    height: '100dvh',
    gridTemplateColumns: '2fr 6fr',
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
  loremStyles,
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
    height: 130,
  },
]);

export const aside = style([
  loremStyles,
  'pt-10',
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
  },
]);

export const article = style([
  loremStyles,
  {
    vars: {
      [bg]: ContextualColors.page[4],
    },
    zIndex: 3,
    ':before': {
      transformOrigin: 'top left',
      transform: `${rotation} scale(1, 1.5)`,
    },
  },
  paper,
  {
    gridArea: 'article',
  },
]);
