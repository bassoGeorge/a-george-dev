import { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
} from './typography-components';

export default {
  component: Text,
} satisfies Meta<typeof Text>;

type Story = StoryObj<typeof Text>;

export const TextComponentUsage: Story = {
  render: () => (
    <>
      <Text variant={'h1'}>This is an h1</Text>
      <Text variant={'h3'} as="p">
        This is a p tag looking like an h3
      </Text>
      <Text variant={'body-lg'}>This is a natural body-lg</Text>
    </>
  ),
};

export const HeadingComponents: Story = {
  render: () => (
    <>
      <Heading1>Heading level 1</Heading1>
      <Heading2>Heading level 2</Heading2>
      <Heading3>Heading level 3</Heading3>
      <Heading4 as="p">Heading level 4 but switching to a p tag</Heading4>
      <a className={Heading3.classes}>
        An anchor tag using the classes from Heading3
      </a>
    </>
  ),
};
