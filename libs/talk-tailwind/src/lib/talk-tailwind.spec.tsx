import { render } from '@testing-library/react';

import TalkTailwind from './talk-tailwind';

describe('TalkTailwind', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TalkTailwind />);
    expect(baseElement).toBeTruthy();
  });
});
