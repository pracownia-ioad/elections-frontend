/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { install } from '@material-ui/styles';
import App from './components/App';

// $FlowFixMe
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

install();
