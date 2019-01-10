/* @flow */
import { type Candidate } from '../../types';

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

export type Action =
  | StartCreatingCandidate
  | SuccessCreatingCandidate
  | FailureCreatingCandidate
  | StartCandidatesFetching
  | SuccessCandidatesFetching
  | FailureCandidatesFetching;
