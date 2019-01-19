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

import store from '../redux/store';

type AxiosPromise<T> = Promise<{
  data: T,
  status: number,
}>;

export function getCandidates(): AxiosPromise<Array<Candidate>> {
  const { user } = store.getState();
  const token = user.user ? user.user.token : '';
  return axios({
    url: `${API_URL}/candidates`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export function createCandidate(
  candidate: LocalCandidate
): AxiosPromise<Candidate> {
  const { user } = store.getState();
  const token = user.user ? user.user.token : '';
  return axios({
    url: `${API_URL}/candidates`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(candidate),
  });
}

export function createElection(
  election: LocalElection
): AxiosPromise<Election> {
  const { user } = store.getState();
  const token = user.user ? user.user.token : '';
  return axios({
    url: `${API_URL}/elections`,
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify({
      ...election,
      startDate: election.startDate.toISOString(),
      endDate: election.endDate.toISOString(),
    }),
  });
}

export async function getElections(): AxiosPromise<Array<ServerElection>> {
  const { user } = store.getState();
  const token = user.user ? user.user.token : '';
  return axios({
    url: `${API_URL}/elections`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function vote({
  electionId,
  candidateId,
}: VoteObject): AxiosPromise<null> {
  const { user } = store.getState();
  const token = user.user ? user.user.token : '';
  return axios({
    url: `${API_URL}/elections/${electionId}/vote`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
  const { user } = store.getState();
  const token = user.user ? user.user.token : '';
  return axios({
    url: `${API_URL}/elections/${electionId}/results`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function loginUser({
  username,
  password,
}: {
  username: string,
  password: string,
}): AxiosPromise<{ token: string, roles: Array<string> }> {
  return axios({
    url: `${API_URL}/auth`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ username, password }),
  });
}
