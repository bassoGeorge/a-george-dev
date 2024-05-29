import { Meta, StoryObj } from '@storybook/react';
import { TiltCard } from './TiltCard';

export default {
  title: 'Atoms/Tilt Card',
  component: TiltCard,
} satisfies Meta<typeof TiltCard>;

type Story = StoryObj<typeof TiltCard>;

export const TrapRight: Story = {
  render: () => (
    <TiltCard shape="trapRight" interactive>
      shape = trapRight
    </TiltCard>
  ),
};
