/* eslint-disable prettier/prettier */
import { call, takeLatest, put } from 'redux-saga/effects';
import * as actions from '../../actions/auth';
import endpoints from '../../endpoints';

export default function* qrRequestSaga() {
  yield takeLatest(actions.QR_REQUEST, function* performQrRequest() {
    try {
      const response = yield call(fetch, endpoints.auth.qrRequest, {
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error();
      }
      const data = yield call([response, response.json]);
      yield put(actions.qrRequestSuccess(data.slug));
    } catch {
      yield put(actions.qrRequestFailure());
    }
  });
}
