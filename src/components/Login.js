/* @flow */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { navigate } from '@reach/router';

import { AUTH_DATA_KEY } from '../constants';
import { type AuthenticationType } from '../context/authentication';

type Props = {
  setAuthData: AuthenticationType => mixed,
  user?: AuthenticationType, // eslint-disable-line
};

export default function Login(props: Props) {
  const classes = useStyles();
  const [index, setIndex] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const { user } = props;
    if (user) {
      const path = user.isAdmin ? 'admin' : 'user';
      navigate(`/dashboard/${path}`);
    }
  }, []);

  function onIndexChange(e) {
    setIndex(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  function onSubmitClick() {
    setVisible(!visible);

    window.localStorage.setItem(
      AUTH_DATA_KEY,
      JSON.stringify({
        id: '1',
        firstName: 'Dawid',
        lastName: 'Urbaniak',
        index: '204023',
        isAdmin: false,
      })
    );

    setTimeout(() => {
      props.setAuthData({
        id: '1',
        firstName: 'Dawid',
        lastName: 'Urbaniak',
        index: '204023',
        isAdmin: false,
      });
    }, 1500);
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Typography className={classes.mainText} variant="h1">
          Go Vote
        </Typography>
        <div className={classes.spinnerWrapper}>
          {visible ? <CircularProgress size={25} /> : null}
        </div>
        <TextField
          required
          id="index-number"
          type="text"
          value={index}
          variant="outlined"
          onChange={onIndexChange}
          label="Numer Indeksu"
          className={classes.input}
        />
        <TextField
          required
          id="password"
          type="password"
          value={password}
          variant="outlined"
          onChange={onPasswordChange}
          label="Hasło"
          className={classes.input}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.submitButton}
          onClick={onSubmitClick}
        >
          Zaloguj
        </Button>
      </div>
    </div>
  );
}

const useStyles: () => {|
  container: any,
  mainText: any,
  input: any,
  submitButton: any,
  spinnerWrapper: any,
  wrapper: any,
|} = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '80px 50px',
    boxShadow: '2px 2px 20px 2px rgba(239, 83, 80, 0.7)',
    borderRadius: '10px',
  },
  mainText: {
    color: red[400],
    fontWeight: 'bold',
    textShadow: `2px 2px 5px ${orange[300]}`,
    fontSize: '144px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  input: {
    width: '400px',
    margin: '10px 0px',
  },
  submitButton: {
    marginTop: '15px',
  },
  spinnerWrapper: {
    height: '25px',
    margin: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
