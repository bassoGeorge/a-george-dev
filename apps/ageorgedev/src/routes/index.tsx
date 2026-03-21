import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Temp,
});

function Temp() {
  return <div>Hello /temp!</div>;
}
