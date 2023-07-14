import { Meta, StoryObj } from '@storybook/react';
import { CalloutBadge } from './CalloutBadge';
import {
  AddressBook,
  AirplaneInFlight,
  PenNib,
  PencilSlash,
  SealWarning,
  Skull,
} from '@phosphor-icons/react';

export default {
  title: 'Atoms/Callout Badge',
  component: CalloutBadge,
} satisfies Meta<typeof CalloutBadge>;

type Story = StoryObj<typeof CalloutBadge>;

export const Info1Default: Story = {
  render: () => <CalloutBadge icon={AddressBook} text={'Manage this'} />,
};

export const Info2: Story = {
  render: () => (
    <CalloutBadge type="info2" icon={AirplaneInFlight} text={'Awe!'} />
  ),
};

export const Info3: Story = {
  render: () => (
    <CalloutBadge type="info3" icon={SealWarning} text={'Maybe?'} />
  ),
};

export const Danger: Story = {
  render: () => <CalloutBadge type="danger" icon={Skull} text={'Danger fro'} />,
};

export const Neutral: Story = {
  render: () => <CalloutBadge type="neutral" icon={PenNib} text={'Got it'} />,
};
