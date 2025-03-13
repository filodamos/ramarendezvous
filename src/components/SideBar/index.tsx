import { useState } from 'react'
import styles from './index.module.css'
import { useNavigate } from '@tanstack/react-router'

// MenuItem component
function MenuItem({
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
    <div className={styles.menu_item_container}>
      <div className={styles.menu_icon}>
        <i className={iconClass} />
      </div>
      <button
        className={styles.menu_item}
        onClick={() => navigate({ to: url })}
      >
        <i className={iconClass} />
        {label}
      </button>
    </div>
  )
}

// SideBar component with hamburger button
export function SideBar() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const toggleSidebar = () => {
    setSidebarOpen((p) => !p) // Toggle state for opening the sidebar
  }

  return (
    <div className={styles.SideBar} data-sidebaropen={sidebarOpen}>
      <button onClick={toggleSidebar} className={styles.toggle_button}>
        <div
          className={`${styles.container} ${sidebarOpen ? styles.change : ''}`}
        >
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
          <div className={styles.bar3}></div>
        </div>
      </button>
      <ul className={styles.nav_links}>
        <MenuItem
          label="Home"
          iconClass="fa-solid fa-house-chimney"
          url="/"
        />
        <MenuItem label="Info" iconClass="fa-regular fa-clipboard" />
        <MenuItem label="Settings" iconClass="fa-solid fa-gears" />
        <MenuItem
          label="Repositories"
          iconClass="fa-solid fa-book"
          url="/repositories"
        />
      </ul>
    </div>
  )
}
