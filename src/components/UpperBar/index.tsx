import styles from './index.module.css'

function handleButtonClick(msg: string) {
  console.log(msg)
}

function SearchBar({
  iconClass,
  placeholder = 'Search...',
}: {
  iconClass: string
  placeholder?: string
}) {
  return (
    <div className={styles.search_wrapper}>
      <input
        type="text"
        className={styles.search_input}
        placeholder={placeholder}
      />
      <button className={styles.upperbar_button}>
        <i className={iconClass} />
        Search
      </button>
    </div>
  )
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
      className={`${styles.upperbar_button} ${additionalClass}`}
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
        <SearchBar iconClass="fa-solid fa-magnifying-glass" />
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
          label="User"
          iconClass="fa-regular fa-user"
          additionalClass={styles.user_button}
        />
      </div>
    </div>
  )
}
