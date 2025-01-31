import { createLazyFileRoute } from "@tanstack/react-router";
import { Link, useNavigate } from '@tanstack/react-router'
import styles from './index.module.css'
export const Route = createLazyFileRoute("/repositories/")({
  component: RouteComponent,
});

function Repoitems({
  label,
  iconClass,
  url,
}: {
  label: string
  iconClass: string
  url: string
}) {
  const navigate = useNavigate()

  return (
    <button
      className={styles.ViewButton}
      onClick={() => navigate({ to: url })}
    >
      <i className={iconClass} />
      {label}
    </button>
  )
}
function RouteComponent() {
  return (
    <div className={styles.Box}>
      <ul className={styles.list}>
        <li>
          <p>Fast-Api-Repo 
          <Repoitems
            label="View"
            iconClass="fa-regular fa-eye"
            url="/repository"
          /></p>
        </li>
        <li>
          <p>Fast-Api-Repo 
          <Repoitems
            label="View"
            iconClass="fa-regular fa-eye"
            url="/repository"
          /></p>
        </li>
      </ul>
    </div>
  )
}
