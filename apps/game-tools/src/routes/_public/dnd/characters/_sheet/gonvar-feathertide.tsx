import {
  getCharacterBrief,
  StandardCharacterSheet,
} from '@ageorgedev/dnd-character-sheet';
import { createFileRoute } from '@tanstack/react-router';
import { GonvarData } from '../../../../../data/dnd-characters/gonvar-feathertide/gonvar-feathertide';

export const Route = createFileRoute(
  '/_public/dnd/characters/_sheet/gonvar-feathertide'
)({
  component: RouteComponent,
  staticData: {
    character: getCharacterBrief(GonvarData),
  },
});

function RouteComponent() {
  return <StandardCharacterSheet data={GonvarData} />;
}
