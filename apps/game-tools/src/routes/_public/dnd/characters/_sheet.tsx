import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/dnd/characters/_sheet')({
  component: () => <Outlet />,
});
