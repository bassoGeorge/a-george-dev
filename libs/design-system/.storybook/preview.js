import './storybook.css';

export const parameters = {
  themes: {
    default: 'light',
    list: [
      {
        name: 'light',
        class: 'light',
        color: 'hsl(39, 100%, 89%)',
      },
      {
        name: 'dark',
        class: 'dark',
        color: 'hsl(189, 67%, 6%)',
      },
    ],
    target: 'root',
  },
};
