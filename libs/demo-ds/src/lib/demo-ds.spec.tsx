import { render } from '@testing-library/react';

import DemoDs from './demo-ds';

describe('DemoDs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DemoDs />);
    expect(baseElement).toBeTruthy();
  });
});
