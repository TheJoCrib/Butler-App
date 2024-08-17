import * as Actions from "./constants";

/**
 * Action getChatRooms
 * @returns {{type: string}}
 */
export function getChatRooms() {
  return {
    type: Actions.GET_CHATROOMS,
  };
}

/**
 * Action getJobs
 * @returns {{type: string}}
 */
export function getJobs() {
  return {
    type: Actions.GET_JOBS,
  };
}

/**
 * Action getJobInvites
 * @returns {{type: string}}
 */
export function getJobInvites() {
  return {
    type: Actions.GET_JOB_INVITES,
  };
}
