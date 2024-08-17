import { all } from 'redux-saga/effects';
import authSaga from './modules/auth/saga';
import commonSaga from './modules/common/saga';

/**
 * Root saga
 * @returns {IterableIterator<AllEffect | GenericAllEffect<any> | *>}
 */
export default function* rootSagas() {
  yield all([
    authSaga(),
    commonSaga()
  ]);
}
