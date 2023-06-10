import { render } from '@testing-library/react';
import { NameLogo } from './NameLogo';
import { bottomLeftShadow, bottomRightShadow } from './NameLogo.css';

describe('NameLogo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NameLogo />);
    expect(baseElement).toBeTruthy();
  });

  it('should render with custom class', () => {
    const { baseElement } = render(<NameLogo className="test-class" />);
    expect(baseElement.querySelector('.test-class')).toBeTruthy();
  });

  it('should default to rendering with right shadow', () => {
    const { baseElement } = render(<NameLogo />);
    expect(baseElement.querySelector(`.${bottomRightShadow}`)).toBeTruthy();
  });

  it('should render with left shadow', () => {
    const { baseElement } = render(<NameLogo shadowDirection="left" />);
    expect(baseElement.querySelector(`.${bottomLeftShadow}`)).toBeTruthy();
  });
});
