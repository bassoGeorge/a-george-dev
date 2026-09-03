import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb';

/** Composed the way a real trail is assembled, so one snapshot covers every part
 * together rather than testing each subcomponent in isolation. */
function renderTrail() {
  return render(
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/dnd">D&amp;D</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Rusty</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

describe('Breadcrumb', () => {
  it('renders a full trail', () => {
    const { baseElement } = renderTrail();
    expect(baseElement).toMatchSnapshot();
  });

  it('labels the nav so screen readers announce it as a breadcrumb', () => {
    renderTrail();
    expect(
      screen.getByRole('navigation', { name: 'breadcrumb' })
    ).toBeInTheDocument();
  });

  it('marks the last crumb as the current page and not a real link', () => {
    renderTrail();
    const current = screen.getByText('Rusty');

    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current).toHaveAttribute('aria-disabled', 'true');
    expect(current).not.toHaveAttribute('href');
  });

  it('hides separators from assistive tech', () => {
    const { baseElement } = renderTrail();
    const separators = baseElement.querySelectorAll(
      '[data-slot="breadcrumb-separator"]'
    );

    expect(separators).toHaveLength(3);
    for (const separator of separators) {
      expect(separator).toHaveAttribute('aria-hidden', 'true');
      expect(separator).toHaveAttribute('role', 'presentation');
    }
  });

  it('uses a caret as the default separator, and a custom child when given one', () => {
    const { baseElement } = render(
      <BreadcrumbList>
        <BreadcrumbSeparator />
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
      </BreadcrumbList>
    );
    const [defaulted, custom] = baseElement.querySelectorAll(
      '[data-slot="breadcrumb-separator"]'
    );

    expect(defaulted.querySelector('svg')).toBeInTheDocument();
    expect(custom).toHaveTextContent('/');
  });

  it('gives the ellipsis a screen-reader label', () => {
    render(<BreadcrumbEllipsis />);
    expect(screen.getByText('More')).toHaveClass('sr-only');
  });

  it('renders a link as its child element when asChild is set', () => {
    render(
      <BreadcrumbLink asChild>
        <span data-testid="slotted">Home</span>
      </BreadcrumbLink>
    );

    const slotted = screen.getByTestId('slotted');
    expect(slotted.tagName).toBe('SPAN');
    expect(slotted).toHaveAttribute('data-slot', 'breadcrumb-link');
  });

  it('merges a caller className instead of dropping it', () => {
    render(<BreadcrumbList className="custom-class" />);
    expect(document.querySelector('[data-slot="breadcrumb-list"]')).toHaveClass(
      'custom-class'
    );
  });
});
