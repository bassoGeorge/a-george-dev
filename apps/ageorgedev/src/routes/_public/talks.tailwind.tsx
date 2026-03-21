import { createFileRoute } from '@tanstack/react-router'
import { TalkTailwind } from '@ageorgedev/talk-tailwind'

export const Route = createFileRoute('/_public/talks/tailwind')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TalkTailwind />
}
