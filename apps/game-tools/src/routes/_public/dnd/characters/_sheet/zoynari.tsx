import { StandardCharacterSheet } from '@ageorgedev/dnd-character-sheet';
import { createFileRoute } from '@tanstack/react-router';
import { Zoynari3Data } from '../../../../../data/dnd-characters/zoynari/zoynari-3';

export const Route = createFileRoute('/_public/dnd/characters/_sheet/zoynari')({
  component: RouteComponent,
  staticData: {
    character: {
      name: Zoynari3Data.name,
      level: Zoynari3Data.classes.reduce((acc, { level }) => acc + level, 0),
      description: 'Kalashtar Cleric of the Light',
    },
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
