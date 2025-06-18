import { mapObjIndexed } from 'ramda';

const headingFont = 'font-heading';
const bodyFont = 'font-body';
const interfaceFont = 'font-interface leading-none';

const withFont = (font: string) => (v: string) => `${font} ${v}`;

const headingClasses = mapObjIndexed(withFont(headingFont), {
  h1: 'text-4xl tablet:text-5xl desktop:text-6xl',
  h2: 'text-3xl tablet:text-4xl desktop:text-5xl',
  h3: 'text-2xl tablet:text-3xl desktop:text-4xl',
  h4: 'text-xl tablet:text-2xl desktop:text-3xl',
  h5: 'text-lg tablet:text-xl desktop:text-2xl',
  h6: 'text-md tablet:text-lg desktop:text-xl',
});

const bodyClasses = mapObjIndexed(withFont(bodyFont), {
  'body-xl': 'text-xl',
  'body-lg': 'text-lg',
  'body-md': 'text-md',
  body: 'text-base',
  'body-sm': 'text-sm',
  'body-xs': 'text-xs',
});

const presentationBodyClasses = mapObjIndexed(withFont(bodyFont), {
  'p-body-lg': 'text-4xl',
  'p-body-md': 'text-3xl',
  'p-body': 'text-2xl',
  'p-body-sm': 'text-xl',
  'p-body-xs': 'text-lg',
});

const interfaceClasses = mapObjIndexed(withFont(interfaceFont), {
  'interface-2xl': 'text-2xl',
  'interface-xl': 'text-xl',
  'interface-lg': 'text-lg',
  'interface-md': 'text-md',
  interface: '',
  'interface-sm': 'text-sm',
});

export const TYPOGRAPHY_CLASSES = {
  ...headingClasses,
  ...bodyClasses,
  ...interfaceClasses,
  ...presentationBodyClasses,
};

export type TypographyVariant = keyof typeof TYPOGRAPHY_CLASSES;
