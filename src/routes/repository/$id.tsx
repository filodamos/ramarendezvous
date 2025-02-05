import { createFileRoute, useParams } from '@tanstack/react-router'
import styles from './index.module.css'

export const Route = createFileRoute('/repository/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = useParams({ strict: false })
  return (
    <div className={styles.Details}>
      <h1>Page {id}</h1>
      <p>
        {' '}
        Some information about the repository , the creator , the project and
        the whole thing
      </p>
    </div>
  )
}
