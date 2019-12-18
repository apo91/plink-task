/* eslint-disable prettier/prettier */
import { call, race, take, takeLatest, put } from 'redux-saga/effects';
import countdownChannel from '../utils/countdownChannel';
import websocketChannel from '../utils/websocketChannel';
import * as actions from '../../actions/auth';
import endpoints from '../../endpoints';

const WS_CONFIRMATION_SUCCESS = 'WS_CONFIRMATION_SUCCESS';
const WS_CONFIRMATION_ERROR = 'WS_CONFIRMATION_ERROR';

function handleConfirmationWebSocketMessage(emitter, event) {
  try {
    const data = JSON.parse(event.data);
    emitter({
      type: WS_CONFIRMATION_SUCCESS,
      userToken: data.user_token
    });
  } catch {
    emitter({
      type: WS_CONFIRMATION_ERROR,
      data: event
    });
  }
}

function handleConfirmationWebSocketError(emitter, event) {
  emitter({
    type: WS_CONFIRMATION_ERROR,
    data: event
  });
}

export default function* qrConfirmationSaga() {
  yield takeLatest(actions.QR_REQUEST_SUCCESS, function* qrConfirmationCountdown({ slug }) {
    const confirmationWebSocketChannel = yield call(websocketChannel, endpoints.auth.qrConfirmation(slug), {
        onMessage: handleConfirmationWebSocketMessage,
        onError: handleConfirmationWebSocketError
      }
    );
    const confirmationCountdownChannel = yield call(countdownChannel, endpoints.auth.qrConfirmationTimeout);
    yield put(actions.qrConfirmationStart());
    try {
      while (true) {
        const { confirmationWebSocketEvent, secondsUntilTimeout } = yield race({
          confirmationWebSocketEvent: take(confirmationWebSocketChannel),
          secondsUntilTimeout: take(confirmationCountdownChannel)
        });
        if (confirmationWebSocketEvent !== undefined) {
          switch (confirmationWebSocketEvent.type) {
            case WS_CONFIRMATION_SUCCESS:
              confirmationWebSocketChannel.close();
              confirmationCountdownChannel.close();
              yield put(actions.qrConfirmationSuccess());
              return;
            case WS_CONFIRMATION_ERROR:
            default:
              yield put(actions.qrConfirmationFailure('ERROR'));
              return;
          }
        } else if (secondsUntilTimeout !== undefined) {
          if (secondsUntilTimeout > 0) {
            yield put(actions.qrConfirmationTick(secondsUntilTimeout));
          } else {
            confirmationWebSocketChannel.close();
            confirmationCountdownChannel.close();
            yield put(actions.qrConfirmationFailure('TIMEOUT'));
            return;
          }
        }
      }
    } catch {
      confirmationWebSocketChannel.close();
      confirmationCountdownChannel.close();
      yield put(actions.qrConfirmationFailure('ERROR'));
    }
  });
}
