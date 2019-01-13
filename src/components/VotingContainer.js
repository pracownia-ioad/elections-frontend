/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
// import CircularProgress from '@material-ui/core/CircularProgress';

import { makeVote } from '../redux/actions';
import ElectionComponent from './Election';
import { type State } from '../redux/types/state';
import { type Election, type VoteObject } from '../types';

type Props = {|
  electionID: string,
  elections: {
    [key: string]: Election,
  },
  vote: VoteObject => Promise<*>,
|};

function votingContainer({ electionID, elections, vote }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.paper}>
        <ElectionComponent election={elections[electionID]} vote={vote} />
      </Paper>
    </div>
  );
}

/* <Suspense
maxDuration={300}
fallback={
  <div className={classes.spinner}>
    <CircularProgress size={25} />
  </div>
}
>
<Voting votingId={electionID} />
</Suspense> */

const useStyles = makeStyles({
  root: {
    margin: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flex: 1,
    minHeight: '500px',
    transition: 'transform 0.5s',
  },
  // spinner: {
  //   display: 'flex',
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});

const mapStateToProps = ({ elections }: State) => ({
  elections: elections.elections,
});

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      votee: makeVote,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(votingContainer);
