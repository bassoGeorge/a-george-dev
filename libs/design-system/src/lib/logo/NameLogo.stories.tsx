import type { Meta, StoryObj } from '@storybook/react';
import { NameLogo } from './NameLogo';

export default {
  component: NameLogo,
  title: 'Atoms/NameLogo',
  argTypes: {
    shadowDirection: {
      control: 'select',
      options: ['left', 'right'],
    },
    className: {
      control: 'text',
    },
  },
} satisfies Meta<typeof NameLogo>;

type Story = StoryObj<typeof NameLogo>;

export const Default: Story = {
  args: {
    className: 'text-[100px]',
    shadowDirection: 'right',
  },
};

export const Small: Story = {
  args: {
    className: 'text-[50px]',
    shadowDirection: 'right',
  },
};

export const Large: Story = {
  args: {
    className: 'text-[150px]',
    shadowDirection: 'right',
  },
};

export const LeftShadow: Story = {
  args: {
    className: 'text-[100px]',
    shadowDirection: 'left',
  },
};

export const CustomSize: Story = {
  args: {
    className: 'text-[75px]',
    shadowDirection: 'right',
  },
};

export const WithCustomBackground: Story = {
  render: () => (
    <div className="bg-gray-900 p-8">
      <NameLogo className="text-[100px]" shadowDirection="right" />
    </div>
  ),
};
