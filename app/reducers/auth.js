// @flow
import * as actions from '../actions/auth';
import type { AuthState, Action } from './types';

const defaultState: AuthState = {
  qrSlug: null,
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
