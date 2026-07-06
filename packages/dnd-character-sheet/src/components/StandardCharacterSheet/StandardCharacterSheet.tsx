import { Ability } from '../../lib/models/abilities';
import type { Character } from '../../lib/models/character';
import { AbilityBox } from '../AbilityBox/AbilityBox';
import { AttackList } from '../AttackList/AttackList';
import { CharacterSheet } from '../CharacterSheet';
import { CoinBlock } from '../CoinBlock/CoinBlock';
import { CombatRow } from '../CombatRow/CombatRow';
import { EquipmentTraining } from '../EquipmentTraining/EquipmentTraining';
import { ClassFeatures } from '../feature-blocks/ClassFeatures';
import { Feats } from '../feature-blocks/Feats';
import { SpeciesTraits } from '../feature-blocks/SpeciesTraits';
import { GenericPanel } from '../GenericPanel/GenericPanel';
import { ActionsInCombat } from '../game-infos/ActionsInCombat';
import { WeaponMasteries } from '../game-infos/WeaponMasteries';
import { HeroicInspiration } from '../HeroicInspiration/HeroicInspiration';
import { Inventory } from '../Inventory/Inventory';
import { Page } from '../layout/Page';
import { ProficiencyBlock } from '../ProficiencyBlock/ProficiencyBlock';
import { Resources } from '../Resources/Resources';
import { SheetHeader } from '../SheetHeader/SheetHeader';
import { SpellcastingBlock } from '../SpellcastingBlock/SpellcastingBlock';
import {
  DEFAULT_VISUAL_ADUSTMENTS,
  VisualAdjustmentsContext,
} from '../VisualAdjustmentsContext';

export type VisualAdjustments = {
  spellRows?: number;
  inventoryRows?: number;
};

interface Props {
  data: Character;
  visualAdjustments?: VisualAdjustments;
}

export function StandardCharacterSheet({ data, visualAdjustments }: Props) {
  const adjustments = {
    ...DEFAULT_VISUAL_ADUSTMENTS,
    ...visualAdjustments,
  };

  return (
    <VisualAdjustmentsContext.Provider value={adjustments}>
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
          <div className="grid grid-cols-7 gap-4 mt-4 flex-1">
            <div className="col-span-5 h-full flex flex-col gap-4">
              {data.spellcasting && <SpellcastingBlock />}
              <ActionsInCombat />
              <WeaponMasteries />
            </div>
            <div className="col-span-2 flex flex-col gap-4">
              <GenericPanel
                topRightCorner="scooped"
                heading="Appearance"
                htmlContent={data.appearance ?? ''}
                outerClasses="min-h-[12em]"
              />
              <GenericPanel
                heading="Backstory & Personality"
                htmlContent={data.backstory ?? ''}
                outerClasses="min-h-[15em]"
              />
              <Inventory outerClasses="flex-1" />
              <CoinBlock bottomRightCorner="scooped" />
            </div>
          </div>
        </Page>
      </CharacterSheet>
    </VisualAdjustmentsContext.Provider>
  );
}
