import React from "react";
import "./App.css";

import SideBar from '../../components/sideBar/index.js';
import MainContainer from '../../components/MainContainer/index'

function App() {
  return (
    <div className="App">
      <SideBar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <MainContainer/>
    </div>
  );
}

export default App;
