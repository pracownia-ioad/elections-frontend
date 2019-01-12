/* @flow */

import {
  START_LOGIN,
  SUCCESS_LOGIN,
  FAILURE_LOGIN,
  CREDENTIALS_RETRIEVED,
  CREDENTIALS_REMOVED,
} from '../actionTypes';

import { type Action } from '../types/action';
import { type User } from '../../types';

export type CandidatesState = {|
  user: ?User,
  loading: boolean,
|};

const initialState = {
  user: null,
  loading: false,
};

export default function(
  state: CandidatesState = initialState,
  action: Action
): CandidatesState {
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
      };
    }
    case FAILURE_LOGIN: {
      return {
        ...state,
        loading: false,
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
