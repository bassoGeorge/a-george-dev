import { useCharacter } from '../CharacterSheet'
import { BigNumber } from '../layout/BigNumber'
import { Panel } from '../layout/Panel'
import { PanelTitle } from '../layout/PanelTitle'

export function ProficiencyBlock() {
  const { derived } = useCharacter()

  return (
    <Panel
      className={`overflow-hidden`}
      bottomRightCorner="scooped"
      bottomLeftCorner="scooped"
    >
      <PanelTitle className="px-3 py-1.5">Proficiency Bonus</PanelTitle>
      <div className="flex items-center justify-center py-4">
        <BigNumber className="text-destructive-foreground-3">
          +{derived.proficiencyBonus}
        </BigNumber>
      </div>
    </Panel>
  )
}
