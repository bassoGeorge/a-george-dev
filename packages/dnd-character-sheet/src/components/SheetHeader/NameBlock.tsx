import { useCharacter } from '../CharacterSheet';
import { LabelUnder } from '../layout/labels';
import { Panel } from '../layout/Panel';

export function NameBlock() {
  const { character } = useCharacter();
  return (
    <Panel
      outerClasses="flex-1"
      topLeftCorner="scooped"
      className="grid grid-cols-[2fr_5fr] pr-3 pl-5 gap-y-3 gap-x-2"
    >
      <h1 className="col-span-2 text-3xl">{character.name}</h1>
      <NameField label="Background">{character.background}</NameField>
      <NameField label="Class">
        {joinItems(character.classes, 'name')}
      </NameField>
      <NameField label="Species">{character.species}</NameField>
      <NameField label="Subclass">
        {joinItems(character.classes, 'subclass')}
      </NameField>
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

export function joinItems<
  T extends Record<string, string | number | undefined>,
  K extends keyof T,
>(items: T[], key: K) {
  return items
    .map((item) => item[key])
    .filter((value) => value != null)
    .join(' / ');
}
