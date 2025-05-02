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
    <button className={styles.menu_item} onClick={() => navigate({ to: url })}>
      <i className={iconClass} />
      {label}
    </button>
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
      <button onClick={toggleSidebar} className={styles.hamburger_button}>
        <div
          className={`${styles.three_bars} ${sidebarOpen ? styles.change : ''}`}
        >
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
          <div className={styles.bar3}></div>
        </div>
      </button>
      <div  className={styles.nav_links}>
        {sidebarOpen ? (
     
            <div className={styles.menu_icons_buttons}>
              <MenuItem
                label="Home"
                iconClass="fa-solid fa-house-chimney"
                url="/"
              />
              <MenuItem
                label="Info"
                iconClass="fa-regular fa-clipboard"
                url="null"
              />
              <MenuItem
                label="Settings"
                iconClass="fa-solid fa-gears"
                url="null"
              />
              <MenuItem
                label="Repositories"
                iconClass="fa-solid fa-book"
                url="/repositories"
              />
           
          </div>
        ) : (
          <div className={styles.menu_icons_buttons}>
            <i className="fa-solid fa-house-chimney" />
            <i className="fa-regular fa-clipboard" />
            <i className="fa-solid fa-gears" />
            <i className="fa-solid fa-book" />
          </div>
        )}
      </div>
      {/* <div onMouseLeave={toggleSidebar}></div> */}
    </div>
  )
}
