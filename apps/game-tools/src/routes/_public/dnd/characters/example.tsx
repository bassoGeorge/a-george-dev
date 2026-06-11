import { ExampleSheet } from '@ageorgedev/dnd-character-sheet'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/dnd/characters/example')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ExampleSheet />
}
