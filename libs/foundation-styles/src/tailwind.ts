import { Spacing } from './lib/spacing';
import { minBreakpoints } from './lib/responsive';

export default {
  theme: {
    spacing: Spacing,
    screens: {
      'phone-only': { max: `${minBreakpoints.tablet - 1}px` },
      tablet: `${minBreakpoints.tablet}px`,
      'tablet-landscape': `${minBreakpoints.tabletLandscape}px`,
      desktop: `${minBreakpoints.desktop}px`,
      'large-desktop': `${minBreakpoints.largeDesktop}px`,
    },
  },
};
