/* @flow */
import { combineReducers } from 'redux';
import candidates from './candidates';

const reducers = {
  candidates,
};

export type Reducers = typeof reducers;

// $FlowFixMe Dunno how to fix this...
export default combineReducers(reducers);
