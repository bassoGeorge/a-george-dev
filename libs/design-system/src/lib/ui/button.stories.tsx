import { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

export default {
  title: 'UI/Button',
  component: Button,
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Button',
    variant: 'destructive',
    size: 'default',
  },
};
