/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';

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

function ElectionContainer(props: Props) {
  const classes = useStyles();

  async function onVote(data: VoteObject) {
    await props.vote(data);
  }

  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.paper}>
        <ElectionComponent
          election={props.elections[props.electionID]}
          vote={onVote}
        />
      </Paper>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
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
});

const mapStateToProps = ({ elections }: State) => ({
  elections: elections.elections,
});

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      vote: makeVote,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ElectionContainer);
