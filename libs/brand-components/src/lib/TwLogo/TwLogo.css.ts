import { Theme } from '@ageorgedev/foundation-styles';
import { style } from '@vanilla-extract/css';

export const bar = style({
  fill: '#F2617A',
});

export const text = style([
  {
    fill: '#003D4F',
  },
  Theme.dark({
    fill: '#EDF1F3',
  }),
]);
