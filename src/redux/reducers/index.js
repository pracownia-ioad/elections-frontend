/* @flow */
import { combineReducers } from 'redux';
import candidates from './candidates';

const reducers = {
  candidates,
};

export type Reducers = typeof reducers;

export default combineReducers(reducers);
