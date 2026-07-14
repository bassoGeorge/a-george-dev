import type { Character } from './models/character';

export function applyCharacterEffects(rawCharacter: Character): Character {
  const allFeatures = [
    ...(rawCharacter.features ?? []),
    ...(rawCharacter.speciesTraits ?? []),
    ...(rawCharacter.feats ?? []),
  ];

  return allFeatures.reduce((character, feature) => {
    if (!feature.effects) return character;
    return feature.effects.reduce((c, effect) => {
      if (effect.kind === 'character') return effect.mod(c);
      return c;
    }, character);
  }, rawCharacter);
}
