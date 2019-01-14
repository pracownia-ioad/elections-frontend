/* @flow */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CreateCandidateModal from './CreateCandidateModal';
import CreateElectionModal from './CreateElectionModal';
import {
  addCandidate,
  createElection as createElectionAction,
} from '../redux/actions';

import { type LocalCandidate, type LocalElection } from '../types';
import { type State } from '../redux/types/state';

function adminPanel(props) {
  const classes = useStyles();
  const [candidateModalVisible, setCandidateModalVisible] = useState(false);
  const [electionModalVisible, setElectionModalVisible] = useState(false);

  async function createCandidate(candidate: LocalCandidate) {
    await props.addCandidate(candidate);
    hideCandidateModal();
  }

  async function createElection(election: LocalElection) {
    await props.createElectionAction(election);
    hideElectionModal();
  }

  function hideCandidateModal() {
    setCandidateModalVisible(false);
  }

  function showCandidateModal() {
    setCandidateModalVisible(true);
  }

  function hideElectionModal() {
    setElectionModalVisible(false);
  }

  function showElectionModal() {
    setElectionModalVisible(true);
  }

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <Typography variant="title" className={classes.message}>
          Panel Admina
        </Typography>
        <div className={classes.wrapper}>
          <Button
            className={classes.createCandidateButton}
            variant="outlined"
            color="primary"
            onClick={showCandidateModal}
          >
            Stwórz kandydata
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={showElectionModal}
          >
            Stwórz wybory
          </Button>
        </div>
        <CreateCandidateModal
          visible={candidateModalVisible}
          onClose={hideCandidateModal}
          createCandidate={createCandidate}
        />
        <CreateElectionModal
          visible={electionModalVisible}
          onClose={hideElectionModal}
          createElection={createElection}
          candidates={props.candidates}
        />
      </div>
      <div className={classes.statisitcsContainer}>{props.children}</div>
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
    flexDirection: 'column',
  },
  innerContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  statisitcsContainer: {
    marginTop: 50,
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

const mapStateToProps = ({ candidates }: State) => ({
  candidates: Object.values(candidates.candidates),
});

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      addCandidate,
      createElectionAction,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(adminPanel);
