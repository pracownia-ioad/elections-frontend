/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';
import { navigate } from '@reach/router';
import Snackbar from '@material-ui/core/Snackbar';

import { bindActionCreators } from 'redux';
import ElectionsList from './ElectionsList';
import Appbar from './Appbar';

import { clearVoteMessage } from '../redux/actions';

import { type State } from '../redux/types/state';
import { type User, type Election } from '../types';

type Props = {
  children: React.Node,
  logout: () => mixed,
  user: ?User,
  elections: Array<Election>,
  electionsLoading: boolean,
  voteMessage: ?string,
  clearVoteMessage: () => void,
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
          <div className={classes.scrollable}>
            <ElectionsList
              elections={props.elections}
              loading={props.electionsLoading}
            />
          </div>
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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!!props.voteMessage}
        autoHideDuration={5000}
        onClose={props.clearVoteMessage}
        ContentProps={{
          'aria-describedby': 'elections-message-id',
        }}
        message={
          <span id="elections-message-id">{props.voteMessage || ''}</span>
        }
      />
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
  scrollable: {
    overflowY: 'auto',
    maxHeight: '90%',
  },
  container: {
    flex: 4,
  },
  fab: {
    position: 'fixed',
    right: '0',
    bottom: '0',
    margin: '20px',
  },
});

const mapStateToProps = ({ user, elections, vote }: State) => ({
  user: user.user,
  elections: Object.values(elections.elections),
  electionsLoading: elections.fetchingElections,
  voteMessage: vote.message,
});

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      clearVoteMessage,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDashboard);
