import { map, fromPairs } from 'ramda';

const allColors = [
  'rc-timber-100',
  'rc-timber-200',
  'rc-timber-300',
  'rc-timber-400',
  'rc-timber-500',

  'rc-parchment-100',
  'rc-parchment-200',
  'rc-parchment-300',
  'rc-parchment-400',
  'rc-parchment-500',

  'rc-p-accent-100',
  'rc-p-accent-200',
  'rc-p-accent-300',
  'rc-p-accent-400',
  'rc-p-accent-500',

  'rc-s-accent-100',
  'rc-s-accent-200',
  'rc-s-accent-300',
  'rc-s-accent-400',
  'rc-s-accent-500',

  'rc-d-neutral-100',
  'rc-d-neutral-200',
  'rc-d-neutral-300',
  'rc-d-neutral-400',
  'rc-d-neutral-500',

  'rc-l-neutral-100',
  'rc-l-neutral-200',
  'rc-l-neutral-300',
  'rc-l-neutral-400',
  'rc-l-neutral-500',

  'rc-shadow-1',
  'rc-shadow-2',
  'rc-shadow-3',
  'rc-shadow-4',
  'rc-shadow-5',

  'rc-line-main',
  'rc-line-inverse',

  'rc-red-100',
  'rc-red-200',
  'rc-red-400',
  'rc-red-500',

  'cc-page-0',
  'cc-page-1',
  'cc-page-2',
  'cc-page-3',
  'cc-page-4',

  'cc-neutral',
  'cc-neutral-subtle',
  'cc-neutral-subtlest',

  'cc-neutral-inverse',
  'cc-neutral-inverse-subtle',
  'cc-neutral-inverse-subtlest',

  'cc-shadow-far',
  'cc-shadow',
  'cc-shadow-near',

  'cc-line',
  'cc-line-dark',

  'cc-accent',
  'cc-accent-subtle',

  'cc-alt-accent',
  'cc-alt-accent-subtle',

  'cc-danger',
  'cc-danger-bg',
  'cc-danger-fg',
];

export const allTailwindColors = fromPairs(
  map((color) => {
    return [color, `var(--ag-${color})`];
  }, allColors)
);
