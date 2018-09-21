import React from "react";
import { Provider, connect } from "react-redux";
import { INCREMENT } from "../reducers/counter";
import Content from "./Content";

const Counter = connect(state => state)(props => {
  return (
    <div>
      <button
        onClick={() => {
          props.dispatch({ type: INCREMENT });
        }}
      >
        +1
      </button>
      <code>{JSON.stringify(props)}</code>
    </div>
  );
});

export default props => {
  const state = props.store.getState();
  return (
    <Provider store={props.store}>
      <div>
        <header style={{ background: "#faa" }}>
          <h1>SWSRSSR / {state.router.location}</h1>
          <a href="/">Home</a>|<a href="/about">About</a>|
          <a href="/items">Items</a>
        </header>
        <Counter />
        <Content />
      </div>
    </Provider>
  );
};
