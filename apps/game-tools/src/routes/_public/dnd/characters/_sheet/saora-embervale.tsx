import {
  getCharacterBrief,
  StandardCharacterSheet,
} from '@ageorgedev/dnd-character-sheet';
import { createFileRoute } from '@tanstack/react-router';
import { SaoraData } from '../../../../../data/dnd-characters/saora-embervale/saora-embervale';

export const Route = createFileRoute(
  '/_public/dnd/characters/_sheet/saora-embervale'
)({
  component: RouteComponent,
  staticData: {
    character: getCharacterBrief(SaoraData),
  },
});

function RouteComponent() {
  return <StandardCharacterSheet data={SaoraData} />;
}
