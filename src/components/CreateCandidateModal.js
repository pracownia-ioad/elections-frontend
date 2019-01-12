/* @flow */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';

import { type LocalCandidate } from '../types';

type Props = {
  visible: boolean,
  onClose: () => void,
  createCandidate: LocalCandidate => Promise<*>,
};

function createCandidateModal(props: Props) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');

  function onFirstNameChange(e) {
    setFirstName(e.target.value);
  }
  function onLastNameChange(e) {
    setLastName(e.target.value);
  }
  function onPositionNameChange(e) {
    setPosition(e.target.value);
  }

  function createCandidate() {
    props.createCandidate({ firstName, lastName, position });
  }

  return (
    <Modal
      open={props.visible}
      onClose={props.onClose}
      className={classes.modal}
    >
      <div className={classes.paper}>
        <TextField
          className={classes.input}
          label="Imię"
          variant="outlined"
          value={firstName}
          onChange={onFirstNameChange}
        />
        <TextField
          className={classes.input}
          label="Nazwisko"
          variant="outlined"
          value={lastName}
          onChange={onLastNameChange}
        />
        <TextField
          className={classes.input}
          label="Pozycja"
          variant="outlined"
          value={position}
          onChange={onPositionNameChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={createCandidate}
          className={classes.button}
        >
          Stwórz kandydata
        </Button>
      </div>
    </Modal>
  );
}

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    position: 'absolute',
    width: '400px',
    backgroundColor: '#eee',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    borderRadius: '5px',
  },
  input: {
    marginTop: '10px',
  },
  button: {
    marginTop: '25px',
  },
});

export default createCandidateModal;
