import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skill } from './Skill';

describe('Skill', () => {
  it('renders the skill name', () => {
    render(<Skill name="TypeScript" type="tool" level={4} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders for each skill type without throwing', () => {
    const { rerender } = render(<Skill name="React" type="tool" level={5} />);
    expect(screen.getByText('React')).toBeInTheDocument();

    rerender(<Skill name="Performance" type="technique" level={4} />);
    expect(screen.getByText('Performance')).toBeInTheDocument();

    rerender(<Skill name="Mentoring" type="human" level={3} />);
    expect(screen.getByText('Mentoring')).toBeInTheDocument();
  });

  it('renders for all valid levels without throwing', () => {
    const { rerender } = render(<Skill name="skill" type="tool" level={3} />);
    rerender(<Skill name="skill" type="tool" level={4} />);
    rerender(<Skill name="skill" type="tool" level={5} />);
    expect(screen.getByText('skill')).toBeInTheDocument();
  });
});
