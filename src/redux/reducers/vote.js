/* @flow */

import {
  CLEAR_VOTE_MESSAGE,
  START_MAKING_VOTE,
  SUCCESS_MAKING_VOTE,
  FAILURE_MAKING_VOTE,
} from '../actionTypes';

import { type Action } from '../types/action';

export type VoteState = {|
  message: ?string,
|};

const initialState = {
  message: null,
};

export default function(
  state: VoteState = initialState,
  action: Action
): VoteState {
  switch (action.type) {
    case START_MAKING_VOTE: {
      return {
        ...state,
      };
    }
    case SUCCESS_MAKING_VOTE: {
      return {
        ...state,
        message: 'Suckes, twój głos został zapisany!',
      };
    }
    case FAILURE_MAKING_VOTE: {
      return {
        ...state,
        message: 'Ops, coś poszło nie tak, spróbuj ponownie!',
      };
    }
    case CLEAR_VOTE_MESSAGE: {
      return {
        ...state,
        message: null,
      };
    }
    default:
      return state;
  }
}
