import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Game Tools</h1>
      <section>
        <h2 className="text-lg font-semibold mb-4">D&D</h2>
        <Link
          to="/dnd/characters"
          className="block border border-border rounded-lg p-4 hover:bg-accent transition-colors w-fit"
        >
          <p className="font-medium">Characters</p>
          <p className="text-sm text-muted-foreground mt-1">
            View character sheets
          </p>
        </Link>
      </section>
    </div>
  )
}
