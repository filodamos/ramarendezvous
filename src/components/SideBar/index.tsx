import React, { useState } from 'react'
import styles from './index.module.css'

function handleButtonClick(msg: string) {
  console.log(msg)
}

// MenuItem component
function MenuItem({ label, iconClass }: { label: string; iconClass: string }) {
  return (
    <button
      className={styles.menu_item}
      onClick={() => handleButtonClick(`${label} Button`)}
    >
      <i className={iconClass} />
      {label}
    </button>
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
        <div className={styles.content}>
          <ul className={styles.nav_links}>
            <MenuItem label="Home" iconClass="fa-solid fa-house-chimney" />
            <MenuItem label="Info" iconClass="fa-regular fa-clipboard" />
            <MenuItem label="Settings" iconClass="fa-solid fa-gears" />
          </ul>
        </div>
     
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
