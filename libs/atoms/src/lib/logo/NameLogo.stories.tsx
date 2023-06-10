import type { Meta, StoryObj } from '@storybook/react';
import { NameLogo } from './NameLogo';

export default {
  component: NameLogo,
} satisfies Meta<typeof NameLogo>;

type Story = StoryObj<typeof NameLogo>;

export const Primary: Story = {
  render: () => <NameLogo className={'text-[100px]'} />,
};
