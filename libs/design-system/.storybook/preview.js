import './storybook.css';
import '../../foundation-styles/src/globals';
import {
  RawColors,
  RAW_COLORS_DIRECT_DO_NOT_USE,
} from '@ageorgedev/foundation-styles';

export const parameters = {
  themes: {
    default: 'light',
    list: [
      {
        name: 'light',
        class: 'light',
        color: RAW_COLORS_DIRECT_DO_NOT_USE.parchment[500],
      },
      {
        name: 'dark',
        class: 'dark',
        color: RAW_COLORS_DIRECT_DO_NOT_USE.timber[500],
      },
    ],
    target: 'root',
  },
};
