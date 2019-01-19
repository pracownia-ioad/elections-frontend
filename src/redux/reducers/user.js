/* @flow */

import {
  START_LOGIN,
  SUCCESS_LOGIN,
  FAILURE_LOGIN,
  CREDENTIALS_RETRIEVED,
  CREDENTIALS_REMOVED,
  CLEAR_LOGIN_MESSAGE,
} from '../actionTypes';

import { type Action } from '../types/action';
import { type User } from '../../types';

export type UserState = {|
  user: ?User,
  loading: boolean,
  message: ?string,
|};

const initialState = {
  user: null,
  loading: false,
  message: null,
};

export default function(
  state: UserState = initialState,
  action: Action
): UserState {
  switch (action.type) {
    case START_LOGIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case SUCCESS_LOGIN: {
      return {
        ...state,
        user: action.payload,
        loading: false,
        message: 'Sukces, udało Ci się zalogować!',
      };
    }
    case FAILURE_LOGIN: {
      return {
        ...state,
        loading: false,
        message: 'Ops, coś poszło nie tak, spróbuj ponownie!',
      };
    }
    case CLEAR_LOGIN_MESSAGE: {
      return {
        ...state,
        message: null,
      };
    }
    case CREDENTIALS_RETRIEVED: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case CREDENTIALS_REMOVED: {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
}
