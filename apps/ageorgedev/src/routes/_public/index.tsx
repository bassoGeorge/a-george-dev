import { createFileRoute } from '@tanstack/react-router'
import { HomeAboveFold } from '../../components/HomeAboveFold/HomeAboveFold'

export const Route = createFileRoute('/_public/')({
  component: HomePage,
})

function HomePage() {
  return <HomeAboveFold />
}
