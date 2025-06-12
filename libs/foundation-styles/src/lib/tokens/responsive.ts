const minH = (n: number) => `(min-height: ${n}px)`;
const maxH = (n: number) => `(max-height: ${n}px)`;
const minW = (n: number) => `(min-width: ${n}px)`;
const maxW = (n: number) => `(max-width: ${n}px)`;

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

// TODO: Remove these once we have a proper responsive system
export const Screens = {
  phoneOnly: sc + maxW(minBreakpoints.tablet - 1),
  phoneLandscapeOnly: sc + maxH(maxHeightBreakpoints.phoneLandscape),
  tablet: `${sc} ${minW(minBreakpoints.tablet)} and ${minH(
    maxHeightBreakpoints.phoneLandscape + 1
  )}`,
  tabletLandscape: sc + minW(minBreakpoints.tabletLandscape),
  desktop: sc + minW(minBreakpoints.desktop),
  largeDesktop: sc + minW(minBreakpoints.largeDesktop),
};
