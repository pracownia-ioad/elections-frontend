/* @flow */
import { votings, fullVotings, candidates } from '../mocks';

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

export function getCandidates(): Promise<Array<Candidate>> {
  return new Promise(resolve => {
    setTimeout(() => resolve(candidates), 1000);
  });
}
