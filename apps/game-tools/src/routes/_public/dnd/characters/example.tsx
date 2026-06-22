import { ExampleSheet } from '@ageorgedev/dnd-character-sheet';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/dnd/characters/example')({
  component: RouteComponent,
  staticData: {
    character: {
      name: 'Seraphina Ashveil',
      description: 'Just an example wizard',
      level: 7,
    },
  },
});

function RouteComponent() {
  return <ExampleSheet />;
}
