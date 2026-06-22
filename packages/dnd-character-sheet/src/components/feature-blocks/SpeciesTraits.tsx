import { useCharacter } from '../CharacterSheet';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';
import { FeatureList } from './FeatureList';

export function SpeciesTraits() {
  const { character } = useCharacter();

  return (
    <Panel>
      <PanelTitle>Species Traits</PanelTitle>
      <FeatureList className="mt-3" features={character.speciesTraits ?? []} />
    </Panel>
  );
}
