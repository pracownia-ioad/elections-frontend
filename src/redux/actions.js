/* @flow */
import { navigate } from '@reach/router';

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
  START_MAKING_VOTE,
  SUCCESS_MAKING_VOTE,
  FAILURE_MAKING_VOTE,
  START_FETCHING_STATISTICS,
  SUCCESS_FETCHING_STATISTICS,
  FAILURE_FETCHING_STATISTICS,
  CLEAR_ELECTIONS_MESSAGE,
  CLEAR_CANDIDATE_MESSAGE,
  CLEAR_VOTE_MESSAGE,
  CLEAR_LOGIN_MESSAGE,
  USER_ALREADY_VOTED,
} from './actionTypes';
import {
  getCandidates,
  createCandidate,
  createElection as createElectionService,
  getElections,
  vote,
  getStatistics,
  loginUser,
} from '../services';
import {
  type LocalCandidate,
  type LocalElection,
  type User,
  type Credentials,
  type VoteObject,
} from '../types';
import { type Action } from './types/action';

export function fetchCandidates() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: START_CANDIDATES_FETCHING });
      const { data } = await getCandidates();
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
      const { data } = await createCandidate(candidate);
      dispatch({ type: SUCCESS_CREATING_CANDIDATE, payload: data });
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
      fetchElections()(dispatch);
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
      // $FlowFixMe broken typings..
      const { data } = await getElections();
      const mappedElections = data.map(election => {
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
      const { data } = await loginUser({
        username: credentials.index,
        password: credentials.password,
      });
      const mapped = {
        index: credentials.index,
        token: data.token,
        isAdmin: data.roles.includes('ROLE_ADMIN'),
      };
      window.localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(mapped));
      dispatch({
        type: SUCCESS_LOGIN,
        payload: mapped,
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

export function makeVote(voteInfo: VoteObject) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: START_MAKING_VOTE });
      await vote(voteInfo);
      dispatch({ type: SUCCESS_MAKING_VOTE });
      navigate('/dashboard/user/success');
    } catch (err) {
      if (err.response.status === 412) {
        dispatch({ type: USER_ALREADY_VOTED });
        navigate('/dashboard/user/failure/already-voted');
        return;
      }
      dispatch({ type: FAILURE_MAKING_VOTE });
      navigate('/dashboard/user/failure/error');
    }
  };
}

export function fetchStatistics({ electionId }: { electionId: number }) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: START_FETCHING_STATISTICS });
      const { data } = await getStatistics({
        electionId: electionId.toString(),
      });
      dispatch({
        type: SUCCESS_FETCHING_STATISTICS,
        payload: { statistics: data.candidateResults, electionId },
      });
    } catch (err) {
      dispatch({ type: FAILURE_FETCHING_STATISTICS });
    }
  };
}

export function clearElectionsMessage(): Action {
  return {
    type: CLEAR_ELECTIONS_MESSAGE,
  };
}

export function clearCandidateMessage(): Action {
  return {
    type: CLEAR_CANDIDATE_MESSAGE,
  };
}

export function clearVoteMessage(): Action {
  return {
    type: CLEAR_VOTE_MESSAGE,
  };
}

export function clearLoginMessage(): Action {
  return {
    type: CLEAR_LOGIN_MESSAGE,
  };
}
