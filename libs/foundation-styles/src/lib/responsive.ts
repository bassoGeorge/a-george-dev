import { StyleRule } from '@vanilla-extract/css';

export const minBreakpoints = {
  tablet: 600,
  tabletLandscape: 900,
  desktop: 1200,
  largeDesktop: 1800,
};

export function onMinWidth(width: number) {
  return function mediaQueryStyles(styles: StyleRule): StyleRule {
    return {
      '@media': {
        [`screen and (min-width: ${width}px)`]: styles,
      },
    };
  };
}

export const onTablet = onMinWidth(minBreakpoints.tablet);
export const onTabletLandscape = onMinWidth(minBreakpoints.tabletLandscape);
export const onDesktop = onMinWidth(minBreakpoints.desktop);
export const onLargeDesktop = onMinWidth(minBreakpoints.largeDesktop);
export const onPhoneOnly = (styles: StyleRule): StyleRule => ({
  '@media': {
    [`screen and (max-width: ${minBreakpoints.tablet - 1}px)`]: styles,
  },
});
