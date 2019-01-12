/* @flow */
import { type Candidate, type Election } from '../../types';

/**
 * Candidate creation
 */
type StartCreatingCandidate = {|
  type: 'START_CREATING_CANDIDATE',
|};

type SuccessCreatingCandidate = {|
  type: 'SUCCESS_CREATING_CANDIDATE',
  payload: Candidate,
|};

type FailureCreatingCandidate = {|
  type: 'FAILURE_CREATING_CANDIDATE',
|};

/**
 * Candidates fetching
 */
type StartCandidatesFetching = {|
  type: 'START_CANDIDATES_FETCHING',
|};

type SuccessCandidatesFetching = {|
  type: 'SUCCESS_CANDIDATES_FETCHING',
  payload: Array<Candidate>,
|};

type FailureCandidatesFetching = {|
  type: 'FAILURE_CANDIDATES_FETCHING',
|};

/**
 * Election creation
 */
type StartCreatingElection = {|
  type: 'START_CREATING_ELECTION',
|};

type SuccessCreatingElection = {|
  type: 'SUCCESS_CREATING_ELECTION',
|};

type FailureCreatingElection = {|
  type: 'FAILURE_CREATING_ELECTION',
|};

/**
 * Election fetching
 */
type StartElectionsFetching = {|
  type: 'START_ELECTIONS_FETCHING',
|};

type SuccessElectionsFetching = {|
  type: 'SUCCESS_ELECTIONS_FETCHING',
  payload: Array<Election>,
|};

type FailureElectionsFetching = {|
  type: 'FAILURE_ELECTIONS_FETCHING',
|};

export type Action =
  | StartCreatingCandidate
  | SuccessCreatingCandidate
  | FailureCreatingCandidate
  | StartCandidatesFetching
  | SuccessCandidatesFetching
  | FailureCandidatesFetching
  | StartCreatingElection
  | SuccessCreatingElection
  | FailureCreatingElection
  | StartElectionsFetching
  | SuccessElectionsFetching
  | FailureElectionsFetching;
