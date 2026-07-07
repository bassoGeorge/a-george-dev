import { useCharacter } from '../CharacterSheet';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';
import { useVisualAdjustments } from '../VisualAdjustmentsContext';
import { FeatureList } from './FeatureList';

export function Feats() {
  const { character } = useCharacter();
  const { speciesAndFeatsFontSize } = useVisualAdjustments();

  return (
    <Panel>
      <PanelTitle withDivider>Feats</PanelTitle>
      <FeatureList
        features={character.feats ?? []}
        smallFont={speciesAndFeatsFontSize === 'small'}
      />
    </Panel>
  );
}
