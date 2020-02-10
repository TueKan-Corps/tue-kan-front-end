import React from "react";
import logo from "../../assets/icon/logo.svg";
import "./App.css";
import SideBar from '../../components/sideBar/index.js';

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
    </div>
  );
}

export default App;
