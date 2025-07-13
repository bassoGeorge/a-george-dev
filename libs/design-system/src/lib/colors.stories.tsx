import { StoryObj } from '@storybook/react';
import { HTMLAttributes } from 'react';
import { Body, BodyMd } from './typography/typography-components';

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
      } border-medium border-line grid h-9 w-12 place-items-center`}
    >
      {content}
    </div>
  );
}

// export const RawColors: Story = {
//   render: () => (
//     <div
//       className="inline-grid items-center justify-items-end gap-7"
//       style={{ gridTemplateColumns: 'max-content repeat(5, minmax(0, 1fr)' }}
//     >
//       <InterfaceMd>Primary Accent</InterfaceMd>
//       <Swatch bgClass="bg-rc-p-accent-100" textClass={rTNormal} />
//       <Swatch bgClass="bg-rc-p-accent-200" textClass={rTNormal} />
//       <Swatch bgClass="bg-rc-p-accent-300" textClass={rTNormal} />
//       <Swatch bgClass="bg-rc-p-accent-400" textClass={rTInverse} />
//       <Swatch bgClass="bg-rc-p-accent-500" textClass={rTInverse} />

//       <InterfaceMd>Secondary Accent</InterfaceMd>
//       <Swatch bgClass="bg-rc-s-accent-100" textClass={rTNormal} />
//       <Swatch bgClass="bg-rc-s-accent-200" textClass={rTNormal} />
//       <Swatch bgClass="bg-rc-s-accent-300" textClass={rTNormal} />
//       <Swatch bgClass="bg-rc-s-accent-400" textClass={rTInverse} />
//       <Swatch bgClass="bg-rc-s-accent-500" textClass={rTInverse} />

//       <InterfaceMd>Parchment</InterfaceMd>
//       <Swatch bgClass="bg-rc-parchment-100" textClass={rTNormal} />
//       <Swatch bgClass="bg-rc-parchment-200" textClass={rTNormal} />
//       <Swatch bgClass="bg-rc-parchment-300" textClass={rTNormal} />
//       <Swatch bgClass="bg-rc-parchment-400" textClass={rTNormal} />
//       <Swatch bgClass="bg-rc-parchment-500" textClass={rTNormal} />

//       <InterfaceMd>Timber</InterfaceMd>
//       <Swatch bgClass="bg-rc-timber-100" textClass={rTInverse} />
//       <Swatch bgClass="bg-rc-timber-200" textClass={rTInverse} />
//       <Swatch bgClass="bg-rc-timber-300" textClass={rTInverse} />
//       <Swatch bgClass="bg-rc-timber-400" textClass={rTInverse} />
//       <Swatch bgClass="bg-rc-timber-500" textClass={rTInverse} />

//       <InterfaceMd>Dark Neutral</InterfaceMd>
//       <Swatch bgClass="bg-rc-d-neutral-100" textClass={rTInverse} />
//       <Swatch bgClass="bg-rc-d-neutral-200" textClass={rTInverse} />
//       <Swatch bgClass="bg-rc-d-neutral-300" textClass={rTInverse} />
//       <Swatch bgClass="bg-rc-d-neutral-400" textClass={rTInverse} />
//       <Swatch bgClass="bg-rc-d-neutral-500" textClass={rTInverse} />

//       <InterfaceMd>Light Neutral</InterfaceMd>
//       <Swatch bgClass="bg-rc-l-neutral-100" textClass={rTNormal} />
//       <Swatch bgClass="bg-rc-l-neutral-200" textClass={rTNormal} />
//       <Swatch bgClass="bg-rc-l-neutral-300" textClass={rTNormal} />
//       <Swatch bgClass="bg-rc-l-neutral-400" textClass={rTNormal} />
//       <Swatch bgClass="bg-rc-l-neutral-500" textClass={rTNormal} />

//       <InterfaceMd>Shadow</InterfaceMd>
//       <Swatch bgClass="bg-rc-shadow-1" textClass={rTInverse} />
//       <Swatch bgClass="bg-rc-shadow-2" textClass={rTInverse} />
//       <Swatch bgClass="bg-rc-shadow-3" textClass={rTInverse} />
//       <Swatch bgClass="bg-rc-shadow-4" textClass={rTInverse} />
//       <Swatch bgClass="bg-rc-shadow-5" textClass={rTInverse} />

//       <InterfaceMd>Red</InterfaceMd>
//       <Swatch bgClass="bg-rc-red-100" textClass={rTNormal} />
//       <Swatch bgClass="bg-rc-red-200" textClass={rTNormal} />
//       <div></div>
//       <Swatch bgClass="bg-rc-red-400" textClass={rTInverse} />
//       <Swatch bgClass="bg-rc-red-500" textClass={rTInverse} />

//       <InterfaceMd>Line</InterfaceMd>
//       <Swatch bgClass="bg-rc-line-main" textClass={rTInverse} />
//       <Swatch bgClass="bg-rc-line-inverse" textClass={rTInverse} />
//     </div>
//   ),
// };

// export const ContextualColors: Story = {
//   render: () => (
//     <div
//       className="inline-grid items-center justify-items-end gap-7"
//       style={{ gridTemplateColumns: 'max-content repeat(5, minmax(0, 1fr)' }}
//     >
//       <InterfaceMd>Page</InterfaceMd>
//       <Swatch bgClass="bg-page-0" />
//       <Swatch bgClass="bg-page-1" />
//       <Swatch bgClass="bg-page-2" />
//       <Swatch bgClass="bg-page-3" />
//       <Swatch bgClass="bg-page-4" />

//       <InterfaceMd>Neutral</InterfaceMd>
//       <Swatch bgClass="bg-neutral" textClass="text-neutral-inverse" />
//       <Swatch bgClass="bg-neutral-subtle" textClass="text-neutral-inverse" />
//       <Swatch bgClass="bg-neutral-subtlest" textClass="text-neutral-inverse" />
//       <div />
//       <div />

//       <InterfaceMd>Neutral Inverse</InterfaceMd>
//       <Swatch bgClass="bg-neutral-inverse" />
//       <Swatch bgClass="bg-neutral-inverse-subtle" />
//       <Swatch bgClass="bg-neutral-inverse-subtlest" />
//       <div />
//       <div />

//       <InterfaceMd>Line</InterfaceMd>
//       <Swatch bgClass="bg-line" textClass={rTInverse} />
//       <Swatch bgClass="bg-line-dark" textClass={rTInverse} />
//       <div />
//       <div />
//       <div />

//       <InterfaceMd>Accent</InterfaceMd>
//       <Swatch bgClass="bg-accent" textClass="text-neutral-inverse" />
//       <Swatch bgClass="bg-accent-subtle" />
//       <div />
//       <div />
//       <div />

//       <InterfaceMd>Alt Accent</InterfaceMd>
//       <Swatch bgClass="bg-alt-accent" textClass="text-neutral-inverse" />
//       <Swatch bgClass="bg-alt-accent-subtle" />
//       <div />
//       <div />
//       <div />

//       <InterfaceMd>Danger</InterfaceMd>
//       <Swatch bgClass="bg-danger" textClass="text-neutral-inverse" />
//       <Swatch bgClass="bg-danger-bg" />
//       <Swatch bgClass="bg-danger-fg" textClass="text-neutral-inverse" />
//       <div />
//       <div />
//     </div>
//   ),
// };

// export const NewSystem: Story = {
//   render: () => (
//     <div
//       className="inline-grid items-center justify-items-center gap-7"
//       style={{ gridTemplateColumns: 'max-content repeat(3, minmax(0, 1fr)' }}
//     >
//       <InterfaceMd>Primary</InterfaceMd>
//       <Swatch bgClass="bg-primary" textClass="text-primary-foreground" />
//       <Swatch bgClass="bg-primary-subtle" textClass="text-primary-foreground" />
//       <div />

//       <InterfaceMd>Secondary</InterfaceMd>
//       <Swatch bgClass="bg-secondary" textClass="text-secondary-foreground" />
//       <Swatch
//         bgClass="bg-secondary-subtle"
//         textClass="text-secondary-foreground"
//       />
//       <div />

//       <InterfaceMd>Destructive</InterfaceMd>
//       <Swatch
//         bgClass="bg-destructive"
//         textClass="text-destructive-foreground"
//       />
//       <Swatch
//         bgClass="bg-destructive-subtle"
//         textClass="text-destructive-foreground"
//       />
//       <div />
//     </div>
//   ),
// };

export const AnotherNewSystem: Story = {
  render: () => (
    <div
      className="grid items-center justify-items-end gap-7"
      style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr)' }}
    >
      <NSwatch className="bg-page-0">
        <StandardText />
        <ColoredText />
      </NSwatch>

      <NSwatch className="bg-page-1">
        <StandardText />
        <ColoredText />
      </NSwatch>

      <NSwatch className="bg-page-2">
        <StandardText />
        <ColoredText />
      </NSwatch>

      <NSwatch className="bg-page-3">
        <StandardText />
        <ColoredText />
      </NSwatch>

      <NSwatch className="bg-page-4">
        <StandardText />
        <ColoredText />
      </NSwatch>

      {/* Primary */}
      <NSwatch className="bg-primary-surface-0">
        {/* <StandardText /> */}
        <p className="text-primary-onsurface-0">Primary onsurface-0</p>
      </NSwatch>

      <NSwatch className="bg-primary-surface">
        {/* <StandardText /> */}
        <p className="text-primary-onsurface">Primary onsurface</p>
      </NSwatch>

      <NSwatch className="bg-primary-surface-2">
        {/* <StandardText /> */}
        <p className="text-primary-onsurface-2">Primary onsurface-2</p>
      </NSwatch>
      <div></div>
      <div></div>

      {/* Secondary */}
      <NSwatch className="bg-secondary-surface-0">
        {/* <StandardText /> */}
        <p className="text-secondary-onsurface-0">Secondary onsurface-0</p>
      </NSwatch>

      <NSwatch className="bg-secondary-surface">
        {/* <StandardText /> */}
        <p className="text-secondary-onsurface">Secondary onsurface</p>
      </NSwatch>

      <NSwatch className="bg-secondary-surface-2">
        {/* <StandardText /> */}
        <p className="text-secondary-onsurface-2">Secondary onsurface-2</p>
      </NSwatch>
      <div></div>
      <div></div>

      {/* Destructive */}
      <NSwatch className="bg-destructive-surface-0">
        {/* <StandardText /> */}
        <p className="text-destructive-onsurface-0">Destructive onsurface-0</p>
      </NSwatch>

      <NSwatch className="bg-destructive-surface">
        {/* <StandardText /> */}
        <p className="text-destructive-onsurface">Destructive onsurface</p>
      </NSwatch>

      <NSwatch className="bg-destructive-surface-2">
        {/* <StandardText /> */}
        <p className="text-destructive-onsurface-2">Destructive onsurface-2</p>
      </NSwatch>
      <div></div>
      <div></div>

      {/* Warning */}
      <NSwatch className="bg-warning-surface-0">
        {/* <StandardText /> */}
        <p className="text-warning-onsurface-0">Warning onsurface-0</p>
      </NSwatch>

      <NSwatch className="bg-warning-surface">
        {/* <StandardText /> */}
        <p className="text-warning-onsurface">Warning onsurface</p>
      </NSwatch>

      <NSwatch className="bg-warning-surface-2">
        {/* <StandardText /> */}
        <p className="text-warning-onsurface-2">Warning onsurface-2</p>
      </NSwatch>
      <div></div>
      <div></div>

      {/* Info */}
      <NSwatch className="bg-info-surface-0">
        {/* <StandardText /> */}
        <p className="text-info-onsurface-0">Info onsurface-0</p>
      </NSwatch>

      <NSwatch className="bg-info-surface">
        {/* <StandardText /> */}
        <p className="text-info-onsurface">Info onsurface</p>
      </NSwatch>

      <NSwatch className="bg-info-surface-2">
        {/* <StandardText /> */}
        <p className="text-info-onsurface-2">Info onsurface-2</p>
      </NSwatch>
      <div></div>
      <div></div>
    </div>
  ),
};

function StandardText() {
  return (
    <>
      <p className="text-neutral-strong)">Neutral Strong</p>
      <p className="text-neutral)">Neutral</p>
      <p className="text-neutral-subdued)">Neutral Subdued</p>
      <p className="text-neutral-disabled)" aria-disabled>
        Neutral Disabled
      </p>
    </>
  );
}

function ColoredText() {
  return (
    <>
      <Body />
      <Body className="text-primary-foreground">Primary foreground</Body>
      <Body className="text-primary-foreground-2">Primary foreground-2</Body>
      <Body className="text-primary-foreground-3">Primary foreground-3</Body>
      <Body></Body>
      <Body className="text-secondary-foreground">Secondary foreground</Body>
      <Body className="text-secondary-foreground-2">
        Secondary foreground-2
      </Body>
      <Body className="text-secondary-foreground-3">
        Secondary foreground-3
      </Body>
      <Body></Body>
      <Body className="text-destructive-foreground">
        Destructive foreground
      </Body>
      <Body className="text-destructive-foreground-2">
        Destructive foreground-2
      </Body>
      <Body className="text-destructive-foreground-3">
        Destructive foreground-3
      </Body>
      <Body></Body>
      <Body className="text-warning-foreground">Warning foreground</Body>
      <Body className="text-warning-foreground-2">Warning foreground-2</Body>
      <Body className="text-warning-foreground-3">Warning foreground-3</Body>
      <Body></Body>
      <Body className="text-info-foreground">Info foreground</Body>
      <Body className="text-info-foreground-2">Info foreground-2</Body>
      <Body className="text-info-foreground-3">Info foreground-3</Body>
    </>
  );
}

function NSwatch({ className, children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`${className} ${BodyMd.classes} grid place-items-center gap-1 p-4`}
    >
      {children}
    </div>
  );
}
