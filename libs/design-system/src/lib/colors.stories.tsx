import { StoryObj } from '@storybook/react-vite';
import { HTMLAttributes, createContext, useContext } from 'react';
import {
  Body,
  BodyLg,
  BodyMd,
  BodyXs,
} from './typography/typography-components';
import { cn } from './utils';

export default {
  title: 'Foundation/Colors',
};

type Story = StoryObj;

export const AnotherNewSystem: Story = {
  render: () => (
    <div
      className="grid items-center justify-items-end gap-7"
      style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr)' }}
    >
      <NSwatch className="bg-page-0">
        <TextSample />
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

export const LightMode: Story = {
  globals: { theme: 'light' },
  render: () => (
    <div className="grid grid-cols-5 gap-2">
      <PageSample className="bg-page-0">
        <TextSample a11yFailures={['warning-foreground']} />
      </PageSample>
      <PageSample className="bg-page-1">
        <TextSample a11yFailures={['warning-foreground']} />
      </PageSample>
      <PageSample className="bg-page-2">
        <TextSample a11yFailures={['warning-foreground']} />
      </PageSample>
      <PageSample className="bg-page-3">
        <TextSample a11yFailures={['warning-foreground']} />
      </PageSample>
      <PageSample className="bg-page-4">
        <TextSample a11yFailures={['warning-foreground']} />
      </PageSample>
    </div>
  ),
};

function StandardText() {
  return (
    <>
      <p className="text-neutral-strong">Neutral Strong</p>
      <p className="text-neutral">Neutral</p>
      <p className="text-neutral-subdued">Neutral Subdued</p>
      <p className="text-neutral-disabled" aria-disabled>
        Neutral Disabled
      </p>
      <TextRow className="text-neutral-disabled" />
      <TextRow className="text-neutral-disabled" />
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

function PageSample({
  className,
  children,
  ...otherAttributes
}: HTMLAttributes<HTMLDivElement>) {
  const pageLabel = className.replace('bg-', '');
  return (
    <div className={cn(className, 'p-3')} {...otherAttributes}>
      <BodyLg className="mb-3">surface: {pageLabel}</BodyLg>
      {children}
    </div>
  );
}

function TextSample({ a11yFailures = [] }: { a11yFailures?: string[] }) {
  return (
    <A11yFailureContext.Provider value={a11yFailures}>
      <div className="flex flex-col gap-5">
        <TextSection>
          <TextRow className="text-neutral-strong" />
          <TextRow className="text-neutral" />
          <TextRow className="text-neutral-subdued" />
          <TextRow className="text-neutral-disabled" aria-disabled />
        </TextSection>
        <TextSection>
          <TextRow className="text-primary-foreground" />
          <TextRow className="text-primary-foreground-2" />
          <TextRow className="text-primary-foreground-3" />
        </TextSection>
        <TextSection>
          <TextRow className="text-secondary-foreground" />
          <TextRow className="text-secondary-foreground-2" />
          <TextRow className="text-secondary-foreground-3" />
        </TextSection>
        <TextSection>
          <TextRow className="text-destructive-foreground" />
          <TextRow className="text-destructive-foreground-2" />
          <TextRow className="text-destructive-foreground-3" />
        </TextSection>
        <TextSection>
          <TextRow className="text-warning-foreground" />
          <TextRow className="text-warning-foreground-2" />
          <TextRow className="text-warning-foreground-3" />
        </TextSection>
        <TextSection>
          <TextRow className="text-info-foreground" />
          <TextRow className="text-info-foreground-2" />
          <TextRow className="text-info-foreground-3" />
        </TextSection>
      </div>
    </A11yFailureContext.Provider>
  );
}

const A11yFailureContext = createContext<string[]>([]);

function TextSection({ children }: React.PropsWithChildren) {
  return <section className="flex flex-col gap-2">{children}</section>;
}

function TextRow({
  className,
  ...attributes
}: Omit<HTMLAttributes<HTMLParagraphElement>, 'children'>) {
  const a11yFailures = useContext(A11yFailureContext);
  const label = className.replace('text-', '');
  return (
    <div className="flex items-center gap-1">
      <div className="w-4">
        {a11yFailures.includes(label) && <BodyXs>❌</BodyXs>}
      </div>
      <BodyMd {...attributes} className={className}>
        {label}
      </BodyMd>
    </div>
  );
}
