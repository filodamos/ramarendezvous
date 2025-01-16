import React, { useState } from "react";
import "./App.css";
import { UpperBar } from "./components/UpperBar";
import { SideBar } from "./components/SideBar";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app">
      <SideBar />
      <div className="main-container">
        <UpperBar isOpen={isOpen} />
        <div className="content"></div>
      </div>
    </div>
  );
};

export default App;
