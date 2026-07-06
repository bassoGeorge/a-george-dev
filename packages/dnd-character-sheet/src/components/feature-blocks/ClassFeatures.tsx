import { cn } from '@ageorgedev/toolbelt/cn';
import { useCharacter } from '../CharacterSheet';
import { FeatureList } from '../feature-blocks/FeatureList';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';
import styles from './ClassFeatures.module.css';

export function ClassFeatures() {
  const { character } = useCharacter();

  return (
    <Panel outerClasses="flex-1">
      <PanelTitle withDivider>Class Features</PanelTitle>
      <FeatureList
        className={cn('columns-2 gap-3', styles.ColumnLayout)}
        features={character.features}
      />
    </Panel>
  );
}
