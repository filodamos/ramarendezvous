import styles from './index.module.css'

function handleButtonClick(msg: string) {
  console.log(msg)
}

function MenuItem({ label, iconClass }: { label: string; iconClass: string }) {
  return (
    <div className={styles.menu_item}>
      <i className={`${styles.menu_icon} ${iconClass}`} />
      <button
        className={styles.menu_button}
        onClick={() => handleButtonClick(`${label} Button`)}
      >
        <i className={iconClass} />
        {label}
      </button>
    </div>
  )
}

export function SideBar() {
  return (
    <div className={styles.SideBar}>
      <div className={styles.logo}>
        <a href="/">RID</a>
      </div>
      <ul className="nav-links">
        {/* Provide the label and icon class */}
        <MenuItem label="Home" iconClass="fa-solid fa-house-chimney" />
        {/* Add more menu items here as needed */}
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
      </ul>
    </div>
  )
}
