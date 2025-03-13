import { createLazyFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import styles from './index.module.css'
export const Route = createLazyFileRoute('/repositories/')({
  component: RouteComponent,
})

function Repoitems({
  label,
  iconClass,
  url,
  id,
}: {
  label: string
  iconClass: string
  url: string
  id: string
}) {
  const navigate = useNavigate()

  return (
    <button
      className={styles.ViewButton}
      onClick={() => navigate({ to: `/${url}/${id}` })}
    >
      <i className={iconClass} />
      {label}
    </button>
  )
}

const MetricsTable = () => (
    <div className={styles.MetricsTable}>
      <table>
        <tr>
          <th>Name of the Repository</th>
          <th>Metrics</th>
          <th>Braches Info</th>
        </tr>
        <tr>
          <th>First Repository</th>
          <td>
            <Repoitems
              label="View"
              iconClass="fa-regular fa-eye"
              url="repository"
              id="1"
            />
          </td>
	  <td></td>
        </tr>
        <tr>
          <th>Second Repository</th>
          <td>
            <Repoitems
              label="View"
              iconClass="fa-regular fa-eye"
              url="repository"
              id="2"
            />
          </td>
	  <td></td>
        </tr>
        <tr>
          <th>Third Repository</th>
          <td>
            <Repoitems
              label="View"
              iconClass="fa-regular fa-eye"
              url="repository"
              id="3"
            />
          </td>
	  <td></td>
        </tr>
        <tr>
          <th>Second Repository</th>
          <td>
            <Repoitems
              label="View"
              iconClass="fa-regular fa-eye"
              url="repository"
              id="4"
            />
          </td>
	  <td></td>
        </tr>
      </table>
    </div>
)
export default MetricsTable

function RouteComponent() {
  return (
    <div className={styles.Box}>
      <MetricsTable/>
    </div>
  )
}
