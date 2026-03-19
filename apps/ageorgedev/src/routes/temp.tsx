import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/temp')({
  component: Temp,
});

function Temp() {
  return <div>Hello /temp!</div>;
}
