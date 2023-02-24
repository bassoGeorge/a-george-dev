import { StyleRule } from '@vanilla-extract/css';

const minH = (n: number) => `(min-height: ${n}px)`;
const maxH = (n: number) => `(max-height: ${n}px)`;
const minW = (n: number) => `(min-width: ${n}px)`;

const sc = 'screen and ';

const minBreakpoints = {
  tablet: 600,
  tabletLandscape: 900,
  desktop: 1200,
  largeDesktop: 1800,
};

const maxHeightBreakpoints = {
  phoneLandscape: 500,
};

export const Screens = {
  phoneOnly: sc + minW(minBreakpoints.tablet - 1),
  phoneLandscapeOnly: sc + maxH(maxHeightBreakpoints.phoneLandscape),
  tablet: `${sc} ${minW(minBreakpoints.tablet)} and ${minH(
    maxHeightBreakpoints.phoneLandscape + 1
  )}`,
  tabletLandscape: sc + minW(minBreakpoints.tabletLandscape),
  desktop: sc + minW(minBreakpoints.desktop),
  largeDesktop: sc + minW(minBreakpoints.largeDesktop),
};

const veQuery =
  (screen: keyof typeof Screens) =>
  (styles: StyleRule): StyleRule => ({
    '@media': {
      [Screens[screen]]: styles,
    },
  });

export const onTablet = veQuery('tablet');
export const onTabletLandscape = veQuery('tabletLandscape');
export const onDesktop = veQuery('desktop');
export const onLargeDesktop = veQuery('largeDesktop');
export const onPhoneOnly = veQuery('phoneOnly');
export const onPhoneLandscapeOnly = veQuery('phoneLandscapeOnly');
