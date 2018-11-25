/* @flow */
// $FlowFixMe
import React, { Suspense, ConcurrentMode } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import JssProvider from 'react-jss/lib/JssProvider';
import { Router } from '@reach/router';

import VotingContainer from './VotingContainer';
import ExploreMessage from './ExploreMessage';
// $FlowFixMe;
const Login = React.lazy(() => import('./Login'));
// $FlowFixMe;
const UserDashboard = React.lazy(() => import('./UserDashboard'));
// $FlowFixMe

type Props = {};

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: red[400],
    },
  },
  typography: { useNextVariants: true },
});

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});

class App extends React.Component<Props> {
  render() {
    return (
      <div className="App">
        <ConcurrentMode>
          <JssProvider generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <Suspense fallback={<div>Loading...</div>}>
                <Router>
                  <Login path="/" />
                  <UserDashboard path="/dashboard/user/">
                    <ExploreMessage path="/" />
                    {/* $FlowFixMe */}
                    <VotingContainer path="voting/:votingId" />
                  </UserDashboard>
                </Router>
              </Suspense>
            </MuiThemeProvider>
          </JssProvider>
        </ConcurrentMode>
      </div>
    );
  }
}

export default App;
