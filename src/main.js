import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import createStore from "./createStore";

const el = document.querySelector(".root");
const store = createStore(window.__initialState);

ReactDOM.hydrate(<App store={store} />, el);
