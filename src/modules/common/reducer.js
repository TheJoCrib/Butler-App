import { REHYDRATE } from "redux-persist/lib/constants";
import * as Actions from "./constants";
import { notificationMessage } from "../../utils/error";
import { errorInit as initError } from "./config";

const initState = {
  chatRooms: [],
  chatRoomsError: initError,
  chatRoomsLoading: false,
  jobs: [],
  jobsError: initError,
  jobsLoading: false,
  jobInvites: [],
  jobInvitesError: initError,
  jobInvitesLoading: false,
};

export default function commonReducer(state = initState, action = {}) {
  switch (action.type) {
    case Actions.GET_CHATROOMS:
      return { ...state, chatRoomsLoading: true, chatRoomsError: initError };
    case Actions.GET_CHATROOMS_SUCCESS:
      return {
        ...state,
        chatRoomsLoading: false,
        chatRooms: action.payload.chatRooms,
      };
    case Actions.GET_CHATROOMS_ERROR:
      const errorChatRooms = notificationMessage(action.payload);
      return {
        ...state,
        chatRoomsLoading: false,
        chatRoomsError: errorChatRooms,
      };
    case Actions.GET_JOBS:
      return { ...state, jobsLoading: true, jobsError: initError };
    case Actions.GET_JOBS_SUCCESS:
      return {
        ...state,
        jobsLoading: false,
        jobs: action.payload.jobs,
      };
    case Actions.GET_JOB_INVITES_ERROR:
      const errorJobs = notificationMessage(action.payload);
      return {
        ...state,
        jobsLoading: false,
        jobsError: errorJobs,
      };
    case Actions.GET_JOB_INVITES:
      return { ...state, jobInvitesLoading: true, jobInvitesError: initError };
    case Actions.GET_JOB_INVITES_SUCCESS:
      return {
        ...state,
        jobInvitesLoading: false,
        jobInvites: action.payload.jobs,
      };
    case Actions.GET_JOB_INVITES_ERROR:
      const errorJobInvites = notificationMessage(action.payload);
      return {
        ...state,
        jobInvitesLoading: false,
        jobInvitesError: errorJobInvites,
      };
    case REHYDRATE:
      if (action.payload && action.payload.common) {
        return state;
      } else {
        return state;
      }
    default:
      return state;
  }
}
