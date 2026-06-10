import type { Character } from '../../types/character'
import { AbilityBox } from '../AbilityBox/AbilityBox'
import { AttackList } from '../AttackList/AttackList'
import { BackstoryBlock } from '../BackstoryBlock/BackstoryBlock'
import { CharacterSheet } from '../CharacterSheet'
import { ClassFeatures } from '../ClassFeatures/ClassFeatures'
import { CombatRow } from '../CombatRow/CombatRow'
import { EquipmentBlock } from '../EquipmentBlock/EquipmentBlock'
import { EquipmentTraining } from '../EquipmentTraining/EquipmentTraining'
import { Feats } from '../Feats/Feats'
import { HeroicInspiration } from '../HeroicInspiration/HeroicInspiration'
import { Page } from '../layout/Page'
import { ProficiencyBlock } from '../ProficiencyBlock/ProficiencyBlock'
import { SheetHeader } from '../SheetHeader/SheetHeader'
import { SpeciesTraits } from '../SpeciesTraits/SpeciesTraits'
import { SpellcastingBlock } from '../SpellcastingBlock'

interface Props {
  data: Character
}

export function StandardCharacterSheet({ data }: Props) {
  return (
    <CharacterSheet data={data}>
      <Page>
        <SheetHeader />
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="col-span-1 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <ProficiencyBlock />
                <AbilityBox ability="strength" />
                <AbilityBox ability="dexterity" />
                <AbilityBox ability="constitution" />
                <HeroicInspiration />
              </div>
              <div className="flex flex-col gap-2">
                <AbilityBox ability="intelligence" />
                <AbilityBox ability="wisdom" />
                <AbilityBox ability="charisma" />
              </div>
            </div>
            <EquipmentTraining />
          </div>

          <div className="col-span-2 flex flex-col gap-4">
            <CombatRow />
            <AttackList />
            <ClassFeatures />
            <div className="grid grid-cols-2 gap-4">
              <SpeciesTraits />
              <Feats />
            </div>
          </div>
        </div>
      </Page>

      <Page>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="col-span-2">
            {data.spellcasting && <SpellcastingBlock />}
          </div>
          <div className="flex flex-col gap-4">
            <BackstoryBlock />
            <EquipmentBlock />
          </div>
        </div>
      </Page>
    </CharacterSheet>
  )
}
