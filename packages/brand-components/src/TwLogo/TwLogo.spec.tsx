import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TwLogo } from './TwLogo'

describe('TwLogo', () => {
  it('renders an SVG element', () => {
    const { container } = render(<TwLogo />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('contains an accessible title', () => {
    const { container } = render(<TwLogo />)
    const title = container.querySelector('title')
    expect(title?.textContent).toBe('ThoughtWorks')
  })

  it('forwards className to the root SVG', () => {
    const { container } = render(<TwLogo className="my-logo" />)
    expect(container.querySelector('svg')).toHaveClass('my-logo')
  })

  it('forwards data-testid so the element is queryable', () => {
    render(<TwLogo data-testid="tw-logo" />)
    expect(screen.getByTestId('tw-logo')).toBeInTheDocument()
  })
})
