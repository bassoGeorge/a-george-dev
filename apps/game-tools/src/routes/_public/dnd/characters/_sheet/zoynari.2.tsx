import {
  getCharacterBrief,
  StandardCharacterSheet,
} from '@ageorgedev/dnd-character-sheet';
import { createFileRoute } from '@tanstack/react-router';
import { Zoynari2Data } from '../../../../../data/dnd-characters/zoynari/zoynari-2';

export const Route = createFileRoute(
  '/_public/dnd/characters/_sheet/zoynari/2'
)({
  component: RouteComponent,
  staticData: {
    character: getCharacterBrief(Zoynari2Data),
  },
});

function RouteComponent() {
  return (
    <StandardCharacterSheet
      data={Zoynari2Data}
      visualAdjustments={{ inventoryRows: 18 }}
    />
  );
}
