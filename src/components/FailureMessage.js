/* @flow */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

type Props = {
  error: 'error' | 'already-voted',
};

function exploreMessage(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h3" className={classes.message}>
        {props.error === 'error'
          ? 'Ops, coś poszło nie tak..'
          : 'Operacja niemozliwa do wykonania. Twój głos został juz oddany!'}
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
    textAlign: 'center',
  },
});

export default exploreMessage;
