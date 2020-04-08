/*
  .edit 07-Apr-20 [Boat]
    -- remove <MainContainer>.
*/

import React from "react";
import "./App.css";

//import MainContainer from '../../components/MainContainer/index'
import SubContainer from '../../components/SubContainer/index'

function App() {
  return (
    <div className="App">
      <SubContainer/>
    </div>
  );
}

export default App;
