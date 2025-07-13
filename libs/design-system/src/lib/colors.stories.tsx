import { HTMLAttributes } from 'react';
import {
  BodyMd,
  Heading3,
  Heading4,
  InterfaceMd,
} from './typography/typography-components';
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
      } border-medium grid h-9 w-12 place-items-center border-line`}
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
      <Swatch bgClass="bg-page-0" />
      <Swatch bgClass="bg-page-1" />
      <Swatch bgClass="bg-page-2" />
      <Swatch bgClass="bg-page-3" />
      <Swatch bgClass="bg-page-4" />

      <InterfaceMd>Neutral</InterfaceMd>
      <Swatch bgClass="bg-neutral" textClass="text-neutral-inverse" />
      <Swatch bgClass="bg-neutral-subtle" textClass="text-neutral-inverse" />
      <Swatch bgClass="bg-neutral-subtlest" textClass="text-neutral-inverse" />
      <div />
      <div />

      <InterfaceMd>Neutral Inverse</InterfaceMd>
      <Swatch bgClass="bg-neutral-inverse" />
      <Swatch bgClass="bg-neutral-inverse-subtle" />
      <Swatch bgClass="bg-neutral-inverse-subtlest" />
      <div />
      <div />

      <InterfaceMd>Line</InterfaceMd>
      <Swatch bgClass="bg-line" textClass={rTInverse} />
      <Swatch bgClass="bg-line-dark" textClass={rTInverse} />
      <div />
      <div />
      <div />

      <InterfaceMd>Accent</InterfaceMd>
      <Swatch bgClass="bg-accent" textClass="text-neutral-inverse" />
      <Swatch bgClass="bg-accent-subtle" />
      <div />
      <div />
      <div />

      <InterfaceMd>Alt Accent</InterfaceMd>
      <Swatch bgClass="bg-alt-accent" textClass="text-neutral-inverse" />
      <Swatch bgClass="bg-alt-accent-subtle" />
      <div />
      <div />
      <div />

      <InterfaceMd>Danger</InterfaceMd>
      <Swatch bgClass="bg-danger" textClass="text-neutral-inverse" />
      <Swatch bgClass="bg-danger-bg" />
      <Swatch bgClass="bg-danger-fg" textClass="text-neutral-inverse" />
      <div />
      <div />
    </div>
  ),
};

export const NewSystem: Story = {
  render: () => (
    <div
      className="inline-grid items-center justify-items-end gap-7"
      style={{ gridTemplateColumns: 'max-content repeat(3, minmax(0, 1fr)' }}
    >
      <InterfaceMd>Primary</InterfaceMd>
      <Swatch bgClass="bg-primary" textClass="text-primary-foreground" />
      <Swatch bgClass="bg-primary-subtle" textClass="text-primary-foreground" />
      <div />

      <InterfaceMd>Secondary</InterfaceMd>
      <Swatch bgClass="bg-secondary" textClass="text-secondary-foreground" />
      <Swatch
        bgClass="bg-secondary-subtle"
        textClass="text-secondary-foreground"
      />
      <div />

      <InterfaceMd>Destructive</InterfaceMd>
      <Swatch
        bgClass="bg-destructive"
        textClass="text-destructive-foreground"
      />
      <Swatch
        bgClass="bg-destructive-subtle"
        textClass="text-destructive-foreground"
      />
      <div />
    </div>
  ),
};

export const AnotherNewSystem: Story = {
  render: () => (
    <div
      className="grid items-center justify-items-end gap-7"
      style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr)' }}
    >
      <NSwatch className="bg-(--nc-page-0)">
        <StandardText />
      </NSwatch>

      <NSwatch className="bg-(--nc-page-1)">
        <StandardText />
      </NSwatch>

      <NSwatch className="bg-(--nc-page-2)">
        <StandardText />
      </NSwatch>

      <NSwatch className="bg-(--nc-page-3)">
        <StandardText />
      </NSwatch>

      <NSwatch className="bg-(--nc-page-4)">
        <StandardText />
      </NSwatch>

      <NSwatch className="bg-(--nc-primary-100)">
        <StandardText />
        <PrimaryText />
      </NSwatch>

      <NSwatch className="bg-(--nc-primary-200)">
        <StandardText />
        <PrimaryText />
      </NSwatch>

      <NSwatch className="bg-(--nc-primary-300)">
        <StandardText />
        <PrimaryText />
      </NSwatch>
    </div>
  ),
};

function StandardText() {
  return (
    <>
      <Heading3 className="text-(--nc-neutral-strong)">Neutral Strong</Heading3>
      <Heading4 className="text-(--nc-neutral)">Neutral</Heading4>
      <p className="text-(--nc-neutral-subdued)">Neutral Subdued</p>
      <p className="text-(--nc-neutral-disabled)" aria-disabled>
        Neutral Disabled
      </p>
    </>
  );
}

function PrimaryText() {
  return (
    <>
      <p className="text-(--nc-primary-700)">Primary 700</p>
      <p className="text-(--nc-primary-800)">Primary 800</p>
      <p className="text-(--nc-primary-900)">Primary 900</p>
    </>
  );
}

function NSwatch({ className, children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`${className} ${BodyMd.classes} grid place-items-center p-4`}
    >
      {children}
    </div>
  );
}
