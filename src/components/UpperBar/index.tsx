import styles from './index.module.css'

function handleButtonClick(msg: string) {
  console.log(msg)
}

function UpperbarItem({
  label,
  iconClass,
  additionalClass = '',
}: {
  label: string
  iconClass: string
  additionalClass?: string
}) {
  return (
    <button
      className={`${styles.upperbar_button} ${additionalClass}`} // Combine global & scoped classes
      onClick={() => handleButtonClick(`${label} Button`)}
    >
      <i className={iconClass} />
      {label}
    </button>
  )
}

export function UpperBar() {
  return (
    <div className={styles.UpperBar}>
      <div className={styles.upperbar_items}>
        <UpperbarItem
          label="User"
          iconClass="fa-regular fa-user"
          additionalClass={styles.user_button}
        />
        <UpperbarItem
          label="Notifications"
          iconClass="fa-regular fa-bell"
          additionalClass={styles.notifications_button}
        />
        <UpperbarItem
          label="Contact"
          iconClass="fa-solid fa-phone"
          additionalClass={styles.contact_button}
        />
        <UpperbarItem
          label="Search"
          iconClass="fa-solid fa-magnifying-glass"
          additionalClass={styles.search_button}
        />
      </div>
    </div>
  )
}
