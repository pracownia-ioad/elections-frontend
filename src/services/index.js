/* @flow */
import { votings, fullVotings } from '../mocks';
import { API_URL } from '../constants';
import {
  type Voting,
  type FullVoting,
  type Candidate,
  type LocalCandidate,
} from '../types';

export function getVotings(): Promise<Array<Voting>> {
  return new Promise(resolve => {
    setTimeout(() => resolve(votings), 2000);
  });
}

export function getVoting(votingId: number): Promise<FullVoting> {
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
  const { firstName, lastName } = candidate;
  const response = await fetch(`${API_URL}/candidates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      position: 'Dunno',
    }),
  });

  return response.json();
}
