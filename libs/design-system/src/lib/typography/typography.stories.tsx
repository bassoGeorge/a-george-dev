import { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  BodyXl,
  BodyLg,
  BodyMd,
  Body,
  BodySm,
  BodyXs,
  Interface2Xl,
  InterfaceXl,
  InterfaceLg,
  InterfaceMd,
  Interface,
  InterfaceSm,
  PBodyLg,
  PBodyMd,
  PBody,
  PBodySm,
  PBodyXs,
} from './typography-components';

export default {
  title: 'Atoms/Typography',
  component: Text,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body-xl',
        'body-lg',
        'body-md',
        'body',
        'body-sm',
        'body-xs',
        'interface-2xl',
        'interface-xl',
        'interface-lg',
        'interface-md',
        'interface',
        'interface-sm',
        'p-body-lg',
        'p-body-md',
        'p-body',
        'p-body-sm',
        'p-body-xs',
      ],
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'],
    },
  },
} satisfies Meta<typeof Text>;

type Story = StoryObj<typeof Text>;

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading1>Heading Level 1</Heading1>
      <Heading2>Heading Level 2</Heading2>
      <Heading3>Heading Level 3</Heading3>
      <Heading4>Heading Level 4</Heading4>
      <Heading5>Heading Level 5</Heading5>
      <Heading6>Heading Level 6</Heading6>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div className="space-y-4">
      <BodyXl>Body Extra Large Text</BodyXl>
      <BodyLg>Body Large Text</BodyLg>
      <BodyMd>Body Medium Text</BodyMd>
      <Body>Body Text</Body>
      <BodySm>Body Small Text</BodySm>
      <BodyXs>Body Extra Small Text</BodyXs>
    </div>
  ),
};

export const InterfaceText: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Interface2Xl>Interface 2XL Text</Interface2Xl>
      </div>
      <div>
        <InterfaceXl>Interface XL Text</InterfaceXl>
      </div>
      <div>
        <InterfaceLg>Interface Large Text</InterfaceLg>
      </div>
      <div>
        <InterfaceMd>Interface Medium Text</InterfaceMd>
      </div>
      <div>
        <Interface>Interface Text</Interface>
      </div>
      <div>
        <InterfaceSm>Interface Small Text</InterfaceSm>
      </div>
    </div>
  ),
};

export const ParagraphText: Story = {
  render: () => (
    <div className="space-y-4">
      <PBodyLg>
        Paragraph Body Large Text - Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </PBodyLg>
      <PBodyMd>
        Paragraph Body Medium Text - Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </PBodyMd>
      <PBody>
        Paragraph Body Text - Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </PBody>
      <PBodySm>
        Paragraph Body Small Text - Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </PBodySm>
      <PBodyXs>
        Paragraph Body Extra Small Text - Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua.
      </PBodyXs>
    </div>
  ),
};

export const TextWithCustomTag: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Text variant="h1" as="p">
          This is an h1 styled text rendered as a paragraph
        </Text>
      </div>
      <div>
        <Text variant="body-lg" as="span">
          This is a body-lg styled text rendered as a span
        </Text>
      </div>
      <div>
        <Text variant="interface" as="small">
          This is an interface styled text rendered as small
        </Text>
      </div>
    </div>
  ),
};

export const InteractiveExample: Story = {
  args: {
    variant: 'body',
    children:
      'This is an interactive example. Try changing the variant and tag!',
  },
};
