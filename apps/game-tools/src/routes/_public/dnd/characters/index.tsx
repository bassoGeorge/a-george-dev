import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/dnd/characters/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Characters</h1>
      <Link
        to="/dnd/characters/example"
        className="block border border-border rounded-lg p-4 hover:bg-accent transition-colors w-fit"
      >
        <p className="font-medium">Seraphina Ashveil</p>
        <p className="text-sm text-muted-foreground mt-1">
          Wizard / Warlock · Level 7
        </p>
      </Link>
    </div>
  );
}
