import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: 'Molecules/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    lang: {
      control: 'select',
      options: ['typescript', 'javascript', 'html', 'css', 'jsx', 'tsx'],
      description: 'Programming language for syntax highlighting',
    },
    fontSize: {
      control: 'select',
      options: ['small', 'normal', 'large'],
      description: 'Size of the code text',
    },
    text: {
      control: 'text',
      description: 'The code content to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
  args: {
    text: 'const greeting = "Hello, World!";\nconsole.log(greeting);',
    lang: 'typescript',
    fontSize: 'normal',
  },
};

export const SmallFont: Story = {
  args: {
    text: 'function add(a: number, b: number): number {\n  return a + b;\n}',
    lang: 'typescript',
    fontSize: 'small',
  },
};

export const LargeFont: Story = {
  args: {
    text: 'const styles = {\n  color: "blue",\n  fontSize: "16px"\n};',
    lang: 'javascript',
    fontSize: 'large',
  },
};

export const JSXExample: Story = {
  args: {
    text: 'function Greeting({ name }) {\n  return (\n    <div>\n      <h1>Hello, {name}!</h1>\n    </div>\n  );\n}',
    lang: 'jsx',
    fontSize: 'normal',
  },
};

export const HTMLCode: Story = {
  args: {
    text: '<div class="container">\n  <h1>Hello World</h1>\n  <p>Welcome to my website</p>\n</div>',
    lang: 'html',
    fontSize: 'normal',
  },
};
