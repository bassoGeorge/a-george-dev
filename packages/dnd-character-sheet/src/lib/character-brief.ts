import type { Character } from './models';

export function getCharacterBrief(character: Character) {
  const level = character.classes.reduce((acc, { level }) => acc + level, 0);
  let description = character.customDescription;
  if (!description) {
    description = `${character.species} ${character.classes
      .map(({ name, subclass }) => subclass || name)
      .join(' / ')}`;
  }
  return {
    name: character.name,
    level,
    description,
  };
}
