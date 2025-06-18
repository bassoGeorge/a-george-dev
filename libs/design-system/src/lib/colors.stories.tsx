import { BodyMd, InterfaceMd } from '@ageorgedev/atoms';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Foundation/Colors',
};

type Story = StoryObj;

const rTNormal = 'text-rc-d-neutral-500';
const rTInverse = 'text-rc-l-neutral-500';

function Swatch({
  bgClass,
  textClass,
}: {
  bgClass: string;
  textClass?: string;
}) {
  const content = bgClass.replace('bg-', '*-');

  return (
    <div
      className={`${bgClass} ${textClass ?? ''} ${
        BodyMd.classes
      } border-medium grid h-9 w-12 place-items-center border-cc-line`}
    >
      {content}
    </div>
  );
}

export const RawColors: Story = {
  render: () => (
    <div
      className="inline-grid items-center justify-items-end gap-7"
      style={{ gridTemplateColumns: 'max-content repeat(5, minmax(0, 1fr)' }}
    >
      <InterfaceMd>Primary Accent</InterfaceMd>
      <Swatch bgClass="bg-rc-p-accent-100" textClass={rTNormal} />
      <Swatch bgClass="bg-rc-p-accent-200" textClass={rTNormal} />
      <Swatch bgClass="bg-rc-p-accent-300" textClass={rTNormal} />
      <Swatch bgClass="bg-rc-p-accent-400" textClass={rTInverse} />
      <Swatch bgClass="bg-rc-p-accent-500" textClass={rTInverse} />

      <InterfaceMd>Secondary Accent</InterfaceMd>
      <Swatch bgClass="bg-rc-s-accent-100" textClass={rTNormal} />
      <Swatch bgClass="bg-rc-s-accent-200" textClass={rTNormal} />
      <Swatch bgClass="bg-rc-s-accent-300" textClass={rTNormal} />
      <Swatch bgClass="bg-rc-s-accent-400" textClass={rTInverse} />
      <Swatch bgClass="bg-rc-s-accent-500" textClass={rTInverse} />

      <InterfaceMd>Parchment</InterfaceMd>
      <Swatch bgClass="bg-rc-parchment-100" textClass={rTNormal} />
      <Swatch bgClass="bg-rc-parchment-200" textClass={rTNormal} />
      <Swatch bgClass="bg-rc-parchment-300" textClass={rTNormal} />
      <Swatch bgClass="bg-rc-parchment-400" textClass={rTNormal} />
      <Swatch bgClass="bg-rc-parchment-500" textClass={rTNormal} />

      <InterfaceMd>Timber</InterfaceMd>
      <Swatch bgClass="bg-rc-timber-100" textClass={rTInverse} />
      <Swatch bgClass="bg-rc-timber-200" textClass={rTInverse} />
      <Swatch bgClass="bg-rc-timber-300" textClass={rTInverse} />
      <Swatch bgClass="bg-rc-timber-400" textClass={rTInverse} />
      <Swatch bgClass="bg-rc-timber-500" textClass={rTInverse} />

      <InterfaceMd>Dark Neutral</InterfaceMd>
      <Swatch bgClass="bg-rc-d-neutral-100" textClass={rTInverse} />
      <Swatch bgClass="bg-rc-d-neutral-200" textClass={rTInverse} />
      <Swatch bgClass="bg-rc-d-neutral-300" textClass={rTInverse} />
      <Swatch bgClass="bg-rc-d-neutral-400" textClass={rTInverse} />
      <Swatch bgClass="bg-rc-d-neutral-500" textClass={rTInverse} />

      <InterfaceMd>Light Neutral</InterfaceMd>
      <Swatch bgClass="bg-rc-l-neutral-100" textClass={rTNormal} />
      <Swatch bgClass="bg-rc-l-neutral-200" textClass={rTNormal} />
      <Swatch bgClass="bg-rc-l-neutral-300" textClass={rTNormal} />
      <Swatch bgClass="bg-rc-l-neutral-400" textClass={rTNormal} />
      <Swatch bgClass="bg-rc-l-neutral-500" textClass={rTNormal} />

      <InterfaceMd>Shadow</InterfaceMd>
      <Swatch bgClass="bg-rc-shadow-1" textClass={rTInverse} />
      <Swatch bgClass="bg-rc-shadow-2" textClass={rTInverse} />
      <Swatch bgClass="bg-rc-shadow-3" textClass={rTInverse} />
      <Swatch bgClass="bg-rc-shadow-4" textClass={rTInverse} />
      <Swatch bgClass="bg-rc-shadow-5" textClass={rTInverse} />

      <InterfaceMd>Red</InterfaceMd>
      <Swatch bgClass="bg-rc-red-100" textClass={rTNormal} />
      <Swatch bgClass="bg-rc-red-200" textClass={rTNormal} />
      <div></div>
      <Swatch bgClass="bg-rc-red-400" textClass={rTInverse} />
      <Swatch bgClass="bg-rc-red-500" textClass={rTInverse} />

      <InterfaceMd>Line</InterfaceMd>
      <Swatch bgClass="bg-rc-line-main" textClass={rTInverse} />
      <Swatch bgClass="bg-rc-line-inverse" textClass={rTInverse} />
    </div>
  ),
};

