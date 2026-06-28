import { useCharacter } from '../CharacterSheet';
import { BigNumber } from '../layout/BigNumber';
import { DiamondCheck } from '../layout/checkables';
import { BasicLabel } from '../layout/labels';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

export function ArmorBlock() {
  const { character } = useCharacter();
  const totalAc =
    character.baseArmorClass + (character.isWieldingShield ? 2 : 0);

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
      <BigNumber className="flex-1">{totalAc}</BigNumber>

      <BasicLabel className="mb-1">Shield</BasicLabel>
      <DiamondCheck checked={character.isWieldingShield} />
    </Panel>
  );
}
