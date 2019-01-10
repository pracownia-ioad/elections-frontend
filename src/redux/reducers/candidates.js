/* @flow */

import {
  START_CREATING_CANDIDATE,
  SUCCESS_CREATING_CANDIDATE,
  FAILURE_CREATING_CANDIDATE,
  START_CANDIDATES_FETCHING,
  SUCCESS_CANDIDATES_FETCHING,
  FAILURE_CANDIDATES_FETCHING,
} from '../actionTypes';

import { type Action } from '../types/action';
import { type Candidate } from '../../types';

export type CandidatesState = {|
  candidates: {
    [key: string]: Candidate,
  },
  fetchingCandidates: boolean,
  creatingCandidate: boolean,
|};

const initialState = {
  candidates: {},
  fetchingCandidates: false,
  creatingCandidate: false,
};

export default function(state: CandidatesState = initialState, action: Action) {
  switch (action.type) {
    case START_CREATING_CANDIDATE: {
      return {
        ...state,
        creatingCandidate: true,
      };
    }
    case SUCCESS_CREATING_CANDIDATE: {
      return {
        ...state,
        candidates: {
          ...state.candidates,
          [action.payload.id]: action.payload,
        },
        creatingCandidate: false,
      };
    }
    case FAILURE_CREATING_CANDIDATE: {
      return {
        ...state,
        creatingCandidate: false,
      };
    }
    case START_CANDIDATES_FETCHING: {
      return {
        ...state,
        fetchingCandidates: true,
      };
    }
    case SUCCESS_CANDIDATES_FETCHING: {
      const { payload } = action;
      const candidates = payload.reduce(
        (prev, curr: Candidate) => ({
          ...prev,
          [curr.id]: curr,
        }),
        {}
      );

      return {
        ...state,
        candidates,
        fetchingCandidates: false,
      };
    }
    case FAILURE_CANDIDATES_FETCHING: {
      return {
        ...state,
        fetchingCandidates: false,
      };
    }
    default:
      return state;
  }
}
