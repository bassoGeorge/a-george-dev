import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Text, TextBuilder } from './Text';
import { TYPOGRAPHY_CLASSES } from './core-type-classes';

describe('Text', () => {
  it('renders with default tag based on variant', () => {
    render(<Text variant="h1">Heading 1</Text>);
    const el = screen.getByText('Heading 1');
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe('H1');
    expect(el).toHaveClass(TYPOGRAPHY_CLASSES.h1);
  });

  it('renders with custom tag', () => {
    render(
      <Text variant="h1" as="span">
        Heading 1 as span
      </Text>
    );
    const el = screen.getByText('Heading 1 as span');
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe('SPAN');
    expect(el).toHaveClass(TYPOGRAPHY_CLASSES.h1);
  });

  it('renders body variant with paragraph tag by default', () => {
    render(<Text variant="body">Body text</Text>);
    const el = screen.getByText('Body text');
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe('P');
    expect(el).toHaveClass(TYPOGRAPHY_CLASSES.body);
  });

  it('renders interface variant with span tag by default', () => {
    render(<Text variant="interface">Interface text</Text>);
    const el = screen.getByText('Interface text');
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe('SPAN');
    expect(el).toHaveClass(TYPOGRAPHY_CLASSES.interface);
  });

  it('applies custom className', () => {
    render(
      <Text variant="h1" className="custom-class">
        Heading 1
      </Text>
    );
    const el = screen.getByText('Heading 1');
    expect(el).toHaveClass('custom-class');
  });
});

describe('TextBuilder', () => {
  it('creates a component with the specified variant', () => {
    const H1Text = TextBuilder('h1');
    render(<H1Text>Heading 1</H1Text>);
    const el = screen.getByText('Heading 1');
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe('H1');
    expect(el).toHaveClass(TYPOGRAPHY_CLASSES.h1);
  });

  it('allows overriding the tag', () => {
    const H1Text = TextBuilder('h1');
    render(<H1Text as="span">Heading 1 as span</H1Text>);
    const el = screen.getByText('Heading 1 as span');
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe('SPAN');
    expect(el).toHaveClass(TYPOGRAPHY_CLASSES.h1);
  });

  it('exposes the typography classes', () => {
    const H1Text = TextBuilder('h1');
    expect(H1Text.classes).toBe(TYPOGRAPHY_CLASSES.h1);
  });
});
