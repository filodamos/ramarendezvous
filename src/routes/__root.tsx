import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { UpperBar } from '../components/UpperBar'
import { SideBar } from '../components/SideBar'

export const Route = createRootRoute({
  component: () => (
    <div className="app">
      <SideBar />
      <div className="main-container">
        <UpperBar />
        <div className="content">
          {
            // <ContentBoxes />
          }
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
})
