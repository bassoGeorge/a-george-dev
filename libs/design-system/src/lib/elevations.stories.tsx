import { cn } from '@ageorgedev/toolbelt';
import { StoryObj } from '@storybook/react-vite';
import { HTMLAttributes } from 'react';
import { BodyMd } from './typography/typography-components';

export default {
  title: 'Foundation/Elevations',
};

type Story = StoryObj;

export const Elevations: Story = {
  render: () => (
    <div>
      <section className={cn('flex flex-wrap gap-5')}>
        <Box className="elv-raised-sm" />
        <Box className="elv-raised-md" />
        <Box className="elv-raised-lg" />
      </section>
      <section className={cn('mt-5 flex flex-wrap gap-5')}>
        <Box className="elv-raised-sm transition-all hover:elv-raised-md" />
        <Box className="elv-raised-md transition-all hover:elv-raised-lg" />
        <Box className="elv-raised-lg" />
      </section>
    </div>
  ),
};

function Box({ className, ...otherProps }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...otherProps}
      className={cn(
        'grid h-10 w-12 place-items-center bg-primary-surface p-3 text-primary-onsurface',
        className
      )}
    >
      <BodyMd>
        {className.split(' ').map((s) => (
          <>
            {s}
            <br />
          </>
        ))}
      </BodyMd>
    </div>
  );
}
