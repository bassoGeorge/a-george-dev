import { style } from '@vanilla-extract/css';

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
  },
]);

export const header = style([
  'bg-cc-page-0',
  {
    gridArea: 'header',
    height: 130,
  },
]);

export const aside = style([
  'bg-cc-page-1',
  {
    gridArea: 'aside',
  },
]);

export const article = style([
  'bg-cc-page-4',
  {
    gridArea: 'article',
  },
]);
