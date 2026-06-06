'use client'

import { MoonIcon, SunIcon } from '@phosphor-icons/react/ssr'
import { useCallback } from 'react'
import { useTheme } from './ThemeContext'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  const switchTheme = useCallback(() => {
    setTheme(nextTheme)
  }, [nextTheme, setTheme])

  return (
    <button
      className={
        'p-3 text-2xl leading-none text-neutral-subdued transition-colors hover:text-primary-foreground'
      }
      title={`Switch to ${nextTheme} theme`}
      onClick={switchTheme}
    >
      {theme === 'dark' ? (
        <SunIcon weight="duotone" />
      ) : (
        <MoonIcon weight="duotone" />
      )}
    </button>
  )
}
