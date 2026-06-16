import { createContext, useContext, useMemo } from 'react'
import { calculateStats } from '../lib/calculate-derived-stats'
import type { DerivedStats } from '../lib/derived-stats.types'
import type { Character } from '../lib/models/character'

interface CharacterContextValue {
  character: Character
  derived: DerivedStats
}

const CharacterContext = createContext<CharacterContextValue | null>(null)

export function useCharacter(): CharacterContextValue {
  const ctx = useContext(CharacterContext)
  if (!ctx) {
    throw new Error(
      'useCharacter must be used inside a <CharacterSheet> provider'
    )
  }
  return ctx
}

interface CharacterSheetProps {
  data: Character
  children: React.ReactNode
}

export function CharacterSheet({ data, children }: CharacterSheetProps) {
  const value = useMemo(
    () => ({ character: data, derived: calculateStats(data) }),
    [data]
  )

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  )
}
