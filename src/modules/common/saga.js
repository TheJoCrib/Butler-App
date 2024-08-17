import AsyncStorage from '@react-native-async-storage/async-storage';
import {put, call, select, takeEvery} from 'redux-saga/effects';
import {handleError} from '../../utils/error';
import * as Actions from './constants';
import {getChatRooms, getJobInvites, getJobs} from './service';
import NavigationService from '../../utils/navigation';

/**
 * chat rooms saga
 * @returns {IterableIterator<*>}
 */
function* getChatRoomsSaga() {
  try {
    const data = yield call(getChatRooms);
    console.log('data is', data);
    if (
      data?.[0]?.data
    ) {
      yield put({
        type: Actions.GET_CHATROOMS_SUCCESS,
        payload: {
          chatRooms: data?.[0]?.data,
        },
      });
    } else {
      handleError(data ? data : '');
      yield put({
        type: Actions.GET_CHATROOMS_ERROR,
        payload: {
          message: data ? data : '',
        },
      });
    }
  } catch (e) {
    console.log('e', e.response);
    handleError(e?.response?.data || '');
    yield put({
      type: Actions.GET_CHATROOMS_ERROR,
      payload: {
        message: e && e.message ? e.message : '',
      },
    });
  }
}

/**
 * Jobs saga
 * @returns {IterableIterator<*>}
 */
 function* getJobsSaga() {
  try {
    const data = yield call(getJobs);
    console.log('data is', data);
    if (
      data?.data
    ) {
      yield put({
        type: Actions.GET_JOBS_SUCCESS,
        payload: {
          jobs: data?.data,
        },
      });
    } else {
      handleError(data ? data : '');
      yield put({
        type: Actions.GET_JOBS_ERROR,
        payload: {
          message: data ? data : '',
        },
      });
    }
  } catch (e) {
    console.log('e', e.response);
    handleError(e?.response?.data || '');
    yield put({
      type: Actions.GET_JOBS_ERROR,
      payload: {
        message: e && e.message ? e.message : '',
      },
    });
  }
}

/**
 * Job invites saga
 * @returns {IterableIterator<*>}
 */
 function* getJobInvitesSaga() {
  try {
    const data = yield call(getJobInvites,"PENDING");
    console.log('data is', data);
    if (
      data?.data
    ) {
      yield put({
        type: Actions.GET_JOB_INVITES_SUCCESS,
        payload: {
          jobs: data?.data,
        },
      });
    } else {
      handleError(data ? data : '');
      yield put({
        type: Actions.GET_JOB_INVITES_ERROR,
        payload: {
          message: data ? data : '',
        },
      });
    }
  } catch (e) {
    console.log('e', e.response);
    handleError(e?.response?.data || '');
    yield put({
      type: Actions.GET_JOB_INVITES_ERROR,
      payload: {
        message: e && e.message ? e.message : '',
      },
    });
  }
}

export default function* commonSaga() {
  yield takeEvery(Actions.GET_CHATROOMS, getChatRoomsSaga);
  yield takeEvery(Actions.GET_JOBS, getJobsSaga);
  yield takeEvery(Actions.GET_JOB_INVITES, getJobInvitesSaga);
}
