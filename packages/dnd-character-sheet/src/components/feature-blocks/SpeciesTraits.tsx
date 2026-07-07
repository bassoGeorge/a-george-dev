import { useCharacter } from '../CharacterSheet';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';
import { useVisualAdjustments } from '../VisualAdjustmentsContext';
import { FeatureList } from './FeatureList';

export function SpeciesTraits() {
  const { character } = useCharacter();
  const { speciesAndFeatsFontSize } = useVisualAdjustments();

  return (
    <Panel>
      <PanelTitle withDivider>Species Traits</PanelTitle>
      <FeatureList
        features={character.speciesTraits ?? []}
        smallFont={speciesAndFeatsFontSize === 'small'}
      />
    </Panel>
  );
}
