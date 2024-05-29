import { Meta, StoryObj } from '@storybook/react';
import { TiltCard } from './TiltCard';

export default {
  title: 'Atoms/Tilt Card',
  component: TiltCard,
} satisfies Meta<typeof TiltCard>;

type Story = StoryObj<typeof TiltCard>;

export const Test: Story = {
  render: () => (
    <TiltCard shape="trapRight" skewStrength="heavy">
      <div className="text-left">What the hell</div>
    </TiltCard>
  ),
};
