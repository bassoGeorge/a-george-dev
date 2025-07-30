import { StoryObj } from '@storybook/react-vite';
import { HTMLAttributes, createContext, useContext } from 'react';
import {
  BodyMd,
  BodyXs,
  InterfaceXl,
} from './typography/typography-components';
import { cn } from './utils';

export default {
  title: 'Foundation/Colors',
};

type Story = StoryObj;

export const LightTheme: Story = {
  globals: { theme: 'light' },
  render: () => (
    <Layout>
      <PageSample className="bg-page-0">
        <ColorSamples a11yFailures={['warning-foreground']} />
      </PageSample>
      <PageSample className="bg-page-1">
        <ColorSamples a11yFailures={['warning-foreground']} />
      </PageSample>
      <PageSample className="bg-page-2">
        <ColorSamples a11yFailures={['warning-foreground']} />
      </PageSample>
      <PageSample className="bg-page-3">
        <ColorSamples a11yFailures={['warning-foreground']} />
      </PageSample>
      <PageSample className="bg-page-4">
        <ColorSamples a11yFailures={['warning-foreground']} />
      </PageSample>
    </Layout>
  ),
};

export const DarkTheme: Story = {
  globals: { theme: 'dark' },
  render: () => (
    <Layout>
      <PageSample className="bg-page-0">
        <ColorSamples />
      </PageSample>
      <PageSample className="bg-page-1">
        <ColorSamples />
      </PageSample>
      <PageSample className="bg-page-2">
        <ColorSamples />
      </PageSample>
      <PageSample className="bg-page-3">
        <ColorSamples a11yFailures={['destructive-foreground']} />
      </PageSample>
      <PageSample className="bg-page-4">
        <ColorSamples a11yFailures={['destructive-foreground']} />
      </PageSample>
    </Layout>
  ),
};

function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="grid gap-4 tablet:grid-cols-2 tablet-landscape:grid-cols-3 large-desktop:grid-cols-5">
      {children}
    </div>
  );
}

function Section({ className, ...attributes }: HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={cn('flex flex-col gap-2', className)} {...attributes} />
  );
}

function SwatchSection({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <Section className={cn('mx-5', className)} {...props} />;
}

function TextRow({
  className,
  ...attributes
}: Omit<HTMLAttributes<HTMLParagraphElement>, 'children'>) {
  const a11yFailures = useContext(A11yFailureContext);
  const label = className.replace('text-', '');
  return (
    <div className="flex items-center">
      <div className="w-5">
        {a11yFailures.includes(label) && <BodyXs>❌</BodyXs>}
      </div>
      <BodyMd {...attributes} className={className}>
        {className}
      </BodyMd>
    </div>
  );
}

function Swatch({ className }: HTMLAttributes<HTMLDivElement>) {
  const classes = className.split(' ');
  const bgClass = classes.find((c) => c.startsWith('bg-'));
  const fgClass = classes.find((c) => c.startsWith('text-'));

  return (
    <div
      className={cn(className, BodyMd.classes, 'flex flex-col gap-1 p-3 pl-5')}
    >
      {bgClass} <br /> {fgClass}
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
    <div>
      <InterfaceXl className="mb-3 block border-b-1 border-b-neutral-subdued pb-2">
        surface: {pageLabel}
      </InterfaceXl>
      <div className={cn(className, 'p-3')} {...otherAttributes}>
        {children}
      </div>
    </div>
  );
}

function ColorSamples({ a11yFailures = [] }: { a11yFailures?: string[] }) {
  return (
    <A11yFailureContext.Provider value={a11yFailures}>
      <div className="flex flex-col gap-5">
        <Section>
          <TextRow className="text-neutral-strong" />
          <TextRow className="text-neutral" />
          <TextRow className="text-neutral-subdued" />
          <TextRow className="text-neutral-disabled" aria-disabled />
        </Section>
        <Section>
          <TextRow className="text-primary-foreground" />
          <TextRow className="text-primary-foreground-2" />
          <TextRow className="text-primary-foreground-3" />
        </Section>
        <Section>
          <TextRow className="text-secondary-foreground" />
          <TextRow className="text-secondary-foreground-2" />
          <TextRow className="text-secondary-foreground-3" />
        </Section>
        <Section>
          <TextRow className="text-info-foreground" />
          <TextRow className="text-info-foreground-2" />
          <TextRow className="text-info-foreground-3" />
        </Section>
        <Section>
          <TextRow className="text-warning-foreground" />
          <TextRow className="text-warning-foreground-2" />
          <TextRow className="text-warning-foreground-3" />
        </Section>
        <Section>
          <TextRow className="text-destructive-foreground" />
          <TextRow className="text-destructive-foreground-2" />
          <TextRow className="text-destructive-foreground-3" />
        </Section>
        <SwatchSection>
          <Swatch className="bg-primary-surface-0 text-primary-onsurface-0" />
          <Swatch className="bg-primary-surface text-primary-onsurface" />
          <Swatch className="bg-primary-surface-2 text-primary-onsurface-2" />
        </SwatchSection>
        <SwatchSection>
          <Swatch className="bg-secondary-surface-0 text-secondary-onsurface-0" />
          <Swatch className="bg-secondary-surface text-secondary-onsurface" />
          <Swatch className="bg-secondary-surface-2 text-secondary-onsurface-2" />
        </SwatchSection>
        <SwatchSection>
          <Swatch className="bg-info-surface-0 text-info-onsurface-0" />
          <Swatch className="bg-info-surface text-info-onsurface" />
          <Swatch className="bg-info-surface-2 text-info-onsurface-2" />
        </SwatchSection>
        <SwatchSection>
          <Swatch className="bg-warning-surface-0 text-warning-onsurface-0" />
          <Swatch className="bg-warning-surface text-warning-onsurface" />
          <Swatch className="bg-warning-surface-2 text-warning-onsurface-2" />
        </SwatchSection>
        <SwatchSection>
          <Swatch className="bg-destructive-surface-0 text-destructive-onsurface-0" />
          <Swatch className="bg-destructive-surface text-destructive-onsurface" />
          <Swatch className="bg-destructive-surface-2 text-destructive-onsurface-2" />
        </SwatchSection>
      </div>
    </A11yFailureContext.Provider>
  );
}

const A11yFailureContext = createContext<string[]>([]);
