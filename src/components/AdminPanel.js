/* @flow */
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { addCandidate as addCandidateAction } from '../redux/actions';
import { type Candidate } from '../types';

type Props = {
  addCandidate: Candidate => mixed,
};

function adminPanel({ addCandidate }: Props) {
  const classes = useStyles();
  const [name, setName] = useState('');

  function onNameChange(e) {
    setName(e.target.value);
  }

  async function createCandidate() {
    try {
      const response = await fetch(
        'https://elections-backend.herokuapp.com/candidates',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: name.split(' ')[0],
            lastName: name.split(' ')[1],
            position: 'Dunno',
          }),
        }
      );

      const res = await response.json();
      addCandidate(res);
    } catch (err) {
      console.warn('Error while creating candidate', err);
    }
  }

  return (
    <div className={classes.container}>
      <Typography variant="title" className={classes.message}>
        Panel Admina
      </Typography>
      <div className={classes.wrapper}>
        <TextField
          className={classes.input}
          label="Imię Nazwisko"
          variant="standard"
          value={name}
          onChange={onNameChange}
        />
        <Button
          className={classes.createCandidateButton}
          variant="outlined"
          color="primary"
          onClick={createCandidate}
        >
          Stwórz kandydata
        </Button>
        <Button variant="contained" color="primary" onClick={() => {}}>
          Stwórz wybory
        </Button>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    marginTop: 35,
    marginRight: 40,
    marginLeft: 40,
    marginBottom: 35,
    display: 'flex',
    justifyContent: 'space-between',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  createCandidateButton: {
    marginRight: 50,
  },
  input: {
    marginRight: 10,
  },
});

export default connect(
  null,
  dispatch => ({
    addCandidate: (candidate: Candidate) =>
      dispatch(addCandidateAction(candidate)),
  })
)(adminPanel);
