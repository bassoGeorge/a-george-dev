import { StyleRule } from '@vanilla-extract/css';

export const Theme = {
  dark: (rule: StyleRule) => ({
    selectors: {
      '.dark &': rule,
    },
  }),
};
