import { useCharacter } from '../CharacterSheet';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';
import { FeatureList } from './FeatureList';

export function Feats() {
  const { character } = useCharacter();

  return (
    <Panel>
      <PanelTitle withDivider>Feats</PanelTitle>
      <FeatureList features={character.feats ?? []} />
    </Panel>
  );
}
