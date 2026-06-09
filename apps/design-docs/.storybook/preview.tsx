import './storybook.css'
import { ThemeProvider } from '@ageorgedev/design-system/theming/ThemeProvider'
import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react-vite'

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
}

export default preview
