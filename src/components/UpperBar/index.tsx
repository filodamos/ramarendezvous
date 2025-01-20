import styles from './index.module.css'

function handleButtonClick(msg: string) {
  console.log(msg);
}

function UpperbarItem ({ label, iconClass }: { label: string; iconClass: string }) {
  return (
    <div className="styles.upperbar-item">
      <button
        className="styles.upperbar-button"
        onClick={() => handleButtonClick(`${label} Button`)}
      >
        <i className={iconClass} />
        {label}
      </button>
    </div>
  )
}
export function UpperBar( ) {
  return (
    <div className={styles.UpperBar}>
      <div className="styles.upperbar-items">
       
        <UpperbarItem label="Notifications" iconClass="fa-regular fa-bell" />
        
        {/* <div className="upperbar-item">
          <i className="fa-solid fa-phone"></i>
          <button
            className="upperbar-button"
            onClick={() => handleButtonClick("Contact Button")}
          >
            Contact
          </button>
        </div>
        <div className="upperbar-item">
          <i className="fa-regular fa-user"></i>
          <button
            className="upperbar-button"
            onClick={() => handleButtonClick("Profile Button")}
          >
            Profile
          </button>
        </div>
        <div className="upperbar-item">
          <i className="fa-solid fa-magnifying-glass"></i>
          <button
            className="upperbar-button"
            onClick={() => handleButtonClick("Search Button")}
          >
            Search
          </button>
        </div> */}
      </div>
    </div>
  );
}
