import React from "react";
import { Provider, connect } from "react-redux";

const Counter = connect(state => state)(props => {
  return (
    <div>
      <button
        onClick={() => {
          props.dispatch({ type: "increment" });
        }}
      >
        +1
      </button>
      <code>{JSON.stringify(props)}</code>
    </div>
  );
});

export default props => {
  return (
    <Provider store={props.store}>
      <div>
        <h1>ServiceWorker Side React Server Side Rendering</h1>
        <Counter />
      </div>
    </Provider>
  );
};
