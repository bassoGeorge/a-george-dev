import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HomeAboveFold } from './HomeAboveFold'

describe('HomeAboveFold', () => {
  it('renders a heading with the title', () => {
    render(<HomeAboveFold />)
    expect(
      screen.getByRole('heading', { name: /web developer/i })
    ).toBeInTheDocument()
  })

  it('renders the subtitle text', () => {
    render(<HomeAboveFold />)
    expect(
      screen.getByText(/architecting web experiences since 2016/i)
    ).toBeInTheDocument()
  })

  it('renders social links to GitHub and LinkedIn', () => {
    render(<HomeAboveFold />)
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
  })
})
