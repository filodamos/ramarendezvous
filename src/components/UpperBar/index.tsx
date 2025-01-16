type UpperBarProps = {
  isOpen: boolean;
};

function handleButtonClick(msg: string) {
  console.log(msg);
}

export function UpperBar({ isOpen }: UpperBarProps) {
  return (
    <div className={`upperbar ${isOpen ? 'open' : ''}`}>
      <div className="upperbar-items">
        <div className="upperbar-item">
          <i className="fa-regular fa-bell"></i>
          <button
            className="upperbar-button"
            onClick={() => handleButtonClick("Notifications Button")}
          >
            Notifications
          </button>
        </div>
        <div className="upperbar-item">
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
        </div>
      </div>
    </div>
  );
}