export const ContextualColors: Story = {
  render: () => (
    <div
      className="inline-grid items-center justify-items-end gap-7"
      style={{ gridTemplateColumns: 'max-content repeat(5, minmax(0, 1fr)' }}
    >
      <InterfaceMd>Page</InterfaceMd>
      <Swatch bgClass="bg-cc-page-0" />
      <Swatch bgClass="bg-cc-page-1" />
      <Swatch bgClass="bg-cc-page-2" />
      <Swatch bgClass="bg-cc-page-3" />
      <Swatch bgClass="bg-cc-page-4" />

      <InterfaceMd>Neutral</InterfaceMd>
      <Swatch bgClass="bg-cc-neutral" textClass="text-cc-neutral-inverse" />
      <Swatch
        bgClass="bg-cc-neutral-subtle"
        textClass="text-cc-neutral-inverse"
      />
      <Swatch
        bgClass="bg-cc-neutral-subtlest"
        textClass="text-cc-neutral-inverse"
      />
      <div />
      <div />

      <InterfaceMd>Neutral Inverse</InterfaceMd>
      <Swatch bgClass="bg-cc-neutral-inverse" />
      <Swatch bgClass="bg-cc-neutral-inverse-subtle" />
      <Swatch bgClass="bg-cc-neutral-inverse-subtlest" />
      <div />
      <div />

      <InterfaceMd>Shadow</InterfaceMd>
      <Swatch bgClass="bg-cc-shadow-far" />
      <Swatch bgClass="bg-cc-shadow-normal" textClass={rTInverse} />
      <Swatch bgClass="bg-cc-shadow-near" textClass={rTInverse} />
      <div />
      <div />

      <InterfaceMd>Line</InterfaceMd>
      <Swatch bgClass="bg-cc-line" textClass={rTInverse} />
      <Swatch bgClass="bg-cc-line-dark" textClass={rTInverse} />
      <div />
      <div />
      <div />

      <InterfaceMd>Accent</InterfaceMd>
      <Swatch bgClass="bg-cc-accent" textClass="text-cc-neutral-inverse" />
      <Swatch bgClass="bg-cc-accent-subtle" />
      <div />
      <div />
      <div />

      <InterfaceMd>Alt Accent</InterfaceMd>
      <Swatch bgClass="bg-cc-alt-accent" textClass="text-cc-neutral-inverse" />
      <Swatch bgClass="bg-cc-alt-accent-subtle" />
      <div />
      <div />
      <div />

      <InterfaceMd>Danger</InterfaceMd>
      <Swatch bgClass="bg-cc-danger" textClass="text-cc-neutral-inverse" />
      <Swatch bgClass="bg-cc-danger-bg" />
      <Swatch bgClass="bg-cc-danger-fg" textClass="text-cc-neutral-inverse" />
      <div />
      <div />
    </div>
  ),
};
