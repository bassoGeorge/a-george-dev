import { ABILITY_DETAILS, type Ability } from '../../lib/models/abilities';
import type { DerivedStats } from '../../lib/models/derived-stats';
import { AbilitySkillGrouping, type Skill } from '../../lib/models/skills';
import { formatMod } from '../../lib/utils';
import { useCharacter } from '../CharacterSheet';
import { BigNumber } from '../layout/BigNumber';
import type { CheckedState } from '../layout/checkables';
import { CircleCheck } from '../layout/checkables';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

interface AbilityBoxProps {
  ability: Ability;
}

export function AbilityBox({ ability }: AbilityBoxProps) {
  const { character, derived } = useCharacter();
  const score = character.abilities[ability];
  const abilityMod = derived.abilityModifiers[ability];
  const savingThrow = derived.savingThrows[ability];
  const isSaveProficient = character.savingThrowProficiencies.includes(ability);
  const skills = AbilitySkillGrouping[ability];

  return (
    <Panel
      className={`overflow-hidden px-0 pb-0`}
      topLeftCorner="scooped"
      topRightCorner="scooped"
    >
      <PanelTitle className="mb-0">{ABILITY_DETAILS[ability].label}</PanelTitle>
      <div className="flex justify-center items-center py-2 gap-1">
        <div className="size-8 rounded-full border-2 flex items-center justify-center bg-page-4">
          <BigNumber className="text-3xl">{formatMod(abilityMod)}</BigNumber>
        </div>
        <div className="text-lg text-neutral-subdued w-7 py-2 text-center border-1 -ml-3 -z-1">
          {score}
        </div>
      </div>
      <SkillGrid>
        <SkillRow
          skillData={{
            modifier: savingThrow,
            quality: isSaveProficient ? 'proficient' : 'normal',
          }}
          abilityModifier={abilityMod}
        >
          <b>Saving Throw</b>
        </SkillRow>
      </SkillGrid>
      {!!skills.length && (
        <SkillGrid>
          {skills.map((skill) => {
            return (
              <SkillRow
                key={skill}
                skillData={derived.skills[skill]}
                abilityModifier={abilityMod}
              >
                {skill}
              </SkillRow>
            );
          })}
        </SkillGrid>
      )}
    </Panel>
  );
}
function SkillGrid({ children }: React.PropsWithChildren) {
  return (
    <div className="grid grid-cols-[max-content_3ch_max-content] items-baseline gap-x-1 pl-2 pr-1 py-2 border-t">
      {children}
    </div>
  );
}

function SkillRow({
  skillData,
  abilityModifier,
  children,
}: React.PropsWithChildren<{
  skillData: DerivedStats['skills'][Skill];
  abilityModifier: number;
}>) {
  const modifierDisplayed =
    skillData.modifier === abilityModifier
      ? '\u00a0'
      : formatMod(skillData.modifier);
  const checkedState: CheckedState =
    skillData.quality === 'expert'
      ? 'special'
      : skillData.quality === 'proficient';
  return (
    <>
      <CircleCheck checked={checkedState} className="self-center" />
      <span className="text-md text-right border-b border-b-neutral-disabled">
        {modifierDisplayed}
      </span>
      <span className="text-xs">{children}</span>
    </>
  );
}
