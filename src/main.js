import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const el = document.querySelector(".root");
ReactDOM.hydrate(<App />, el);

console.log("initialState", window.__initialState);
