import type { Config } from 'tailwindcss';
import theme from '../generated-src/tailwind-theme.json';

export default {
  theme,
} satisfies Partial<Config>;
