import type { Character } from '../../lib/models';
import { useCharacter } from '../CharacterSheet';
import { LabelUnder } from '../layout/labels';
import { Panel } from '../layout/Panel';

export function NameBlock() {
  const { character } = useCharacter();
  return (
    <Panel
      outerClasses="flex-1"
      topLeftCorner="scooped"
      className="grid grid-cols-[minmax(max-content,_3fr)_5fr] pr-3 pl-5 gap-y-3 gap-x-2"
    >
      <h1 className="col-span-2 text-3xl">{character.name}</h1>
      <NameField label="Background">{character.background}</NameField>
      <NameField label="Class">{getClasses(character)}</NameField>
      <NameField label="Species">{character.species}</NameField>
      <NameField label="Subclass">{getSubclasses(character)}&nbsp;</NameField>
    </Panel>
  );
}

/** Smaller utils */
export function NameField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-md font-semibold">{children}</span>
      <LabelUnder>{label}</LabelUnder>
    </div>
  );
}

// If multi-classing, give the levels of individual classes, else just show the current class
function getClasses(character: Character) {
  if (character.classes.length < 2) {
    return character.classes[0].name;
  } else {
    return character.classes.map((c) => `${c.name} ${c.level}`).join(' / ');
  }
}

function getSubclasses(character: Character) {
  return character.classes
    .map((c) => c.subclass)
    .filter(Boolean)
    .join(' / ');
}
