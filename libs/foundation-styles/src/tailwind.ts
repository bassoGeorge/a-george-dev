import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import theme from '../generated-src/tailwind-theme.json';
import { TailwindTypography } from './lib/tokens/typography';
import { CSSRuleObject } from 'tailwindcss/types/config';

const typographyPlugin = plugin(({ addBase }) => {
  addBase(TailwindTypography as CSSRuleObject);
});

export default {
  theme,
  plugins: [typographyPlugin],
} satisfies Partial<Config>;
