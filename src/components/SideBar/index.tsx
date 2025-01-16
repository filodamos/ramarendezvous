import styles from "./index.module.css";

function handleButtonClick(msg: string) {
  console.log(msg);
}

export function SideBar() {
  return (
    <div className={styles.SideBar}>
      <div className="logo">
        <a href="/">RID</a>
      </div>
      <ul className="nav-links">
        <div className={styles.menu_item}>
          <i className={`${styles.menu_icon} fa-solid fa-house-chimney`} />
          <button
            className={styles.menu_button}
            onClick={() => handleButtonClick("Home Button")}
          >
            <i className="fa-solid fa-house-chimney" />
            Home
          </button>
        </div>
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
  );
}
