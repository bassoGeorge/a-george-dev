import { useCharacter } from '../CharacterSheet';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';
import { FeatureList } from './FeatureList';

export function Feats() {
  const { character } = useCharacter();

  return (
    <Panel>
      <PanelTitle>Feats</PanelTitle>
      <FeatureList className="mt-3" features={character.feats ?? []} />
    </Panel>
  );
}
