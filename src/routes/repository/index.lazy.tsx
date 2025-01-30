import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/repository/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/repository/"!</div>
}
