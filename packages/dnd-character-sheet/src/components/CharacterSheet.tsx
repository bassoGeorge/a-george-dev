import { createContext, useContext, useMemo } from 'react';
import { calculateStats } from '../lib/calculate-derived-stats';
import {
  type ComputedResource,
  computeResources,
} from '../lib/calculate-resources';
import type { Character } from '../lib/models/character';
import type { DerivedStats } from '../lib/models/derived-stats';
import { enrichCharacterData } from '../lib/text-enrichment';

interface CharacterContextValue {
  character: Character;
  derived: DerivedStats;
  resources: ComputedResource[];
}

const CharacterContext = createContext<CharacterContextValue | null>(null);

export function useCharacter(): CharacterContextValue {
  const ctx = useContext(CharacterContext);
  if (!ctx) {
    throw new Error(
      'useCharacter must be used inside a <CharacterSheet> provider'
    );
  }
  return ctx;
}

interface CharacterSheetProps {
  data: Character;
  children: React.ReactNode;
}

export function CharacterSheet({ data, children }: CharacterSheetProps) {
  const stats = useMemo(() => calculateStats(data), [data]);

  const resources = useMemo(() => computeResources(data, stats), [data, stats]);

  const character = useMemo(
    () => enrichCharacterData(data, stats, resources),
    [data, stats, resources]
  );

  const value = useMemo(
    () => ({ character, derived: stats, resources }),
    [character, stats, resources]
  );

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
}
