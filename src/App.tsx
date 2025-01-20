import React, { useState } from "react";
import "./App.css";
import { UpperBar } from "./components/UpperBar";
import { SideBar } from "./components/SideBar";

const App = () => {


  return (
    <div className="app">
      <SideBar />
      <div className="main-container">
        <UpperBar/>
        <div className="content"></div>
      </div>
    </div>
  );
};

export default App;
