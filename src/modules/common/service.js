import {getRequest} from '../../network/api';
import {GET_CHATROOMS} from '../../network/endpoints';
import {GET_JOBS, GET_JOB_INVITES} from '../../network/endpoints';

export const getChatRooms = () => getRequest(GET_CHATROOMS);

export const getJobs = () => getRequest(GET_JOBS);

export const getJobInvites = status => getRequest(GET_JOB_INVITES, {q: status});
