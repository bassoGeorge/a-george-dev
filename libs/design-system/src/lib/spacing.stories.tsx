import { cn } from '@ageorgedev/toolbelt';
import { StoryObj } from '@storybook/react-vite';
import { Interface } from './typography/typography-components';

export default {
  title: 'Foundation/Spacing',
};

type Story = StoryObj;

const SPACING_VALUES: Array<[string, string, string]> = [
  ['w-0', '0', '0'],
  ['w-px', 'px', '1px'],
  ['w-0_5', '0.5', '2px'],
  ['w-1', '1', '0.25rem'],
  ['w-2', '2', '0.5rem'],
  ['w-3', '3', '0.75rem'],
  ['w-4', '4', '1rem'],
  ['w-5', '5', '1.5rem'],
  ['w-6', '6', '2rem'],
  ['w-7', '7', '3rem'],
  ['w-8', '8', '4rem'],
  ['w-9', '9', '6rem'],
  ['w-10', '10', '8rem'],
  ['w-11', '11', '12rem'],
  ['w-12', '12', '16rem'],
  ['w-13', '13', '24rem'],
  ['w-14', '14', '32rem'],
  ['w-15', '15', '40rem'],
  ['w-16', '16', '48rem'],
  ['w-thin-line', 'thin-line', '1px'],
  ['w-medium-line', 'medium-line', '2px'],
  ['w-thick-line', 'thick-line', '4px'],
];

function SpaceBar({ className, name }: { className: string; name: string }) {
  return (
    <>
      <Interface>{name}</Interface>
      <div className={cn(className, 'h-5 bg-primary-foreground')}></div>
    </>
  );
}

export const SpacingScale: Story = {
  render: () => (
    <div
      className="inline-grid items-center justify-items-start gap-2"
      style={{ gridTemplateColumns: 'max-content minmax(0, 1fr)' }}
    >
      {SPACING_VALUES.map(([className, name, value]) => (
        <SpaceBar
          key={name}
          className={className}
          name={`${name} - ${value}`}
        />
      ))}
    </div>
  ),
};
