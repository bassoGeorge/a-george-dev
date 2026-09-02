import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SlideTypeCenter, SlideTypeRegular } from './slide-types';

/** Both slide types put their callout badges in the same absolutely-positioned
 * strip, so the badge labels found there are what the `callout` prop controls. */
function calloutLabels(container: HTMLElement) {
  const strip = container.querySelector('.absolute.left-6');
  return Array.from(strip?.querySelectorAll('span') ?? [])
    .map((el) => el.textContent ?? '')
    .filter(Boolean);
}

describe('SlideTypeCenter', () => {
  it('renders its children', () => {
    render(<SlideTypeCenter>Centred content</SlideTypeCenter>);

    expect(screen.getByText('Centred content')).toBeInTheDocument();
  });

  it('shows no callouts when none are asked for', () => {
    const { container } = render(<SlideTypeCenter>Content</SlideTypeCenter>);

    expect(calloutLabels(container)).toEqual([]);
  });
});

describe('SlideTypeRegular', () => {
  it('renders its heading and children', () => {
    render(
      <SlideTypeRegular heading="Utility classes">Body copy</SlideTypeRegular>
    );

    expect(screen.getByText('Utility classes')).toBeInTheDocument();
    expect(screen.getByText('Body copy')).toBeInTheDocument();
  });

  it('puts the heading in a header element', () => {
    const { container } = render(
      <SlideTypeRegular heading="Utility classes">Body</SlideTypeRegular>
    );

    expect(container.querySelector('header')).toHaveTextContent(
      'Utility classes'
    );
  });

  it('accepts a rendered node as the heading', () => {
    render(
      <SlideTypeRegular heading={<h2>Rich heading</h2>}>Body</SlideTypeRegular>
    );

    expect(
      screen.getByRole('heading', { name: 'Rich heading' })
    ).toBeInTheDocument();
  });
});

describe('callouts', () => {
  const cases = [
    ['UX', 'UI/UX'],
    ['Advanced', 'Advanced'],
    ['Opinion', 'Opinion'],
  ] as const;

  it.each(cases)('renders the %s callout as "%s"', (callout, label) => {
    const { container } = render(
      <SlideTypeCenter callout={callout}>Content</SlideTypeCenter>
    );

    expect(calloutLabels(container)).toEqual([label]);
  });

  it('renders several callouts when given an array, in order', () => {
    const { container } = render(
      <SlideTypeCenter callout={['Advanced', 'UX']}>Content</SlideTypeCenter>
    );

    expect(calloutLabels(container)).toEqual(['Advanced', 'UI/UX']);
  });

  it('renders callouts on a regular slide too', () => {
    const { container } = render(
      <SlideTypeRegular heading="Heading" callout="Opinion">
        Content
      </SlideTypeRegular>
    );

    expect(calloutLabels(container)).toEqual(['Opinion']);
  });

  it('renders an empty array of callouts as none', () => {
    const { container } = render(
      <SlideTypeCenter callout={[]}>Content</SlideTypeCenter>
    );

    expect(calloutLabels(container)).toEqual([]);
  });
});
