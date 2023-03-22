import { StyleRule } from '@vanilla-extract/css';
import { CSSRuleObject } from 'tailwindcss/types/config';
import { compose, concat, mapObjIndexed } from 'ramda';
import { mapKeys } from '@ageorgedev/toolbelt';

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

/**
 * For Tailwind's plugin system, we need a flattened version of @media rule
 * So VE uses:
 * {
 *   @media: {
 *     <rule>: <styles>
 *   }
 * }
 * Tailwind would need
 * { '@media <rule>': <styles> }
 *
 * For that we transform the functions and return a new Media object for tailwind
 */

const getInlineMediaQueryObject: (style: StyleRule) => CSSRuleObject = compose(
  mapKeys(concat('@media ')),
  (s: StyleRule) => s['@media']
);

export const TailwindMedia = mapObjIndexed(
  (fn) => compose(getInlineMediaQueryObject, fn),
  Media
);
