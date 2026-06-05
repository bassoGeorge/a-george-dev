import './storybook.css';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '../src/lib/theming/ThemeProvider';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
  parameters: {
    options: {
      storySort: {
        order: ['Foundation', 'Atoms', 'Molecules', 'UI'],
      },
    },
  },
};

export default preview;
