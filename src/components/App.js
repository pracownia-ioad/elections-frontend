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
import { AUTH_DATA_KEY } from '../constants';

const Login = React.lazy(() => import('./Login'));
const UserDashboard = React.lazy(() => import('./UserDashboard'));
const AdminDashboard = React.lazy(() => import('./AdminDashboard'));

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
    user: JSON.parse(window.localStorage.getItem(AUTH_DATA_KEY)),
  };

  setAuthData = (authData: AuthenticationType) => {
    this.setState({ user: authData }, () => {
      if (authData) {
        const path = authData.isAdmin ? 'admin' : 'user';
        navigate(`/dashboard/${path}`);
      }
    });
  };

  logout = () => {
    window.localStorage.removeItem(AUTH_DATA_KEY);
    this.setState({ user: null });
    navigate('/');
  };

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <ConcurrentMode>
          <JssProvider generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme}>
              <AuthenticationContext.Provider value={user}>
                <CssBaseline />
                <Suspense fallback={<div>Loading...</div>}>
                  <Router>
                    <Login
                      path="/"
                      setAuthData={this.setAuthData}
                      user={user}
                    />
                    <UserDashboard logout={this.logout} path="/dashboard/user/">
                      <ExploreMessage path="/" />
                      {/* $FlowFixMe */}
                      <VotingContainer path="voting/:votingId" />
                    </UserDashboard>
                    <AdminDashboard
                      logout={this.logout}
                      path="/dashboard/admin"
                    >
                      <ExploreMessage path="/" />
                      {/* $FlowFixMe */}
                      <VotingContainer path="voting/:votingId" />
                    </AdminDashboard>
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
