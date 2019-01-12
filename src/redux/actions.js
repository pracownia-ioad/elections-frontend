/* @flow */
import { type Dispatch } from './types/store';

import {
  START_CANDIDATES_FETCHING,
  SUCCESS_CANDIDATES_FETCHING,
  FAILURE_CANDIDATES_FETCHING,
  START_CREATING_CANDIDATE,
  SUCCESS_CREATING_CANDIDATE,
  FAILURE_CREATING_CANDIDATE,
} from './actionTypes';

import { getCandidates, createCandidate } from '../services';
import { type LocalCandidate, type LocalElection } from '../types';

export function fetchCandidates() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: START_CANDIDATES_FETCHING });
      const data = await getCandidates();
      dispatch({ type: SUCCESS_CANDIDATES_FETCHING, payload: data });
    } catch (err) {
      dispatch({ type: FAILURE_CANDIDATES_FETCHING });
    }
  };
}

export function addCandidate(candidate: LocalCandidate) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: START_CREATING_CANDIDATE });
      const candidateData = await createCandidate(candidate);
      dispatch({ type: SUCCESS_CREATING_CANDIDATE, payload: candidateData });
    } catch (err) {
      dispatch({ type: FAILURE_CREATING_CANDIDATE });
    }
  };
}

export function createElection(election: LocalElection) {
  return async (dispatch: Dispatch) => {
    try {
      console.log('Creating election');
      // TODO: implement this.
    } catch (err) {
      // TODO: implement this
    }
  };
}
