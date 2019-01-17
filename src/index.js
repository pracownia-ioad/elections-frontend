/* @flow */
import React, { ConcurrentMode } from 'react';
import ReactDOM from 'react-dom';
import { install } from '@material-ui/styles';
import { Provider } from 'react-redux';

import App from './components/App';

import store from './redux/store';

install();

// $FlowFixMe
ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="App">
    <ConcurrentMode>
      <Provider store={store}>
        <App />{' '}
      </Provider>
    </ConcurrentMode>
  </div>
);
