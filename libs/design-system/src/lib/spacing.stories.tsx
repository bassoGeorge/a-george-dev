import { Interface } from '@ageorgedev/atoms';
import { Spacing } from '@ageorgedev/foundation-styles';
import { StoryObj } from '@storybook/react';
import { compose, map, prop, sortBy, toPairs } from 'ramda';

export default {
  title: 'Foundation/Spacing',
};

type Story = StoryObj;

function SpaceBar({
  className,
  name,
  size,
}: {
  className?: string;
  name: string;
  size: string;
}) {
  return (
    <>
      <Interface>{name}</Interface>
      <div
        className={`${className} bg-cc-accent h-5`}
        style={{ width: size }}
      ></div>
    </>
  );
}

function remToPx(value: string) {
  const numericValue = parseFloat(value);
  if (value.endsWith('rem')) {
    return numericValue * 16;
  } else {
    return numericValue;
  }
}

const spacingValues: Array<{ name: string; value: string; pxValue: number }> =
  compose(
    sortBy(prop('pxValue')),
    map(([name, value]: [string, string]) => ({
      name,
      value,
      pxValue: remToPx(value),
    })),
    toPairs
  )(Spacing);

export const SpacingScale: Story = {
  render: () => (
    <div
      className="inline-grid gap-2 items-center justify-items-start"
      style={{ gridTemplateColumns: 'max-content minmax(0, 1fr)' }}
    >
      {spacingValues.map(({ name, value, pxValue }) => (
        <SpaceBar
          key={name}
          name={`${name} - ${value} - ${pxValue}px`}
          size={value}
        />
      ))}
    </div>
  ),
};
