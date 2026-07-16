import type { Character } from './models';

export function getCharacterBrief(character: Character) {
  const level = character.classes.reduce((acc, { level }) => acc + level, 0);
  const classes = character.classes.map(({ name }) => name);
  const primaryClass = character.classes.reduce((primary, current) =>
    current.level > primary.level ? current : primary
  ).name;
  let description = character.customDescription;
  if (!description) {
    const subclasses = character.classes
      .map(({ subclass }) => subclass)
      .filter((subclass): subclass is string => Boolean(subclass));
    description = [character.species, ...subclasses].join(' · ');
  }
  return {
    name: character.name,
    level,
    species: character.species,
    classes,
    primaryClass,
    description,
  };
}
