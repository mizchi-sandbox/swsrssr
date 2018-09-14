import { createStore, combineReducers } from "redux";

const initialState = {
  value: 0
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "increment": {
      return { value: state.value + 1 };
    }
    default: {
      return state;
    }
  }
};

const reducer = combineReducers({
  app: appReducer
});

export default (state = undefined) => {
  return createStore(reducer, state);
};
