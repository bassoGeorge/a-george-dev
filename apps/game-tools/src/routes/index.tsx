import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Game Tools</h1>
    </main>
  )
}
