import { StandardCharacterSheet } from '../components/StandardCharacterSheet/StandardCharacterSheet';
import { exampleWizard } from './example-wizard.data';

export function ExampleSheet() {
  return <StandardCharacterSheet data={exampleWizard} />;
}
