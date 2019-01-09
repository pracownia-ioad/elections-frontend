/* @flow */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import CatImg from '../assets/sad-cat.png';

function exploreMessage() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img className={classes.img} src={CatImg} alt="sad-cat" />
      <Typography variant="title" className={classes.message}>
        Hmm... Wybierz głosowanie w którym chcesz wziąć udział!
      </Typography>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    margin: 50,
    backgroundColor: '#ececec',
    minHeight: '350px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  message: {
    color: '#777',
    fontWeight: 'normal',
  },
  img: {
    width: '200px',
    height: '200px',
    marginBottom: 20,
  },
});

export default exploreMessage;
