/* @flow */
import { combineReducers } from 'redux';
import candidates from './candidates';
import elections from './elections';
import user from './user';
import statistics from './statistics';
import vote from './vote';

const reducers = {
  candidates,
  elections,
  user,
  statistics,
  vote,
};

export type Reducers = typeof reducers;

// $FlowFixMe Dunno how to fix this...
export default combineReducers(reducers);
