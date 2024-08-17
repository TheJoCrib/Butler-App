import { ActionTypes } from "./types";

var initState = {
  cards: [],
};

function cardsReducer(state = initState, action) {
  switch (action.type) {
    case ActionTypes.SET_CARDS:
      return { ...state, cards: action.data };
    default:
      return state;
  }
}
var initStat = {
  jobs: [],
};

function jobsReducer(state = initStat, action) {
  switch (action.type) {
    case ActionTypes.SET_JOBS:
      return { ...state, jobs: action.data };
    default:
      return state;
  }
}

export { cardsReducer, jobsReducer };
