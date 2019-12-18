// @flow

export const QR_REQUEST = 'QR_REQUEST';
export const QR_REQUEST_SUCCESS = 'QR_REQUEST_SUCCESS';
export const QR_REQUEST_FAILURE = 'QR_REQUEST_FAILURE';
export const QR_CONFIRMATION_START = 'QR_CONFIRMATION_START';
export const QR_CONFIRMATION_TICK = 'QR_CONFIRMATION_TICK';
export const QR_CONFIRMATION_SUCCESS = 'QR_CONFIRMATION_SUCCESS';
export const QR_CONFIRMATION_FAILURE = 'QR_CONFIRMATION_FAILURE';

export function qrRequest() {
  return {
    type: QR_REQUEST
  };
}

export function qrRequestSuccess(slug: string) {
  return {
    type: QR_REQUEST_SUCCESS,
    slug
  };
}

export function qrRequestFailure() {
  return {
    type: QR_REQUEST_FAILURE
  };
}

export function qrConfirmationStart() {
  return {
    type: QR_CONFIRMATION_START
  };
}

export function qrConfirmationTick(seconds: number) {
  return {
    type: QR_CONFIRMATION_TICK,
    seconds
  };
}

export function qrConfirmationSuccess() {
  return {
    type: QR_CONFIRMATION_SUCCESS
  };
}

export function qrConfirmationFailure(reason: 'TIMEOUT' | 'ERROR') {
  return {
    type: QR_CONFIRMATION_FAILURE,
    reason
  };
}
