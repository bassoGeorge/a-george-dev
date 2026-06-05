import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NameLogo } from './NameLogo';
import {
  bottomLeftShadow,
  bottomRightShadow,
  firstNameColor,
  lastNameColor,
  logoFont,
  logoWrapper,
  shadowColor,
} from './styles';

describe('NameLogo', () => {
  it('renders with default props', () => {
    render(<NameLogo />);
    const wrapper = screen.getByText('Anish').parentElement;
    expect(wrapper).toHaveClass(logoWrapper);
    expect(screen.getByText('Anish')).toHaveClass(
      logoFont,
      bottomRightShadow,
      shadowColor,
      firstNameColor
    );
    expect(screen.getByText('George')).toHaveClass(
      logoFont,
      bottomRightShadow,
      shadowColor,
      lastNameColor
    );
  });

  it('applies custom className', () => {
    render(<NameLogo className="custom-class" />);
    const wrapper = screen.getByText('Anish').parentElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('applies left shadow direction', () => {
    render(<NameLogo shadowDirection="left" />);
    expect(screen.getByText('Anish')).toHaveClass(bottomLeftShadow);
    expect(screen.getByText('George')).toHaveClass(bottomLeftShadow);
  });

  it('applies right shadow direction', () => {
    render(<NameLogo shadowDirection="right" />);
    expect(screen.getByText('Anish')).toHaveClass(bottomRightShadow);
    expect(screen.getByText('George')).toHaveClass(bottomRightShadow);
  });

  it('renders both names with correct spacing', () => {
    render(<NameLogo />);
    expect(screen.getByText('George')).toHaveClass('pl-[.5em]');
  });
});
