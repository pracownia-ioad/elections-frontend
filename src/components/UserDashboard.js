/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';

import { bindActionCreators } from 'redux';

import {
  clearVoteMessage,
  fetchElections,
  fetchCandidates,
} from '../redux/actions';

import { type State } from '../redux/types/state';

type Props = {
  children: React.Node,
  voteMessage: ?string,
  clearVoteMessage: () => void,
  fetchElections: () => void,
  fetchCandidates: () => void,
};

function UserDashboard(props: Props) {
  const classes = useStyles();

  React.useEffect(() => {
    props.fetchCandidates();
    props.fetchElections();
  }, []);

  return (
    <div className={classes.dashboardWrapper}>
      {props.children}
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
    width: '100vw',
    height: '100vh',
  },
});

const mapStateToProps = ({ vote }: State) => ({
  voteMessage: vote.message,
});

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      clearVoteMessage,
      fetchElections,
      fetchCandidates,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDashboard);
