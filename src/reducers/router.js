export const ROUTE = "router:route";
export const REDIRECT = "router:redirect";

export const route = (to, context = {}) => {
  return {
    type: ROUTE,
    payload: {
      to,
      context
    }
  };
};

export const redirect = (to, context = {}) => {
  return {
    type: REDIRECT,
    payload: {
      to,
      context
    }
  };
};

const initialState = {
  location: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROUTE: {
      return {
        ...state,
        location: action.payload.to
      };
    }
    default: {
      return state;
    }
  }
};
