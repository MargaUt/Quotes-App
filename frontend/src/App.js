import "./App.css";
import React from "react";
import { withRouter } from "react-router-dom";
import Parallax from "./Parallax/Parallax.js";

function App(props) {
  return (
    <div className="App">
      <main role="main" className="container">
        <Parallax />
      </main>
    </div>
  );
}

export default withRouter(App);
