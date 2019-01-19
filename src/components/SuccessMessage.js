/* @flow */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

function exploreMessage() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.message}>
        Dziękujemy za oddanie głosu!
      </Typography>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    backgroundColor: '#ececec',
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  message: {
    color: '#555',
    fontWeight: 'normal',
  },
});

export default exploreMessage;
