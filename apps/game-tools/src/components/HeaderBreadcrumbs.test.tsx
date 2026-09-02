import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HeaderBreadcrumbs } from './HeaderBreadcrumbs';

const useMatches = vi.fn();

vi.mock('@tanstack/react-router', () => ({
  useMatches: () => useMatches(),
  Link: ({
    to,
    children,
    ...props
  }: {
    to?: string;
    children: React.ReactNode;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

/** Only `pathname` and `context.title` are read, so the fixture stays to those. */
function match(pathname: string, title?: string) {
  return { pathname, context: title ? { title } : {} };
}

function setMatches(...matches: ReturnType<typeof match>[]) {
  useMatches.mockReturnValue(matches);
}

/** Crumb labels in order, paired with the href each links to (undefined = plain text). */
function crumbs() {
  return screen
    .getAllByRole('listitem')
    .filter((li) => li.getAttribute('role') !== 'presentation')
    .map((li) => {
      const link = li.querySelector('a');
      return { label: li.textContent, href: link?.getAttribute('href') };
    });
}

beforeEach(() => {
  useMatches.mockReset();
});

describe('HeaderBreadcrumbs', () => {
  it('renders nothing when no match carries a title', () => {
    setMatches(match('/'), match('/dnd'));
    const { container } = render(<HeaderBreadcrumbs />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when there are no matches at all', () => {
    setMatches();
    const { container } = render(<HeaderBreadcrumbs />);

    expect(container).toBeEmptyDOMElement();
  });

  it('builds one crumb per titled match', () => {
    setMatches(
      match('/', 'Home'),
      match('/dnd', 'D&D'),
      match('/dnd/characters', 'Characters')
    );
    render(<HeaderBreadcrumbs />);

    expect(crumbs().map((c) => c.label)).toEqual(['Home', 'D&D', 'Characters']);
  });

  it('skips matches with no title, keeping the rest in order', () => {
    setMatches(
      match('/', 'Home'),
      match('/dnd'),
      match('/dnd/characters', 'Characters')
    );
    render(<HeaderBreadcrumbs />);

    expect(crumbs().map((c) => c.label)).toEqual(['Home', 'Characters']);
  });

  it('links every crumb but the last to its pathname', () => {
    setMatches(
      match('/', 'Home'),
      match('/dnd', 'D&D'),
      match('/dnd/characters', 'Characters')
    );
    render(<HeaderBreadcrumbs />);

    expect(crumbs()).toEqual([
      { label: 'Home', href: '/' },
      { label: 'D&D', href: '/dnd' },
      { label: 'Characters', href: undefined },
    ]);
  });

  it('marks the last crumb as the current page', () => {
    setMatches(match('/', 'Home'), match('/dnd', 'D&D'));
    render(<HeaderBreadcrumbs />);

    const current = screen.getByText('D&D');
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current).not.toHaveAttribute('href');
  });

  it('renders a single titled match as an unlinked current page', () => {
    setMatches(match('/', 'Home'));
    render(<HeaderBreadcrumbs />);

    expect(crumbs()).toEqual([{ label: 'Home', href: undefined }]);
    expect(screen.getByText('Home')).toHaveAttribute('aria-current', 'page');
  });

  it('puts a separator between crumbs, but not before the first', () => {
    setMatches(
      match('/', 'Home'),
      match('/dnd', 'D&D'),
      match('/dnd/characters', 'Characters')
    );
    const { container } = render(<HeaderBreadcrumbs />);

    expect(
      container.querySelectorAll('[data-slot="breadcrumb-separator"]')
    ).toHaveLength(2);
  });

  it('renders no separator for a single crumb', () => {
    setMatches(match('/', 'Home'));
    const { container } = render(<HeaderBreadcrumbs />);

    expect(
      container.querySelectorAll('[data-slot="breadcrumb-separator"]')
    ).toHaveLength(0);
  });

  it('labels the nav for assistive tech', () => {
    setMatches(match('/', 'Home'));
    render(<HeaderBreadcrumbs />);

    expect(
      screen.getByRole('navigation', { name: 'breadcrumb' })
    ).toBeInTheDocument();
  });
});
