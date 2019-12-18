// @flow
import * as actions from '../actions/auth';
import type { Action } from './types';

export type AuthStatus =
  | 'WAITING_FOR_SLUG'
  | 'WAITING_FOR_CONFIRMATION'
  | 'AUTHENTICATED';

export type AuthState = {
  authStatus: AuthStatus,
  qrSlug?: string,
  qrConfirmationCountdown: number
};

const defaultState: AuthState = {
  authStatus: 'WAITING_FOR_SLUG',
  qrSlug: undefined,
  qrConfirmationCountdown: 0
};

export default function auth(state: AuthState = defaultState, action: Action) {
  switch (action.type) {
    case actions.QR_REQUEST:
      return {
        ...state,
        authStatus: 'WAITING_FOR_SLUG'
      };
    case actions.QR_REQUEST_SUCCESS:
      return {
        ...state,
        qrSlug: action.slug
      };
    case actions.QR_CONFIRMATION_START:
      return {
        ...state,
        authStatus: 'WAITING_FOR_CONFIRMATION'
      };
    case actions.QR_CONFIRMATION_TICK:
      return {
        ...state,
        qrConfirmationCountdown: action.seconds
      };
    case actions.QR_CONFIRMATION_SUCCESS:
      return {
        ...state,
        authStatus: 'AUTHENTICATED'
      };
    default:
      return state;
  }
}
