import React, { useState } from "react";
import "./App.css";
import { UpperBar } from "./components/UpperBar";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Functionality for a button click action
  const handleButtonClick = (buttonName) => {
    alert(`${buttonName} clicked!`);
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <div
        className={`sidebar ${isOpen ? "open" : ""}`}
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
                onClick={() => handleButtonClick("Home Button")}
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
                onClick={() => handleButtonClick("Info Button")}
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
                onClick={() => handleButtonClick("Settings Button")}
              >
                Settings
              </button>
            )}
          </div>
        </ul>
      </div>

      <div className="main-container">
        {/* Upperbar */}
        <UpperBar isOpen={isOpen} />
        <div className="content"></div>
      </div>
    </div>
  );
};

export default App;
