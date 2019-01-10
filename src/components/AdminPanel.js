/* @flow */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { addCandidate, fetchCandidates } from '../redux/actions';

function adminPanel(props) {
  const classes = useStyles();
  const [name, setName] = useState('');

  useEffect(() => {
    props.fetchCandidates();
  }, []);

  function onNameChange(e) {
    setName(e.target.value);
  }

  async function createCandidate() {
    props.addCandidate({
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1],
    });
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

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      addCandidate,
      fetchCandidates,
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(adminPanel);
