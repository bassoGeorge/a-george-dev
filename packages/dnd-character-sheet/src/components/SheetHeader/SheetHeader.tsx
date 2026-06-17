import { cn } from '@ageorgedev/toolbelt/cn';
import { useCharacter } from '../CharacterSheet';
import { BigNumber } from '../layout/BigNumber';
import { DiamondCheck } from '../layout/checkables';
import { VerticalDivider } from '../layout/dividers';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';
import { VerticalSubPanel } from '../layout/SubPanel';

export function SheetHeader() {
  return (
    <div className="flex gap-2">
      <NameBlock />
      <LevelBlock />
      <ArmorBlock />
      <HealthAndDeathBlock />
    </div>
  );
}

function NameBlock() {
  const { character } = useCharacter();
  return (
    <Panel
      outerClasses="flex-1"
      topLeftCorner="scooped"
      className="grid grid-cols-[2fr_5fr] pr-3 pl-5 gap-y-3 gap-x-2"
    >
      <h1 className="col-span-2 text-3xl">{character.name}</h1>
      <NameField label="Background">{character.background}</NameField>
      <NameField label="Class">{character.class}</NameField>
      <NameField label="Species">{character.species}</NameField>
      <NameField label="Subclass">{character.subclass}</NameField>
    </Panel>
  );
}

function LevelBlock() {
  const { character } = useCharacter();

  return (
    <div className="align-self-stretch flex flex-col gap-1 border-[3px] border-neutral-subdued bg-white items-center py-3 px-6 rounded-full my-2 bg-page-4">
      <BigNumber>{character.level}</BigNumber>
      <LabelUnder className="text-center">Level</LabelUnder>
      <div className="flex-1"></div>
      <LabelUnder className="text-center w-full">Xp</LabelUnder>
    </div>
  );
}

function ArmorBlock() {
  const { character } = useCharacter();

  return (
    <Panel
      className="items-center flex flex-col"
      bottomLeftCorner="scooped"
      bottomRightCorner="scooped"
    >
      <PanelTitle>
        Armour
        <br />
        Class
      </PanelTitle>
      <BigNumber className="flex-1">{character.armorClass}</BigNumber>

      <BasicLabel className="mb-1">Shield</BasicLabel>
      <DiamondCheck />
    </Panel>
  );
}

function HealthAndDeathBlock() {
  const { character } = useCharacter();
  return (
    <Panel className="flex p-0" topRightCorner="scooped">
      <VerticalSubPanel className="py-2 px-3 grid grid-rows-[max-content_1fr] grid-cols-[1fr_max-content_1fr] gap-2 items-end">
        <PanelTitle className="col-span-3">Hit Points</PanelTitle>
        <LabelUnder>Current</LabelUnder>
        <VerticalDivider />
        <div>
          <LabelUnder className="mb-2">Temp</LabelUnder>
          <span className="text-md">{character.hitPoints.maximum}</span>
          <LabelUnder>Max</LabelUnder>
        </div>
      </VerticalSubPanel>
      <VerticalSubPanel className="py-2 px-3 grid grid-rows-[max-content_1fr] grid-cols-1 gap-2 items-end">
        <PanelTitle>Hit Dice</PanelTitle>
        <div>
          <LabelUnder className="mb-2">Spent</LabelUnder>
          <span className="text-md">
            {character.hitDice.total}
            {character.hitDice.dieType}
          </span>
          <LabelUnder>Max</LabelUnder>
        </div>
      </VerticalSubPanel>
      <VerticalSubPanel className="py-2 px-3 flex flex-col justify-between w-25">
        <PanelTitle className="text-left">
          Death
          <br />
          Saves
        </PanelTitle>
        <div>
          <div className="flex gap-2 mb-1">
            <DiamondCheck />
            <DiamondCheck />
            <DiamondCheck />
          </div>
          <BasicLabel>Successes</BasicLabel>
        </div>
        <div>
          <div className="flex gap-2 mb-1">
            <DiamondCheck />
            <DiamondCheck />
            <DiamondCheck />
          </div>
          <BasicLabel>Failures</BasicLabel>
        </div>
      </VerticalSubPanel>
    </Panel>
  );
}

/** Smaller utils */

function NameField({
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

function LabelUnder({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <BasicLabel className={cn(className, 'border-t')} {...props} />;
}

function BasicLabel({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('text-xs uppercase', className)} {...props}>
      {children}
    </div>
  );
}
