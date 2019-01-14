/* @flow */
import {
  type Candidate,
  type Election,
  type User,
  type Statistics,
} from '../../types';

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

/**
 * Login
 */
type StartLogin = {|
  type: 'START_LOGIN',
|};
type SuccessLogin = {|
  type: 'SUCCESS_LOGIN',
  payload: User,
|};
type FailureLogin = {|
  type: 'FAILURE_LOGIN',
|};

type CredentialsRetrieved = {|
  type: 'CREDENTIALS_RETRIEVED',
  payload: User,
|};

type CredentialsRemoved = {|
  type: 'CREDENTIALS_REMOVED',
|};

type FailureCredentialsRetrieve = {|
  type: 'FAILURE_CREDENTIALS_RETRIEVE',
|};

/**
 * make vote
 */

type StartMakingVote = {|
  type: 'START_MAKING_VOTE',
|};

type SuccessMakingVote = {|
  type: 'SUCCESS_MAKING_VOTE',
|};

type FailureMakingVote = {|
  type: 'FAILURE_MAKING_VOTE',
|};

/**
 * Fetch statistics
 */
type StartFetchingStatistics = {|
  type: 'START_FETCHING_STATISTICS',
|};

type SuccessFetchingStatistics = {|
  type: 'SUCCESS_FETCHING_STATISTICS',
  payload: {| ...Statistics, electionId: number |},
|};

type FailureFetchingStatistics = {|
  type: 'FAILURE_FETCHING_STATISTICS',
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
  | FailureElectionsFetching
  | StartLogin
  | SuccessLogin
  | FailureLogin
  | CredentialsRetrieved
  | CredentialsRemoved
  | FailureCredentialsRetrieve
  | StartMakingVote
  | SuccessMakingVote
  | FailureMakingVote
  | StartFetchingStatistics
  | SuccessFetchingStatistics
  | FailureFetchingStatistics;
