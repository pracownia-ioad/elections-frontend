/* @flow */
// $FlowFixMe
import React, { Suspense } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Voting from './Voting';

type Props = {
  votingId: number,
};

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
  spinner: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function votingContainer({ votingId }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.paper}>
        <Suspense
          maxDuration={300}
          fallback={
            <div className={classes.spinner}>
              <CircularProgress size={25} />
            </div>
          }
        >
          <Voting votingId={votingId} />
        </Suspense>
      </Paper>
    </div>
  );
}

export default votingContainer;
