// @flow
import * as actions from '../actions/auth';
import type { Action } from './types';

export type AuthState = {
  qrSlug?: string,
  qrConfirmationCountdown: number
};

const defaultState: AuthState = {
  qrSlug: undefined,
  qrConfirmationCountdown: 0
};

export default function auth(state: AuthState = defaultState, action: Action) {
  switch (action.type) {
    case actions.QR_REQUEST_SUCCESS:
      return {
        ...state,
        qrSlug: action.slug
      };
    case actions.QR_CONFIRMATION_TICK:
      return {
        ...state,
        qrConfirmationCountdown: action.seconds
      };
    default:
      return state;
  }
}
