/* @flow */
import {
  type Store as ReduxStore,
  type Dispatch as ReduxDispatch,
} from 'redux';

import { type Action } from './action';
import { type State } from './state';

export type Store = ReduxStore<State, Action>;
export type GetState = () => State;
export type Dispatch = ReduxDispatch<Action> & Thunk<Action>;
export type Thunk<A> = ((Dispatch, GetState) => Promise<void> | void) => A;
