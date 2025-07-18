import { Meta, StoryObj } from '@storybook/react-vite';
import { CalloutBadge } from './CalloutBadge';
import {
  AddressBookIcon,
  AirplaneInFlightIcon,
  PenNibIcon,
  SealWarningIcon,
  SkullIcon,
  BellIcon,
  BookIcon,
  CameraIcon,
  CoffeeIcon,
  HeartIcon,
  LightningIcon,
  StarIcon,
  TrophyIcon,
  UserIcon,
} from '@phosphor-icons/react/ssr';

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
        AddressBook: AddressBookIcon,
        AirplaneInFlight: AirplaneInFlightIcon,
        PenNib: PenNibIcon,
        SealWarning: SealWarningIcon,
        Skull: SkullIcon,
        Bell: BellIcon,
        Book: BookIcon,
        Camera: CameraIcon,
        Coffee: CoffeeIcon,
        Heart: HeartIcon,
        Lightning: LightningIcon,
        Star: StarIcon,
        Trophy: TrophyIcon,
        User: UserIcon,
      },
    },
  },
} satisfies Meta<typeof CalloutBadge>;

type Story = StoryObj<typeof CalloutBadge>;

export const Default: Story = {
  args: {
    type: 'info1',
    icon: AddressBookIcon,
    text: 'Default Badge',
  },
};

export const Info1: Story = {
  args: {
    type: 'info1',
    icon: AddressBookIcon,
    text: 'Info 1 Badge',
  },
};

export const Info2: Story = {
  args: {
    type: 'info2',
    icon: AirplaneInFlightIcon,
    text: 'Info 2 Badge',
  },
};

export const Info3: Story = {
  args: {
    type: 'info3',
    icon: SealWarningIcon,
    text: 'Info 3 Badge',
  },
};

export const Danger: Story = {
  args: {
    type: 'danger',
    icon: SkullIcon,
    text: 'Danger Badge',
  },
};

export const Neutral: Story = {
  args: {
    type: 'neutral',
    icon: PenNibIcon,
    text: 'Neutral Badge',
  },
};

export const WithDifferentIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <CalloutBadge type="info1" icon={BellIcon} text="Notification" />
      <CalloutBadge type="info2" icon={BookIcon} text="Document" />
      <CalloutBadge type="info3" icon={CameraIcon} text="Photo" />
      <CalloutBadge type="danger" icon={LightningIcon} text="Warning" />
      <CalloutBadge type="neutral" icon={CoffeeIcon} text="Break" />
    </div>
  ),
};

export const WithLongText: Story = {
  args: {
    type: 'info1',
    icon: HeartIcon,
    text: 'This is a callout badge with a longer text that might wrap',
  },
};

export const WithCustomSize: Story = {
  args: {
    type: 'info1',
    icon: StarIcon,
    text: 'Custom Size',
    className: 'p-8',
  },
};

export const InteractiveExample: Story = {
  args: {
    type: 'info1',
    icon: TrophyIcon,
    text: 'Try changing the type, icon, and text!',
  },
};
