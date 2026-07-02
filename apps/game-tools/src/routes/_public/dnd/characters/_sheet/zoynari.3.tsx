import {
  getCharacterBrief,
  StandardCharacterSheet,
} from '@ageorgedev/dnd-character-sheet';
import { createFileRoute } from '@tanstack/react-router';
import { Zoynari3Data } from '../../../../../data/dnd-characters/zoynari/zoynari-3';

export const Route = createFileRoute(
  '/_public/dnd/characters/_sheet/zoynari/3'
)({
  component: RouteComponent,
  staticData: {
    character: getCharacterBrief(Zoynari3Data),
  },
});

function RouteComponent() {
  return (
    <StandardCharacterSheet
      data={Zoynari3Data}
      visualAdjustments={{ inventoryRows: 18 }}
    />
  );
}
