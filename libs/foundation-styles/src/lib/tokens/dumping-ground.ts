import { StyleRule } from '@vanilla-extract/css';
import { Screens } from './responsive';

const veQuery =
  (screen: keyof typeof Screens) =>
  (styles: StyleRule): StyleRule => ({
    '@media': {
      [Screens[screen]]: styles,
    },
  });

export const Media = {
  tablet: veQuery('tablet'),
  tabletLandscape: veQuery('tabletLandscape'),
  desktop: veQuery('desktop'),
  largeDesktop: veQuery('largeDesktop'),
  phoneOnly: veQuery('phoneOnly'),
  phoneLandscapeOnly: veQuery('phoneLandscapeOnly'),
};
