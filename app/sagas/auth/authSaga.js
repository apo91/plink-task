/* eslint-disable prettier/prettier */
import { takeLatest, put, select } from 'redux-saga/effects';
import * as actions from '../../actions/auth';

export default function* authSaga() {
  const slug = yield select(state => state.auth.slug);
  if (!slug) {
    yield put(actions.qrRequest());
  }
  yield takeLatest(actions.QR_CONFIRMATION_FAILURE, function* retry() {
    yield put(actions.qrRequest());
  });
}
