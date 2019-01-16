/* @flow */
import axios from 'axios';

import { API_URL } from '../constants';
import {
  type Election,
  type Candidate,
  type LocalCandidate,
  type LocalElection,
  type ServerElection,
  type VoteObject,
  type ServerStatistics,
} from '../types';

type AxiosPromise<T> = Promise<{
  data: T,
  status: number,
}>;

export function getCandidates(): AxiosPromise<Array<Candidate>> {
  return axios({
    url: `${API_URL}/candidates`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function createCandidate(
  candidate: LocalCandidate
): AxiosPromise<Candidate> {
  return axios({
    url: `${API_URL}/candidates`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(candidate),
  });
}

export function createElection(
  election: LocalElection
): AxiosPromise<Election> {
  return axios({
    url: `${API_URL}/elections`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      ...election,
      startDate: election.startDate.toISOString(),
      endDate: election.endDate.toISOString(),
    }),
  });
}

export async function getElections(): AxiosPromise<Array<ServerElection>> {
  return axios({
    url: `${API_URL}/elections`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function vote({
  electionId,
  candidateId,
}: VoteObject): AxiosPromise<*> {
  return axios({
    url: `${API_URL}/elections/${electionId}/vote`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      candidateId,
    }),
  });
}

export async function getStatistics({
  electionId,
}: {
  electionId: string,
}): AxiosPromise<ServerStatistics> {
  return axios({
    url: `${API_URL}/elections/${electionId}/results`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
