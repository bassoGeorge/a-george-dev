import { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock } from './CodeBlock';

export default {
  title: 'Molecules/CodeBlock',
  component: CodeBlock,
  argTypes: {
    lang: {
      control: 'select',
      options: ['typescript', 'html', 'css', 'jsx', 'tsx', 'javascript'],
    },
    fontSize: {
      control: 'select',
      options: ['normal', 'small', 'large'],
    },
    text: {
      control: 'text',
    },
  },
} satisfies Meta<typeof CodeBlock>;

type Story = StoryObj<typeof CodeBlock>;

const typescriptExample = `interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

function greetUser(user: User): string {
  return \`Hello \${user.name}!\`;
}`;

const htmlExample = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Example Page</title>
</head>
<body>
  <h1>Welcome</h1>
  <p>This is an example HTML page.</p>
</body>
</html>`;

const cssExample = `.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;
}

.button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: #007bff;
  color: white;
}`;

const jsxExample = `function Button({ text, onClick }) {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
}`;

export const TypeScript: Story = {
  args: {
    lang: 'typescript',
    text: typescriptExample,
    fontSize: 'normal',
  },
};

export const HTML: Story = {
  args: {
    lang: 'html',
    text: htmlExample,
    fontSize: 'normal',
  },
};

export const CSS: Story = {
  args: {
    lang: 'css',
    text: cssExample,
    fontSize: 'normal',
  },
};

export const JSX: Story = {
  args: {
    lang: 'jsx',
    text: jsxExample,
    fontSize: 'normal',
  },
};

export const SmallFont: Story = {
  args: {
    lang: 'typescript',
    text: typescriptExample,
    fontSize: 'small',
  },
};

export const LargeFont: Story = {
  args: {
    lang: 'typescript',
    text: typescriptExample,
    fontSize: 'large',
  },
};

export const WithCustomClassName: Story = {
  args: {
    lang: 'typescript',
    text: typescriptExample,
    className: 'max-w-2xl',
  },
};

export const InteractiveExample: Story = {
  args: {
    lang: 'typescript',
    text: '// Try changing the language, font size, and code!',
    fontSize: 'normal',
  },
};
