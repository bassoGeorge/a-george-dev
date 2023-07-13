import { mapKeys } from '@ageorgedev/toolbelt';

const borderSizes = {
  thick: '4px',
  medium: '2px',
  thin: '1px',
} as const;

const lineBasedSpacing = mapKeys((weight) => weight + '-line', borderSizes) as {
  [Property in keyof typeof borderSizes as `${Property}-line`]: (typeof borderSizes)[Property];
};

export const BorderWidth = {
  ...borderSizes,
  DEFAULT: borderSizes['thin'],
};

export const Spacing = {
  0: '0',
  px: '1px',
  '0.5': '2px',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.5rem',
  6: '2rem',
  7: '3rem',
  8: '4rem',
  9: '6rem',
  10: '8rem',
  11: '12rem',
  12: '16rem',
  13: '24rem',
  14: '32rem',
  15: '40rem',
  16: '48rem',
  ...lineBasedSpacing,
};
