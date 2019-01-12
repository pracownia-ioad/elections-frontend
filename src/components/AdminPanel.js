/* @flow */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CreateCandidateModal from './CreateCandidateModal';
import { addCandidate, fetchCandidates } from '../redux/actions';

import { type LocalCandidate } from '../types';

function adminPanel(props) {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    props.fetchCandidates();
  }, []);

  async function createCandidate(candidate: LocalCandidate) {
    await props.addCandidate(candidate);
    hide();
  }

  function hide() {
    setVisible(false);
  }

  function show() {
    setVisible(true);
  }

  return (
    <div className={classes.container}>
      <Typography variant="title" className={classes.message}>
        Panel Admina
      </Typography>
      <div className={classes.wrapper}>
        <Button
          className={classes.createCandidateButton}
          variant="outlined"
          color="primary"
          onClick={show}
        >
          Stwórz kandydata
        </Button>
        <Button variant="contained" color="primary" onClick={() => {}}>
          Stwórz wybory
        </Button>
      </div>
      <CreateCandidateModal
        visible={visible}
        onClose={hide}
        createCandidate={createCandidate}
      />
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
