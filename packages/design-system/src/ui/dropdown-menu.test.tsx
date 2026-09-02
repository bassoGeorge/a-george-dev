import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu';

/** Radix measures and positions its floating content, none of which jsdom
 * implements. Without these the content never mounts and the snapshot is empty. */
beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  Element.prototype.scrollIntoView ??= () => {};
  Element.prototype.hasPointerCapture ??= () => false;
  Element.prototype.releasePointerCapture ??= () => {};
});

/** `defaultOpen` matters: the content lives in a portal that is unmounted while
 * closed, so a default render would exercise almost none of this file. */
function renderOpenMenu() {
  return render(
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem inset>Inset item</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          <DropdownMenuItem disabled>Unavailable</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>Show grid</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={false}>
          Show rulers
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="dark">
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Nested item</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const slot = (name: string) =>
  document.querySelector(`[data-slot="dropdown-menu-${name}"]`);

describe('DropdownMenu', () => {
  it('renders an open menu with every item kind', () => {
    const { baseElement } = renderOpenMenu();
    expect(baseElement).toMatchSnapshot();
  });

  it('mounts the portalled content while open', () => {
    renderOpenMenu();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(slot('content')).toBeInTheDocument();
  });

  it('renders nothing but the trigger while closed', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText('Open menu')).toBeInTheDocument();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  it('marks the trigger as expanded when open', () => {
    renderOpenMenu();
    expect(slot('trigger')).toHaveAttribute('aria-expanded', 'true');
  });

  it('flags the destructive item so it can be styled apart', () => {
    renderOpenMenu();
    expect(screen.getByText('Delete').closest('[data-slot]')).toHaveAttribute(
      'data-variant',
      'destructive'
    );
  });

  it('flags an inset item', () => {
    renderOpenMenu();
    expect(
      screen.getByText('Inset item').closest('[data-slot]')
    ).toHaveAttribute('data-inset', 'true');
  });

  it('disables an item so it is not actionable', () => {
    renderOpenMenu();
    expect(
      screen.getByText('Unavailable').closest('[data-slot]')
    ).toHaveAttribute('data-disabled');
  });

  it('reflects checkbox state, showing the indicator only when checked', () => {
    renderOpenMenu();

    expect(
      screen.getByRole('menuitemcheckbox', { name: 'Show grid' })
    ).toHaveAttribute('data-state', 'checked');
    expect(
      screen.getByRole('menuitemcheckbox', { name: 'Show rulers' })
    ).toHaveAttribute('data-state', 'unchecked');
  });

  it('marks only the selected radio item as checked', () => {
    renderOpenMenu();

    expect(screen.getByRole('menuitemradio', { name: 'Dark' })).toHaveAttribute(
      'data-state',
      'checked'
    );
    expect(
      screen.getByRole('menuitemradio', { name: 'Light' })
    ).toHaveAttribute('data-state', 'unchecked');
  });

  it('renders separators between groups', () => {
    renderOpenMenu();
    expect(
      document.querySelectorAll('[data-slot="dropdown-menu-separator"]')
    ).toHaveLength(3);
  });

  it('renders a shortcut hint alongside its item', () => {
    renderOpenMenu();
    expect(slot('shortcut')).toHaveTextContent('⇧⌘P');
  });

  it('renders a submenu trigger that starts closed', () => {
    renderOpenMenu();

    expect(slot('sub-trigger')).toBeInTheDocument();
    expect(screen.queryByText('Nested item')).not.toBeInTheDocument();
  });

  it('merges a caller className instead of dropping it', () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
        <DropdownMenuContent className="custom-class">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(slot('content')).toHaveClass('custom-class');
  });
});
