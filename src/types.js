/* @flow */

export type Candidate = {|
  id: number,
  firstName: string,
  lastName: string,
  position: string,
|};

export type LocalCandidate = $Diff<Candidate, {| id: number |}>;

export type Election = {|
  id: number,
  name: string,
  startDate: Date,
  endDate: Date,
  candidates: Array<Candidate>,
|};

export type ServerElection = {|
  ...Election,
  startDate: string,
  endDate: string,
|};

export type LocalElection = $Diff<
  Election,
  {|
    id: number,
  |}
>;
