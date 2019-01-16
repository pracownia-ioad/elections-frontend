/* @flow */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import CreateCandidateModal from './CreateCandidateModal';
import CreateElectionModal from './CreateElectionModal';
import {
  addCandidate,
  createElection as createElectionAction,
  clearElectionsMessage,
  clearCandidateMessage,
} from '../redux/actions';

import { type LocalCandidate, type LocalElection } from '../types';
import { type State } from '../redux/types/state';

function adminPanel(props) {
  const classes = useStyles();
  const [candidateModalVisible, setCandidateModalVisible] = useState(false);
  const [electionModalVisible, setElectionModalVisible] = useState(false);

  async function createCandidate(candidate: LocalCandidate) {
    hideCandidateModal();
    await props.addCandidate(candidate);
  }

  async function createElection(election: LocalElection) {
    hideElectionModal();
    await props.createElectionAction(election);
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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!!props.electionsMessage}
        autoHideDuration={5000}
        onClose={props.clearElectionsMessage}
        ContentProps={{
          'aria-describedby': 'elections-message-id',
        }}
        message={
          <span id="elections-message-id">{props.electionsMessage || ''}</span>
        }
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!!props.candidateMessage}
        autoHideDuration={5000}
        onClose={props.clearCandidateMessage}
        ContentProps={{
          'aria-describedby': 'candidate-message-id',
        }}
        message={
          <span id="candidate-message-id">{props.candidateMessage || ''}</span>
        }
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

const mapStateToProps = ({ candidates, elections }: State) => ({
  candidates: Object.values(candidates.candidates),
  electionsMessage: elections.message,
  candidateMessage: candidates.message,
});

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      addCandidate,
      createElectionAction,
      clearElectionsMessage,
      clearCandidateMessage,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(adminPanel);
