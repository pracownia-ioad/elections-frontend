/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';
import { navigate } from '@reach/router';

import ElectionsList from './ElectionsList';
import Appbar from './Appbar';

import { type State } from '../redux/types/state';
import { type User, type Election } from '../types';

type Props = {
  children: React.Node,
  logout: () => mixed,
  user: ?User,
  elections: Array<Election>,
  electionsLoading: boolean,
};

function UserDashboard(props: Props) {
  const classes = useStyles();

  function navigateToAdminPanel() {
    navigate('/dashboard/admin');
  }

  return (
    <div>
      <Appbar logout={props.logout} />
      <div className={classes.dashboardWrapper}>
        <div className={classes.sidebar}>
          <ElectionsList
            elections={props.elections}
            actionType="election"
            loading={props.electionsLoading}
          />
        </div>
        <div className={classes.container}>{props.children}</div>
      </div>
      {props.user && props.user.isAdmin ? (
        <Button
          variant="extendedFab"
          color="primary"
          aria-label="Navigate to admin panel"
          className={classes.fab}
          onClick={navigateToAdminPanel}
        >
          <NavigationIcon className={classes.extendedIcon} />
          Panel admina
        </Button>
      ) : null}
    </div>
  );
}

const useStyles = makeStyles({
  dashboardWrapper: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
  },
  sidebar: {
    flex: 1,
    height: '100%',
    borderRight: '1px solid #ccc',
  },
  container: {
    flex: 4,
    margin: 50,
  },
  fab: {
    position: 'fixed',
    right: '0',
    bottom: '0',
    margin: '20px',
  },
});

const mapStateToProps = ({ user, elections }: State) => ({
  user: user.user,
  elections: Object.values(elections.elections),
  electionsLoading: elections.fetchingElections,
});

export default connect(mapStateToProps)(UserDashboard);
