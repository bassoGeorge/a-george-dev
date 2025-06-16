import { Meta, StoryObj } from '@storybook/react';
import { CalloutBadge } from './CalloutBadge';
import {
  AddressBook,
  AirplaneInFlight,
  PenNib,
  SealWarning,
  Skull,
  Bell,
  Book,
  Camera,
  Coffee,
  Heart,
  Lightning,
  Star,
  Trophy,
  User,
} from '@phosphor-icons/react';

export default {
  title: 'Atoms/Callout Badge',
  component: CalloutBadge,
  argTypes: {
    type: {
      control: 'select',
      options: ['info1', 'info2', 'info3', 'danger', 'neutral'],
    },
    text: {
      control: 'text',
    },
    icon: {
      control: 'select',
      options: [
        'AddressBook',
        'AirplaneInFlight',
        'PenNib',
        'SealWarning',
        'Skull',
        'Bell',
        'Book',
        'Camera',
        'Coffee',
        'Heart',
        'Lightning',
        'Star',
        'Trophy',
        'User',
      ],
      mapping: {
        AddressBook,
        AirplaneInFlight,
        PenNib,
        SealWarning,
        Skull,
        Bell,
        Book,
        Camera,
        Coffee,
        Heart,
        Lightning,
        Star,
        Trophy,
        User,
      },
    },
  },
} satisfies Meta<typeof CalloutBadge>;

type Story = StoryObj<typeof CalloutBadge>;

export const Default: Story = {
  args: {
    type: 'info1',
    icon: AddressBook,
    text: 'Default Badge',
  },
};

export const Info1: Story = {
  args: {
    type: 'info1',
    icon: AddressBook,
    text: 'Info 1 Badge',
  },
};

export const Info2: Story = {
  args: {
    type: 'info2',
    icon: AirplaneInFlight,
    text: 'Info 2 Badge',
  },
};

export const Info3: Story = {
  args: {
    type: 'info3',
    icon: SealWarning,
    text: 'Info 3 Badge',
  },
};

export const Danger: Story = {
  args: {
    type: 'danger',
    icon: Skull,
    text: 'Danger Badge',
  },
};

export const Neutral: Story = {
  args: {
    type: 'neutral',
    icon: PenNib,
    text: 'Neutral Badge',
  },
};

export const WithDifferentIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <CalloutBadge type="info1" icon={Bell} text="Notification" />
      <CalloutBadge type="info2" icon={Book} text="Document" />
      <CalloutBadge type="info3" icon={Camera} text="Photo" />
      <CalloutBadge type="danger" icon={Lightning} text="Warning" />
      <CalloutBadge type="neutral" icon={Coffee} text="Break" />
    </div>
  ),
};

export const WithLongText: Story = {
  args: {
    type: 'info1',
    icon: Heart,
    text: 'This is a callout badge with a longer text that might wrap',
  },
};

export const WithCustomSize: Story = {
  args: {
    type: 'info1',
    icon: Star,
    text: 'Custom Size',
    className: 'p-8',
  },
};

export const InteractiveExample: Story = {
  args: {
    type: 'info1',
    icon: Trophy,
    text: 'Try changing the type, icon, and text!',
  },
};
