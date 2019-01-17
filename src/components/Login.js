/* @flow */
import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

import { login } from '../redux/actions';

import { type Credentials } from '../types';
import { type State } from '../redux/types/state';

type Props = {|
  login: Credentials => void,
  loading: boolean,
|};

function Login(props: Props) {
  const classes = useStyles();
  const [index, setIndex] = useState('');
  const [password, setPassword] = useState('');

  function onIndexChange(e) {
    setIndex(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  function onSubmitClick() {
    props.login({
      index,
      password,
    });
  }

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <div className={classes.header}>
          <Typography className={classes.mainText} variant="h4">
            Zaloguj się
          </Typography>
        </div>
        <div className={classes.spinnerWrapper}>
          {props.loading ? <CircularProgress size={25} /> : null}
        </div>
        <TextField
          required
          id="index-number"
          type="text"
          value={index}
          onChange={onIndexChange}
          label="Numer Indeksu"
          className={classes.input}
        />
        <TextField
          required
          id="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          label="Hasło"
          className={classes.input}
        />
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.submitButton}
            onClick={onSubmitClick}
          >
            Zaloguj
          </Button>
        </div>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
  },
  paper: {
    display: 'flex',
    minWidth: '350px',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    padding: 10,
    backgroundColor: red[400],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center',
    color: 'white',
  },
  input: {
    margin: '10px 20px 0 20px',
  },
  buttonContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: '25px',
    marginBottom: '25px',
  },
  spinnerWrapper: {
    height: '25px',
    marginTop: '20px ',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({ user }: State) => ({
  loading: user.loading,
});

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      login,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
