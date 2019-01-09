/* @flow */
import { votings, fullVotings } from '../mocks';
import { API_URL } from '../constants';
import { type Voting, type FullVoting, type Candidate } from '../types';

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

export async function getCandidates(): Promise<Array<Candidate> | null> {
  try {
    const res = await fetch(`${API_URL}/candidates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    return null;
  }
}
