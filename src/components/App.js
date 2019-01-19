/* @flow */
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import Snackbar from '@material-ui/core/Snackbar';
import JssProvider from 'react-jss/lib/JssProvider';
import { Router, navigate } from '@reach/router';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import 'moment/locale/pl';

import ElectionContainer from './ElectionContainer';
import ExploreMessage from './ExploreMessage';
import AdminPanel from './AdminPanel';
import ElectionStatistics from './ElectionStatistics';
import UserPanel from './UserPanel';
import SuccessMessage from './SuccessMessage';
import FailureMessage from './FailureMessage';
import Sidebar from './Sidebar';
import ElectionsList from './ElectionsList';
import Appbar from './Appbar';
import {
  retrieveCredentials,
  removeCredentials,
  login,
  fetchElections,
  fetchCandidates,
  clearLoginMessage,
} from '../redux/actions';

import { type State } from '../redux/types/state';
import { type Credentials, type User, type Election } from '../types';

const Login = React.lazy(() => import('./Login'));
const UserDashboard = React.lazy(() => import('./UserDashboard'));

type Props = {
  retrieveCredentials: () => void,
  logout: () => void,
  login: Credentials => Promise<*>,
  user: ?User,
  loginMessage: ?string,
  clearLoginMessage: () => void,
  elections: Array<Election>,
  electionsLoading: boolean,
};

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: red[400],
    },
    secondary: {
      main: blue[500],
    },
  },
  typography: { useNextVariants: true },
});

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});

moment.locale('pl');

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.retrieveCredentials();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.user && !prevProps.user) {
      const path = this.props.user.isAdmin ? 'admin' : 'user';
      navigate(`/dashboard/${path}`);
    } else if (!this.props.user && prevProps.user) {
      navigate(`/`);
    }
  }

  authenticate = (credentials: Credentials) => {
    this.props.login(credentials);
  };

  logout = () => {
    this.props.logout();
  };

  render() {
    return (
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
            <CssBaseline />
            <Suspense fallback={<div>Loading...</div>}>
              <Router>
                <Appbar path="/" logout={this.logout}>
                  <Login path="/" />
                  <UserDashboard path="/dashboard">
                    <Sidebar
                      path="/"
                      sidebar={
                        <ElectionsList
                          elections={this.props.elections}
                          loading={this.props.electionsLoading}
                        />
                      }
                    >
                      <UserPanel user={this.props.user} path="/user">
                        <ExploreMessage
                          path="/"
                          message="Psst, Wybierz głosowanie z panelu po lewej!"
                        />
                        <ElectionContainer path="/election/:electionID" />
                        <ElectionStatistics path="/statistics/:electionID" />
                        <SuccessMessage path="/success" />
                        {/* $FlowFixMe */}
                        <FailureMessage path="failure/:error" />
                      </UserPanel>
                      <AdminPanel user={this.props.user} path="/admin">
                        <ExploreMessage
                          path="/"
                          message="Psst, Wybierz głosowanie z panelu po lewej!"
                        />
                      </AdminPanel>
                    </Sidebar>
                  </UserDashboard>
                </Appbar>
              </Router>
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={!!this.props.loginMessage}
                autoHideDuration={5000}
                onClose={this.props.clearLoginMessage}
                ContentProps={{
                  'aria-describedby': 'elections-message-id',
                }}
                message={
                  <span id="elections-message-id">
                    {this.props.loginMessage || ''}
                  </span>
                }
              />
            </Suspense>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

const mapStateToProps = ({ user, elections }: State) => ({
  user: user.user,
  loginMessage: user.message,
  elections: Object.values(elections.elections),
  electionsLoading: elections.fetchingElections,
});

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      retrieveCredentials,
      logout: removeCredentials,
      login,
      fetchElections,
      fetchCandidates,
      clearLoginMessage,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
