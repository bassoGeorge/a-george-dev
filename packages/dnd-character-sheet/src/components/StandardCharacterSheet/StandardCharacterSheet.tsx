import { Ability } from '../../lib/models/abilities';
import type { Character } from '../../lib/models/character';
import { AbilityBox } from '../AbilityBox/AbilityBox';
import { AttackList } from '../AttackList/AttackList';
import { BackstoryBlock } from '../BackstoryBlock/BackstoryBlock';
import { CharacterSheet } from '../CharacterSheet';
import { CombatRow } from '../CombatRow/CombatRow';
import { EquipmentBlock } from '../EquipmentBlock/EquipmentBlock';
import { EquipmentTraining } from '../EquipmentTraining/EquipmentTraining';
import { ClassFeatures } from '../feature-blocks/ClassFeatures';
import { Feats } from '../feature-blocks/Feats';
import { SpeciesTraits } from '../feature-blocks/SpeciesTraits';
import { HeroicInspiration } from '../HeroicInspiration/HeroicInspiration';
import { Page } from '../layout/Page';
import { ProficiencyBlock } from '../ProficiencyBlock/ProficiencyBlock';
import { Resources } from '../Resources/Resources';
import { SheetHeader } from '../SheetHeader/SheetHeader';
import { SpellcastingBlock } from '../SpellcastingBlock';

interface Props {
  data: Character;
}

export function StandardCharacterSheet({ data }: Props) {
  return (
    <CharacterSheet data={data}>
      <Page className="gap-6 pt-6">
        {' '}
        {/** Should not be margin here, for print reasons */}
        <SheetHeader />
        <div className="grid grid-cols-3 gap-4 flex-1">
          <div className="col-span-1 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2 justify-between">
                <ProficiencyBlock />
                <AbilityBox ability={Ability.Strength} />
                <AbilityBox ability={Ability.Dexterity} />
                <AbilityBox ability={Ability.Constitution} />
                <HeroicInspiration />
              </div>
              <div className="flex flex-col gap-2 justify-between">
                <AbilityBox ability={Ability.Intelligence} />
                <AbilityBox ability={Ability.Wisdom} />
                <AbilityBox ability={Ability.Charisma} />
              </div>
            </div>
            <EquipmentTraining />
          </div>

          <div className="col-span-2 flex flex-col gap-4">
            <CombatRow />
            <AttackList />
            <Resources />
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
  );
}
