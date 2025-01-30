import { Link, useNavigate } from "@tanstack/react-router";
import styles from "./index.module.css";

function handleButtonClick(msg: string) {
  console.log(msg);
}

function SearchBar({
  iconClass,
  placeholder = "Search...",
}: {
  iconClass: string;
  placeholder?: string;
}) {
  return (
    <div className={styles.SearchBar}>
      <input type="text" placeholder={placeholder} />
    </div>
  );
}

function UpperbarItem({
  label,
  iconClass,
  url,
}: {
  label: string;
  iconClass: string;
  url: string;
}) {
  const navigate = useNavigate();

  // return (
  //   <Link to={url} className={styles.UpperbarItem}>
  //     {label}
  //   </Link>
  // );

  return (
    <button
      className={styles.UpperbarItem}
      onClick={() => navigate({ to: url })}
    >
      <i className={iconClass} />
      {label}
    </button>
  );
}

export function UpperBar() {
  return (
    <div className={styles.UpperBar}>
      <div className={styles.logo}>
        <a href="/">RID</a>
      </div>
      <div className={styles.upperbar_items}>
        <SearchBar iconClass="fa-solid fa-magnifying-glass" />
        <UpperbarItem
          label="Dashboard"
          url="/dashboard"
          iconClass="fa-regular fa-bell"
        />
        <UpperbarItem label="Notifications" iconClass="fa-regular fa-bell" />
        <UpperbarItem label="Contact" iconClass="fa-solid fa-phone" />
        <UpperbarItem label="User" iconClass="fa-regular fa-user" />
      </div>
    </div>
  );
}
