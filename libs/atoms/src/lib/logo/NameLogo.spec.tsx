import { render } from '@testing-library/react';
import { NameLogo } from './NameLogo';

describe('NameLogo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NameLogo />);
    expect(baseElement).toBeTruthy();
  });

  it('should render with custom class', () => {
    const { baseElement } = render(<NameLogo className="test-class" />);
    expect(baseElement.querySelector('.test-class')).toBeTruthy();
  });
});
