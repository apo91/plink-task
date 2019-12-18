/* eslint-disable no-else-return */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { eventChannel, END } from 'redux-saga';
import { call, race, take, takeLatest, put, select } from 'redux-saga/effects';
import * as actions from '../actions/auth';

function countdownChannel(seconds: number) {
  let remaining = seconds;
  return eventChannel(emitter => {
    const interval = setInterval(() => {
      if (remaining > 0) {
        remaining -= 1;
      }
      emitter(remaining);
    }, 1000);
    return () => {
      console.log('clearing interval');
      clearInterval(interval);
    };
  });
}

function websocketChannel(
  url: string,
  messageCallback: (emitter: Subscribe<Any>, data: MessageEvent) => void,
  errorCallback: (emitter: Subscribe<Any>, data: MessageEvent) => void
) {
  return eventChannel(emitter => {
    const ws = new WebSocket(url);
    ws.onmessage = (event) => {
      messageCallback(emitter, event);
    };
    ws.onerror = (error) => {
      errorCallback(emitter, error);
    };
    return () => {
      console.log('closing websocket');
      ws.close();
    };
  });
}

function apiFetchQr() {
  return fetch('https://plink.tech/qrcode_authentications/', {
    method: 'POST'
  });
}

export function* qrRequestSaga() {
  yield takeLatest(actions.QR_REQUEST, function* performQrRequest() {
    try {
      const response = yield call(apiFetchQr);
      if (!response.ok) {
        throw new Error();
      }
      const data = yield call([response, response.json]);
      console.log('QR_REQUEST_SUCCESS data:', data);
      yield put(actions.qrRequestSuccess(data.slug));
    } catch {
      yield put(actions.qrRequestFailure());
    }
  });
}

export function* qrConfirmationSaga() {
  yield takeLatest(actions.QR_REQUEST_SUCCESS, function* qrConfirmationCountdown({ slug }) {
    const confirmationChannel = yield call(websocketChannel,
      `wss://plink.tech/wss/qr_code_authentication/${slug}/`,
      (emitter, msg) => {
        console.log('wss onmessage: ', msg);
        emitter(msg);
      },
      (emitter, _error) => emitter(END));
    const confirmationTimeoutChannel = yield call(countdownChannel, 60);
    yield put(actions.qrConfirmationStart());
    try {
      while (true) {
        const { confirmationSuccessResponse, secondsUntilTimeout } = yield race({
          confirmationSuccessResponse: take(confirmationChannel),
          secondsUntilTimeout: take(confirmationTimeoutChannel)
        });
        if (confirmationSuccessResponse !== undefined) {
          confirmationChannel.close();
          confirmationTimeoutChannel.close();
          yield put(actions.qrConfirmationSuccess());
          return;
        } else if (secondsUntilTimeout !== undefined) {
          if (secondsUntilTimeout > 0) {
            yield put(actions.qrConfirmationTick(secondsUntilTimeout));
            console.log(`countdown: ${secondsUntilTimeout}`);
          } else {
            confirmationChannel.close();
            confirmationTimeoutChannel.close();
            yield put(actions.qrConfirmationFailure('TIMEOUT'));
            return;
          }
        }
      }
    } catch {
      confirmationChannel.close();
      confirmationTimeoutChannel.close();
      yield put(actions.qrConfirmationFailure('ERROR'));
    }
  });
}

export function* authSaga() {
  const slug = yield select(state => state.auth.slug);
  if (!slug) {
    yield put(actions.qrRequest());
  }
  yield takeLatest(actions.QR_CONFIRMATION_FAILURE, function* retry() {
    yield put(actions.qrRequest());
  });
}
