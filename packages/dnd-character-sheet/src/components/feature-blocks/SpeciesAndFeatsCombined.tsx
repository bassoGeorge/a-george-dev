import { useCharacter } from '../CharacterSheet';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';
import { useVisualAdjustments } from '../VisualAdjustmentsContext';
import { FeatureList } from './FeatureList';

export function SpeciesAndFeatsCombined() {
  const { character } = useCharacter();
  const { speciesAndFeatsFontSize } = useVisualAdjustments();

  const features = [
    ...(character.speciesTraits ?? []),
    ...(character.feats ?? []),
  ];

  return (
    <Panel>
      <PanelTitle withDivider>Species Traits &amp; Feats</PanelTitle>
      <FeatureList
        className="columns-2 gap-3"
        features={features}
        smallFont={speciesAndFeatsFontSize === 'small'}
      />
    </Panel>
  );
}
