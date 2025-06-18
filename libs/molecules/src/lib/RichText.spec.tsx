import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { RichText } from './RichText';

describe('RichText', () => {
  it('renders heading level 1', () => {
    const content = {
      type: 'heading',
      level: 1,
      children: [{ text: 'Heading 1' }],
    };
    render(<RichText content={content} />);
    expect(screen.getByText('Heading 1')).toBeInTheDocument();
    expect(screen.getByText('Heading 1').tagName).toBe('H1');
  });

  it('renders heading level 2', () => {
    const content = {
      type: 'heading',
      level: 2,
      children: [{ text: 'Heading 2' }],
    };
    render(<RichText content={content} />);
    expect(screen.getByText('Heading 2')).toBeInTheDocument();
    expect(screen.getByText('Heading 2').tagName).toBe('H2');
  });

  it('renders heading level 3', () => {
    const content = {
      type: 'heading',
      level: 3,
      children: [{ text: 'Heading 3' }],
    };
    render(<RichText content={content} />);
    expect(screen.getByText('Heading 3')).toBeInTheDocument();
    expect(screen.getByText('Heading 3').tagName).toBe('H3');
  });

  it('renders heading level 4 as h3 (default case)', () => {
    const content = {
      type: 'heading',
      level: 4,
      children: [{ text: 'Heading 4' }],
    };
    render(<RichText content={content} />);
    expect(screen.getByText('Heading 4')).toBeInTheDocument();
    expect(screen.getByText('Heading 4').tagName).toBe('H3');
  });
});
