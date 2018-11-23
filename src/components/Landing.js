/* @flow */
// $FlowFixMe
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    backgroundColor: '#232323',
  },
  wrapper: {
    backgroundColor: '#212121',
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

export default function Landing() {
  const classes = useStyles();
  const [index, setIndex] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  function onIndexChange(e) {
    setIndex(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  function onSubmitClick() {
    setVisible(!visible);
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
