/* @flow */

export type Candidate = {
  id: number,
  firstName: string,
  lastName: string,
};

export type Voting = {
  id: number,
  name: string,
  startDate: Date,
  endDate: Date,
};

export type FullVoting = {
  id: number,
  name: string,
  description: string,
  startDate: Date,
  endDate: Date,
  candidats: Array<Candidate>,
};
