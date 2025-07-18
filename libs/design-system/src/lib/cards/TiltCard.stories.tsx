import { Meta, StoryObj } from '@storybook/react-vite';
import { TiltCard } from './TiltCard';

export default {
  title: 'Atoms/Tilt Card',
  component: TiltCard,
  argTypes: {
    shape: {
      control: 'select',
      options: ['trapRight', 'trapLeft', 'triUpperRight', 'triUpperLeft'],
    },
    skewStrength: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    border: {
      control: 'select',
      options: ['all', 'bottom', 'none'],
    },
    interactive: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof TiltCard>;

type Story = StoryObj<typeof TiltCard>;

export const Default: Story = {
  args: {
    shape: 'trapRight',
    interactive: true,
    skewStrength: 'medium',
    border: 'all',
    children: 'Default Tilt Card',
  },
};

export const TrapLeft: Story = {
  args: {
    shape: 'trapLeft',
    interactive: true,
    children: 'Trap Left Shape',
  },
};

export const TriUpperRight: Story = {
  args: {
    shape: 'triUpperRight',
    interactive: true,
    children: 'Triangle Upper Right Shape',
  },
};

export const TriUpperLeft: Story = {
  args: {
    shape: 'triUpperLeft',
    interactive: true,
    children: 'Triangle Upper Left Shape',
  },
};

export const SmallSkew: Story = {
  args: {
    shape: 'trapRight',
    skewStrength: 'small',
    children: 'Small Skew Strength',
  },
};

export const LargeSkew: Story = {
  args: {
    shape: 'trapRight',
    skewStrength: 'large',
    children: 'Large Skew Strength',
  },
};

export const BottomBorderOnly: Story = {
  args: {
    shape: 'trapRight',
    border: 'bottom',
    children: 'Bottom Border Only',
  },
};

export const NoBorder: Story = {
  args: {
    shape: 'trapRight',
    border: 'none',
    children: 'No Border',
  },
};

export const NonInteractive: Story = {
  args: {
    shape: 'trapRight',
    interactive: false,
    children: 'Non-Interactive Card',
  },
};

export const WithCustomContent: Story = {
  args: {
    shape: 'trapRight',
    interactive: true,
    children: (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Card Title</h3>
        <p>
          This is a card with custom content including a title and paragraph.
        </p>
        <button className="bg-blue-500 text-white rounded px-4 py-2">
          Click Me
        </button>
      </div>
    ),
  },
};
