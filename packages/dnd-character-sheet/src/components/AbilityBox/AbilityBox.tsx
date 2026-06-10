import type { AbilityName, SkillName } from '../../types/character'
import { useCharacter } from '../CharacterSheet'
import { BigNumber } from '../layout/BigNumber'
import { CircleCheck } from '../layout/CircleCheck'
import type { CheckedState } from '../layout/checkStyles'
import { Panel } from '../layout/Panel'
import { PanelTitle } from '../layout/PanelTitle'

const ABILITY_LABELS: Record<AbilityName, string> = {
  strength: 'Strength',
  dexterity: 'Dexterity',
  constitution: 'Constitution',
  intelligence: 'Intelligence',
  wisdom: 'Wisdom',
  charisma: 'Charisma',
}

const ABILITY_SKILLS: Record<AbilityName, { key: SkillName; label: string }[]> =
  {
    strength: [{ key: 'athletics', label: 'Athletics' }],
    dexterity: [
      { key: 'acrobatics', label: 'Acrobatics' },
      { key: 'sleightOfHand', label: 'Sleight of Hand' },
      { key: 'stealth', label: 'Stealth' },
    ],
    constitution: [],
    intelligence: [
      { key: 'arcana', label: 'Arcana' },
      { key: 'history', label: 'History' },
      { key: 'investigation', label: 'Investigation' },
      { key: 'nature', label: 'Nature' },
      { key: 'religion', label: 'Religion' },
    ],
    wisdom: [
      { key: 'animalHandling', label: 'Animal Handling' },
      { key: 'insight', label: 'Insight' },
      { key: 'medicine', label: 'Medicine' },
      { key: 'perception', label: 'Perception' },
      { key: 'survival', label: 'Survival' },
    ],
    charisma: [
      { key: 'deception', label: 'Deception' },
      { key: 'intimidation', label: 'Intimidation' },
      { key: 'performance', label: 'Performance' },
      { key: 'persuasion', label: 'Persuasion' },
    ],
  }

function formatMod(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`
}

function proficiencyState(
  isProficient: boolean,
  hasExpertise: boolean
): CheckedState {
  if (hasExpertise) return 'special'
  if (isProficient) return true
  return false
}

interface AbilityBoxProps {
  ability: AbilityName
}

export function AbilityBox({ ability }: AbilityBoxProps) {
  const { character, derived } = useCharacter()
  const score = character.abilities[ability]
  const mod = derived.abilityModifiers[ability]
  const savingThrow = derived.savingThrows[ability]
  const isSaveProficient = character.savingThrowProficiencies.includes(ability)
  const skills = ABILITY_SKILLS[ability]

  return (
    <Panel
      className={`overflow-hidden`}
      topLeftCorner="scooped"
      topRightCorner="scooped"
    >
      <PanelTitle className="px-3 py-1.5">{ABILITY_LABELS[ability]}</PanelTitle>
      <div className="flex justify-center items-center py-2 gap-1">
        <div className="w-14 h-14 rounded-full border-2 border-sheet-red flex items-center justify-center">
          <BigNumber className="text-sheet-dark">{formatMod(mod)}</BigNumber>
        </div>
        <span className="text-md text-gray-500">{score}</span>
      </div>
      <SkillGrid>
        <SkillRow checkedState={isSaveProficient} modifier={savingThrow}>
          Saving Throw
        </SkillRow>
      </SkillGrid>
      {!!skills.length && (
        <SkillGrid>
          {skills.map(({ key, label }) => {
            const isProficient = character.skillProficiencies.includes(key)
            const hasExpertise = character.skillExpertise.includes(key)
            const total = derived.skills[key]
            return (
              <SkillRow
                key={key}
                checkedState={proficiencyState(isProficient, hasExpertise)}
                modifier={total}
              >
                {label}
              </SkillRow>
            )
          })}
        </SkillGrid>
      )}
    </Panel>
  )
}
function SkillGrid({ children }: React.PropsWithChildren) {
  return (
    <div className="grid grid-cols-[max-content_1fr_4fr] items-baseline gap-x-1.5 px-2 py-2 border-t">
      {children}
    </div>
  )
}

function SkillRow({
  checkedState,
  modifier,
  children,
}: React.PropsWithChildren<{
  checkedState: CheckedState
  modifier: number
}>) {
  return (
    <>
      <CircleCheck checked={checkedState} className="self-center" />
      <span className="text-md text-sheet-red text-right">
        {formatMod(modifier)}
      </span>
      <span className="text-xs text-sheet-dark">{children}</span>
    </>
  )
}
