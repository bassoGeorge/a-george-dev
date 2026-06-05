import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ShortNameLogo } from './ShortNameLogo';
import { Heading3 } from '../typography/typography-components';
import { firstNameColor, lastNameColor } from './styles';

describe('ShortNameLogo', () => {
  it('renders with correct structure and styles', () => {
    render(<ShortNameLogo />);
    const wrapper = screen.getByText('A').parentElement;
    expect(wrapper).toHaveClass(Heading3.classes);
    expect(wrapper).toHaveClass('font-bold');
  });

  it('renders first initial with correct color', () => {
    render(<ShortNameLogo />);
    expect(screen.getByText('A')).toHaveClass(firstNameColor);
  });

  it('renders second initial with correct color and size', () => {
    render(<ShortNameLogo />);
    expect(screen.getByText('G')).toHaveClass(lastNameColor);
    expect(screen.getByText('G')).toHaveClass('text-[0.85em]');
  });
});
