import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ThemeContext } from './ThemeContext'
import { ThemeSwitcher } from './ThemeSwitcher'

function renderWithTheme(theme: 'light' | 'dark', setTheme = vi.fn()) {
  return render(
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeSwitcher />
    </ThemeContext.Provider>
  )
}

describe('ThemeSwitcher', () => {
  it('shows moon icon in light mode', () => {
    renderWithTheme('light')
    expect(
      screen.getByRole('button', { name: 'Switch to dark theme' })
    ).toBeInTheDocument()
  })

  it.skip('shows sun icon in dark mode', () => {
    renderWithTheme('dark')
    expect(
      screen.getByRole('button', { name: 'Switch to light theme' })
    ).toBeInTheDocument()
  })

  it('calls setTheme with "light" when in dark mode', async () => {
    const setTheme = vi.fn()
    renderWithTheme('dark', setTheme)
    await userEvent.click(screen.getByRole('button'))
    expect(setTheme).toHaveBeenCalledWith('light')
  })

  it('calls setTheme with "dark" when in light mode', async () => {
    const setTheme = vi.fn()
    renderWithTheme('light', setTheme)
    await userEvent.click(screen.getByRole('button'))
    expect(setTheme).toHaveBeenCalledWith('dark')
  })
})
