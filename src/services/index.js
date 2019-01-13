/* @flow */
import { fullVotings } from '../mocks';
import { API_URL } from '../constants';
import {
  type Election,
  type Candidate,
  type LocalCandidate,
  type LocalElection,
  type ServerElection,
  type VoteObject,
} from '../types';

export function getVoting(votingId: number): Promise<*> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const voting = fullVotings.find(({ id }) => id === votingId);
      if (voting) {
        resolve(voting);
      } else {
        reject(new Error(`Couldn't get voting of it = ${votingId}`));
      }
    }, 1500);
  });
}

export async function getCandidates(): Promise<Array<Candidate>> {
  const res = await fetch(`${API_URL}/candidates`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  return data;
}

export async function createCandidate(
  candidate: LocalCandidate
): Promise<Candidate> {
  const response = await fetch(`${API_URL}/candidates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(candidate),
  });

  return response.json();
}

export async function createElection(
  election: LocalElection
): Promise<Election> {
  const response = await fetch(`${API_URL}/elections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...election,
      startDate: election.startDate.toISOString(),
      endDate: election.endDate.toISOString(),
    }),
  });

  return response.json();
}

export async function getElections(): Promise<Array<ServerElection>> {
  const response = await fetch(`${API_URL}/elections`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function vote({
  electionId,
  candidateId,
}: VoteObject): Promise<*> {
  const response = await fetch(`${API_URL}/elections/${electionId}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      candidateId,
    }),
  });

  return response.json();
}
