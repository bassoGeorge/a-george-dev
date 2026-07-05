import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/dnd/characters')({
  beforeLoad: () => ({ title: 'D&D Characters' }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
