import { useCharacter } from '../CharacterSheet';
import { BigNumber } from '../layout/BigNumber';
import { DiamondCheck } from '../layout/checkables';
import { BasicLabel } from '../layout/labels';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';
import styles from './ArmorBlock.module.css';

export function ArmorBlock() {
  const { character } = useCharacter();
  const totalAc =
    character.baseArmorClass + (character.isWieldingShield ? 2 : 0);

  return (
    <Panel
      outerClasses={styles.ShieldShape}
      className="items-center flex flex-col pb-4"
    >
      <PanelTitle>
        Armour
        <br />
        Class
      </PanelTitle>
      <BigNumber className="flex-1">{totalAc}</BigNumber>

      <BasicLabel className="mb-1">Shield</BasicLabel>
      <DiamondCheck checked={character.isWieldingShield} />
    </Panel>
  );
}
