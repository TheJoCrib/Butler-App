import { ActionTypes } from "./types";

var initState = {
  isAppLoading: false,
};

function general(state = initState, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, isAppLoading: action.data };
    default:
      return state;
  }
}

export { general };
