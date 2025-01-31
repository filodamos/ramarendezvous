import { createLazyFileRoute } from '@tanstack/react-router'
import styles from './index.module.css'
export const Route = createLazyFileRoute('/repository/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className={styles.Details}>
    <p> Some information about the repository , the creator , the project and the whole thing</p>
  </div>
}
