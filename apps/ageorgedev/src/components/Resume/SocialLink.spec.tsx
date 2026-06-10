import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SocialLink } from './SocialLink'

describe('SocialLink', () => {
  it('renders an anchor element', () => {
    const { container } = render(<SocialLink type="github" />)
    expect(container.querySelector('a')).toBeInTheDocument()
  })

  it('has target="_blank"', () => {
    const { container } = render(<SocialLink type="github" />)
    expect(container.querySelector('a')).toHaveAttribute('target', '_blank')
  })

  it('has a rel containing noreferrer', () => {
    const { container } = render(<SocialLink type="github" />)
    const rel = container.querySelector('a')?.getAttribute('rel') ?? ''
    expect(rel).toContain('noreferrer')
  })

  it('links to the correct URL for each type', () => {
    const cases: Array<[Parameters<typeof SocialLink>[0]['type'], string]> = [
      ['github', 'https://github.com/bassoGeorge'],
      ['linkedin', 'https://linkedin.com/in/anishbassogeorge'],
      ['web', 'https://ageorge.dev'],
    ]

    for (const [type, expectedHref] of cases) {
      const { container, unmount } = render(<SocialLink type={type} />)
      expect(container.querySelector('a')).toHaveAttribute('href', expectedHref)
      unmount()
    }
  })

  it('shows display text when full=true', () => {
    render(<SocialLink type="email" full />)
    expect(screen.getByText('anishgeorgehb@gmail.com')).toBeInTheDocument()
  })

  it('hides display text when full is omitted', () => {
    render(<SocialLink type="email" />)
    expect(
      screen.queryByText('anishgeorgehb@gmail.com')
    ).not.toBeInTheDocument()
  })
})
