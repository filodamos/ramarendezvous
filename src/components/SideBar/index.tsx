import React, { useState } from 'react'
import styles from './index.module.css'

// MenuItem component
function MenuItem({ label, iconClass }) {
  return (
    <div className={styles.menu_item}>
      <i className={`${styles.menu_icon} ${iconClass}`} />
      <span className={styles.menu_label}>{label}</span>
    </div>
  )
}

// SideBar component with hamburger button
export function SideBar() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen) // Toggle state for opening the sidebar
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
      <div className={styles.logo}>
        <a href="/">RID</a>
      </div>
      {sidebarOpen && (
        <div className={styles.content}>
          <ul className={styles.nav_links}>
            <MenuItem label="Home" iconClass="fa-solid fa-house-chimney" />
          </ul>
        </div>
      )}
    </div>
  )
}

{
  // <div className="menu-item">
  //   <i className="fa-regular fa-clipboard"></i>
  //   <button
  //     className="menu-button"
  //     onClick={() => handleButtonClick("Info Button")}
  //   >
  //     Info
  //   </button>
  // </div>
  // <div className="menu-item">
  //   <i className="fa-solid fa-gears"></i>
  //   <button
  //     className="menu-button"
  //     onClick={() => handleButtonClick("Settings Button")}
  //   >
  //     Settings
  //   </button>
  //   </div>
}
