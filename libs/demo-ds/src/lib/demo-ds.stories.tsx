import type { Meta, StoryObj } from '@storybook/react';
import DemoDs from './demo-ds';

export default {
  component: DemoDs,
} satisfies Meta<typeof DemoDs>;

type Story = StoryObj<typeof DemoDs>;

export const Primary: Story = {
  render: () => <DemoDs></DemoDs>,
};
