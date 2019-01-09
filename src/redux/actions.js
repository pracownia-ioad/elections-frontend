/* @flow */

import {
  ADD_CANDIDATE,
  START_CANDIDATES_FETCHING,
  STOP_CANDIDATES_FETCHING,
} from './actionTypes';

import { getCandidates } from '../services';
import { type Candidate } from '../types';

export function fetchCandidates() {
  return async dispatch => {
    try {
      dispatch({ type: START_CANDIDATES_FETCHING });
      const data = await getCandidates();
      dispatch({ type: STOP_CANDIDATES_FETCHING, payload: data });
    } catch (err) {
      dispatch({ type: STOP_CANDIDATES_FETCHING, payload: [] });
    }
  };
}

export function addCandidate(candidate: Candidate) {
  console.log('!@# addCandidate');
  return {
    type: ADD_CANDIDATE,
    payload: candidate,
  };
}
