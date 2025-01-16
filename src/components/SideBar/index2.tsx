type SideBarProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function handleButtonClick(msg: string) {
  console.log(msg)
}

export function SideBar({ isOpen,setIsOpen }: SideBarProps) {
  return (
    <div
      className={`sidebar ${isOpen ? 'open' : ''}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="logo">
        <a href="/">RID</a>
      </div>
      <ul className="nav-links">
        <div className="menu-item">
          <i className="fa-solid fa-house-chimney"></i>
          {isOpen && (
            <button
              className="menu-button"
              onClick={() => handleButtonClick('Home Button')}
            >
              Home
            </button>
          )}
        </div>
        <div className="menu-item">
          <i className="fa-regular fa-clipboard"></i>
          {isOpen && (
            <button
              className="menu-button"
              onClick={() => handleButtonClick('Info Button')}
            >
              Info
            </button>
          )}
        </div>
        <div className="menu-item">
          <i className="fa-solid fa-gears"></i>
          {isOpen && (
            <button
              className="menu-button"
              onClick={() => handleButtonClick('Settings Button')}
            >
              Settings
            </button>
          )}
        </div>
      </ul>
    </div>
  )
}
