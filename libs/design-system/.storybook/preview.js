import './storybook.css';
import { withThemeByClassName } from '@storybook/addon-themes';

const preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
