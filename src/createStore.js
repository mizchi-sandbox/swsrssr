import { createStore, combineReducers } from "redux";
import counter from "./reducers/counter";
import router from "./reducers/router";

const reducer = combineReducers({
  counter,
  router
});

export default (state = undefined) => {
  return createStore(reducer, state);
};
