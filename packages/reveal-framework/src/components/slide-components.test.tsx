import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  CalloutForAdvancedTopic,
  CalloutForPersonalOpinion,
  CalloutForVD,
  ImportantNote,
  PointSeperator,
} from './slide-components';

describe('ImportantNote', () => {
  it('renders its children', () => {
    render(<ImportantNote>Remember the cascade</ImportantNote>);

    expect(screen.getByText('Remember the cascade')).toBeInTheDocument();
  });

  it('styles as a tip by default', () => {
    const { container } = render(<ImportantNote>Note</ImportantNote>);

    expect(container.querySelector('.bg-primary-surface')).toBeInTheDocument();
  });

  it('styles as a tip when asked explicitly', () => {
    const { container } = render(
      <ImportantNote type="tip">Note</ImportantNote>
    );

    expect(container.querySelector('.bg-primary-surface')).toBeInTheDocument();
  });

  it('styles as a danger note when asked', () => {
    const { container } = render(
      <ImportantNote type="danger">Note</ImportantNote>
    );

    expect(
      container.querySelector('.bg-destructive-surface')
    ).toBeInTheDocument();
    expect(container.querySelector('.bg-primary-surface')).toBeNull();
  });

  it('shows a different icon per note type', () => {
    const { container: tip } = render(
      <ImportantNote type="tip">Note</ImportantNote>
    );
    const { container: danger } = render(
      <ImportantNote type="danger">Note</ImportantNote>
    );

    expect(tip.querySelector('svg')).toBeInTheDocument();
    expect(danger.querySelector('svg')).toBeInTheDocument();
    expect(tip.querySelector('svg')?.innerHTML).not.toBe(
      danger.querySelector('svg')?.innerHTML
    );
  });

  it('merges a caller className onto the wrapper', () => {
    const { container } = render(
      <ImportantNote className="extra-class">Note</ImportantNote>
    );

    expect(container.firstElementChild).toHaveClass('extra-class');
  });

  it('passes the shape through to the card', () => {
    const { container } = render(
      <ImportantNote shape="trapRight">Note</ImportantNote>
    );

    expect(screen.getByText('Note')).toBeInTheDocument();
    expect(container.firstElementChild).toBeInTheDocument();
  });
});

describe('callout badges', () => {
  it.each([
    [CalloutForVD, 'UI/UX'],
    [CalloutForAdvancedTopic, 'Advanced'],
    [CalloutForPersonalOpinion, 'Opinion'],
  ])('%o renders its label', (Callout, label) => {
    render(<Callout />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('gives each callout its own icon', () => {
    const { container } = render(
      <>
        <CalloutForVD />
        <CalloutForAdvancedTopic />
        <CalloutForPersonalOpinion />
      </>
    );
    const icons = Array.from(container.querySelectorAll('svg')).map(
      (svg) => svg.innerHTML
    );

    expect(new Set(icons).size).toBe(3);
  });
});

describe('PointSeperator', () => {
  it('renders an icon', () => {
    const { container } = render(<PointSeperator />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('merges a caller className with the base styles', () => {
    const { container } = render(<PointSeperator className="extra-class" />);
    const icon = container.querySelector('svg');

    expect(icon).toHaveClass('extra-class');
    expect(icon).toHaveClass('mx-auto');
  });
});
