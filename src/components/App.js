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
import {
  retrieveCredentials,
  removeCredentials,
  login,
  fetchElections,
  fetchCandidates,
} from '../redux/actions';

import { type State } from '../redux/types/state';
import { type Credentials, type User } from '../types';

const Login = React.lazy(() => import('./Login'));
const UserDashboard = React.lazy(() => import('./UserDashboard'));
const AdminDashboard = React.lazy(() => import('./AdminDashboard'));

type Props = {
  retrieveCredentials: () => void,
  logout: () => void,
  login: Credentials => Promise<*>,
  user: ?User,
  fetchElections: () => void,
  fetchCandidates: () => void,
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
    this.props.fetchElections();
    this.props.fetchCandidates();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.user && !prevProps.user) {
      const path = this.props.user.isAdmin ? 'admin' : 'user';
      navigate(`/dashboard/${path}/`);
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
                <Login path="/" authenticate={this.authenticate} />
                <UserDashboard logout={this.logout} path="/dashboard/user/">
                  <UserPanel path="/">
                    <ExploreMessage
                      path="/"
                      message="Psst, Wybierz głosowanie z panelu po lewej!"
                    />
                    <ElectionContainer path="election/:electionID" />
                  </UserPanel>
                </UserDashboard>
                <AdminDashboard logout={this.logout} path="/dashboard/admin">
                  <AdminPanel path="/">
                    <ExploreMessage
                      path="/"
                      message="Psst, Wybierz głosowanie z panelu po lewej!"
                    />
                    <ElectionStatistics path="statistics/:electionID" />
                  </AdminPanel>
                </AdminDashboard>
              </Router>
            </Suspense>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

const mapStateToProps = ({ user }: State) => ({
  user: user.user,
});

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      retrieveCredentials,
      logout: removeCredentials,
      login,
      fetchElections,
      fetchCandidates,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
