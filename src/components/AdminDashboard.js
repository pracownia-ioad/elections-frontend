/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';
import { navigate } from '@reach/router';

import CandidatesSidebar from './CandidatesSidebar';
import ElectionsList from './ElectionsList';
import Appbar from './Appbar';

import { type State } from '../redux/types/state';
import { type Election, type Candidate } from '../types';

type Props = {
  children: React.Node,
  logout: () => mixed,
  elections: Array<Election>,
  electionsLoading: boolean,
  candidates: Array<Candidate>,
  fetchingCandidates: boolean,
};

function UserDashboard(props: Props) {
  const classes = useStyles();

  function navigateToElections() {
    navigate('/dashboard/user');
  }

  return (
    <div>
      <Appbar logout={props.logout} />
      <div className={classes.dashboardWrapper}>
        <div className={classes.sidebar}>
          <div className={classes.elections}>
            <ElectionsList
              elections={props.elections}
              loading={props.electionsLoading}
              actionType="statistics"
            />
          </div>
          <div className={classes.candidates}>
            <CandidatesSidebar
              candidates={props.candidates}
              loading={props.fetchingCandidates}
            />
          </div>
        </div>
        <div className={classes.container}>{props.children}</div>
      </div>
      <Button
        variant="extendedFab"
        color="primary"
        aria-label="Navigate to admin panel"
        className={classes.fab}
        onClick={navigateToElections}
      >
        <NavigationIcon className={classes.extendedIcon} />
        Panel głosowania
      </Button>
    </div>
  );
}

const useStyles = makeStyles({
  dashboardWrapper: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
  },
  sidebar: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #ccc',
  },
  container: {
    flex: 4,
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    margin: '20px',
  },
  elections: {},
  candidates: {},
});

const mapStateToProps = ({ elections, candidates }: State) => ({
  candidates: Object.values(candidates.candidates),
  candidatesLoading: candidates.fetchingCandidates,
  elections: Object.values(elections.elections),
  electionsLoading: elections.fetchingElections,
});

export default connect(mapStateToProps)(UserDashboard);
