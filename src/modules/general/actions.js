import { ActionTypes } from "./types";

/**
 * Action login
 * @param loginData
 * @returns {{type: string, loginData: object}}
 */
export function setAppLoading(data) {
  return {
    type: ActionTypes.SET_LOADING,
    data,
  };
}

export function testAction(data) {
  return {
    type: ActionTypes.TEST_ACTION,
    data,
  };
}
