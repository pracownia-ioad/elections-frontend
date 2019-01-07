/* @flow */
import React, { Suspense, ConcurrentMode } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import JssProvider from 'react-jss/lib/JssProvider';
import { Router, navigate } from '@reach/router';

import AuthenticationContext, {
  type AuthenticationType,
} from '../context/authentication';
import VotingContainer from './VotingContainer';
import ExploreMessage from './ExploreMessage';

const Login = React.lazy(() => import('./Login'));
const UserDashboard = React.lazy(() => import('./UserDashboard'));

type Props = {};

type State = {
  user: AuthenticationType,
};

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

class App extends React.Component<Props, State> {
  state = {
    user: null,
  };

  setAuthData = (authData: AuthenticationType) => {
    this.setState({ user: authData }, () => {
      navigate('/dashboard/user');
    });
  };

  render() {
    return (
      <div className="App">
        <ConcurrentMode>
          <JssProvider generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme}>
              <AuthenticationContext.Provider value={this.state.user}>
                <CssBaseline />
                <Suspense fallback={<div>Loading...</div>}>
                  <Router>
                    <Login path="/" setAuthData={this.setAuthData} />
                    <UserDashboard path="/dashboard/user/">
                      <ExploreMessage path="/" />
                      {/* $FlowFixMe */}
                      <VotingContainer path="voting/:votingId" />
                    </UserDashboard>
                  </Router>
                </Suspense>
              </AuthenticationContext.Provider>
            </MuiThemeProvider>
          </JssProvider>
        </ConcurrentMode>
      </div>
    );
  }
}

export default App;
