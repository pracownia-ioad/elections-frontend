/* @flow */

import {
  START_CREATING_ELECTION,
  SUCCESS_CREATING_ELECTION,
  FAILURE_CREATING_ELECTION,
  START_ELECTIONS_FETCHING,
  SUCCESS_ELECTIONS_FETCHING,
  FAILURE_ELECTIONS_FETCHING,
  CLEAR_ELECTIONS_MESSAGE,
} from '../actionTypes';

import { type Action } from '../types/action';
import { type Election } from '../../types';

export type CandidatesState = {|
  elections: {
    [key: string]: Election,
  },
  creatingElection: boolean,
  fetchingElections: boolean,
  message: ?string,
|};

const initialState = {
  elections: {},
  creatingElection: false,
  fetchingElections: false,
  message: null,
};

export default function(
  state: CandidatesState = initialState,
  action: Action
): CandidatesState {
  switch (action.type) {
    case START_CREATING_ELECTION: {
      return {
        ...state,
        creatingElection: true,
      };
    }
    case SUCCESS_CREATING_ELECTION: {
      return {
        ...state,
        creatingElection: false,
        message: 'Sukces, udało się stworzyć głosowanie!',
      };
    }
    case FAILURE_CREATING_ELECTION: {
      return {
        ...state,
        creatingElection: false,
        message: 'Ops, coś poszło nie tak, spróbuj ponownie.',
      };
    }
    case CLEAR_ELECTIONS_MESSAGE: {
      return {
        ...state,
        message: null,
      };
    }
    case START_ELECTIONS_FETCHING: {
      return {
        ...state,
        fetchingElections: true,
      };
    }
    case SUCCESS_ELECTIONS_FETCHING: {
      const elections = action.payload.reduce(
        (prev, curr) => ({ ...prev, [curr.id]: curr }),
        {}
      );
      return {
        ...state,
        elections,
        fetchingElections: false,
      };
    }
    case FAILURE_ELECTIONS_FETCHING: {
      return {
        ...state,
        fetchingElections: false,
      };
    }
    default:
      return state;
  }
}
