import { createContext, useContext, useMemo } from 'react';
import { computeCharacterAndStats } from '../lib/calculate-derived-stats';
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
  const { character: effectiveCharacter, stats } = useMemo(
    () => computeCharacterAndStats(data),
    [data]
  );

  const resources = useMemo(
    () => computeResources(effectiveCharacter, stats),
    [effectiveCharacter, stats]
  );

  const character = useMemo(
    () => enrichCharacterData(effectiveCharacter, stats, resources),
    [effectiveCharacter, stats, resources]
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
