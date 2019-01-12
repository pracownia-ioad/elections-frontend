/* @flow */
import { combineReducers } from 'redux';
import candidates from './candidates';
import elections from './elections';

const reducers = {
  candidates,
  elections,
};

export type Reducers = typeof reducers;

// $FlowFixMe Dunno how to fix this...
export default combineReducers(reducers);
