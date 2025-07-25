import { Meta, StoryObj } from '@storybook/react-vite';
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

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
    size: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'default',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
    size: 'default',
  },
};

export const Link: Story = {
  args: {
    children: 'Button',
    variant: 'link',
    size: 'default',
  },
};

export const SizeSmall: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'sm',
  },
};

export const SizeLarge: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'lg',
  },
};

// TODO
export const SizeIcon: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'icon',
  },
};
