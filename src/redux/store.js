/* @flow */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import { type Store } from './types/store';

const enhancer = compose(applyMiddleware(thunk));

function configureStore(): Store {
  return createStore(rootReducer, enhancer);
}

const store = configureStore();

export default store;
