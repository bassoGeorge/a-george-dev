import { ABILITY_DETAILS } from '../../lib/models';
import { formatMod } from '../../lib/utils';
import { useCharacter } from '../CharacterSheet';
import { BigNumber } from '../layout/BigNumber';
import { HorizontalDivider } from '../layout/dividers';
import { LabelUnder } from '../layout/labels';
import { Panel, type PanelProps } from '../layout/Panel';

export function SpellAbilityPanel(props: PanelProps) {
  const { character, derived } = useCharacter();

  if (!character.spellcasting) {
    return null;
  }

  return (
    <Panel topLeftCorner="scooped" {...props}>
      <h3 className="text-xl text-center">
        {ABILITY_DETAILS[character.spellcasting.ability].label}
      </h3>
      <LabelUnder className="text-center">Spellcasting Ability</LabelUnder>

      <div className="grid grid-cols-[3fr_1fr] items-baseline gap-x-3 gap-y-1">
        <span className="font-interface">Spellcasting Modifier</span>
        <BigNumber className="text-2xl text-right">
          {formatMod(derived.abilityModifiers[character.spellcasting.ability])}
        </BigNumber>

        <HorizontalDivider className="col-span-2" />

        <span className="font-interface">Spellcasting Save DC</span>
        <BigNumber className="text-2xl text-right">
          {derived.spellSaveDC}
        </BigNumber>

        <HorizontalDivider className="col-span-2" />

        <span className="font-interface">Spellcasting Attack Bonus</span>
        <BigNumber className="text-2xl text-right">
          {formatMod(derived.spellAttackBonus ?? 0)}
        </BigNumber>
      </div>
    </Panel>
  );
}
