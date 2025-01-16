import React, { useState } from "react";
import "./App.css";
import { UpperBar } from "./components/UpperBar";
import { SideBar } from  "./components/SideBar/index2";


const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Functionality for a button click action
  const handleButtonClick = (buttonName) => {
    alert(`${buttonName} clicked!`);
  };

  return (
    <div className="app">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
      <div className="main-container">
        {/* Upperbar */}
        <UpperBar isOpen={isOpen} />
        <div className="content"></div>
      </div>
    </div>
  );
};

export default App;
