import { ActionTypes } from "./types";

/**
 * Action login
 * @param loginData
 * @returns {{type: string, loginData: object}}
 */
export function setCardsList(data) {
  return {
    type: ActionTypes.SET_CARDS,
    data,
  };
}
export function setJobsList(data) {
  return {
    type: ActionTypes.SET_JOBS,
    data,
  };
}

// export function testAction(data) {
//   return {
//     type: ActionTypes.TEST_ACTION,
//     data,
//   };
// }
