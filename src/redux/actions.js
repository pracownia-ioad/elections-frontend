/* @flow */
import { AUTH_DATA_KEY } from '../constants';

import { type Dispatch } from './types/store';

import {
  START_CANDIDATES_FETCHING,
  SUCCESS_CANDIDATES_FETCHING,
  FAILURE_CANDIDATES_FETCHING,
  START_CREATING_CANDIDATE,
  SUCCESS_CREATING_CANDIDATE,
  FAILURE_CREATING_CANDIDATE,
  START_CREATING_ELECTION,
  SUCCESS_CREATING_ELECTION,
  FAILURE_CREATING_ELECTION,
  START_ELECTIONS_FETCHING,
  SUCCESS_ELECTIONS_FETCHING,
  FAILURE_ELECTIONS_FETCHING,
  START_LOGIN,
  SUCCESS_LOGIN,
  FAILURE_LOGIN,
  CREDENTIALS_RETRIEVED,
  CREDENTIALS_REMOVED,
  FAILURE_CREDENTIALS_RETRIEVE,
} from './actionTypes';

import {
  getCandidates,
  createCandidate,
  createElection as createElectionService,
  getElections,
} from '../services';
import {
  type LocalCandidate,
  type LocalElection,
  type User,
  type Credentials,
} from '../types';

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
      dispatch({ type: START_CREATING_ELECTION });
      await createElectionService(election);
      dispatch({ type: SUCCESS_CREATING_ELECTION });
    } catch (err) {
      dispatch({ type: FAILURE_CREATING_ELECTION });
    }
  };
}

export function fetchElections() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: START_ELECTIONS_FETCHING });
      // $FlowFixMe broken typings for async/await
      const elections = await getElections();
      const mappedElections = elections.map(election => {
        const { startDate, endDate } = election;
        return {
          ...election,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        };
      });

      dispatch({ type: SUCCESS_ELECTIONS_FETCHING, payload: mappedElections });
    } catch (err) {
      dispatch({ type: FAILURE_ELECTIONS_FETCHING });
    }
  };
}

export function login(credentials: Credentials) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: START_LOGIN });
      // TODO: actual call to api
      const data = { index: credentials.index, token: 'xyz', isAdmin: true };
      window.localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(data));
      dispatch({
        type: SUCCESS_LOGIN,
        payload: data,
      });
    } catch (err) {
      dispatch({ type: FAILURE_LOGIN });
    }
  };
}

export function retrieveCredentials() {
  const maybeCredentials: null | User = JSON.parse(
    window.localStorage.getItem(AUTH_DATA_KEY)
  );

  if (maybeCredentials) {
    return { type: CREDENTIALS_RETRIEVED, payload: maybeCredentials };
  }

  return { type: FAILURE_CREDENTIALS_RETRIEVE };
}

export function removeCredentials() {
  window.localStorage.removeItem(AUTH_DATA_KEY);
  return {
    type: CREDENTIALS_REMOVED,
  };
}
