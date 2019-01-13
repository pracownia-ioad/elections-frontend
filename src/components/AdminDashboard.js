/* @flow */
import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';
import { navigate } from '@reach/router';

import CandidatesSidebar from './CandidatesSidebar';
import Appbar from './Appbar';

import { getCandidates } from '../services';

type Props = {
  children: React.Node,
  logout: () => mixed,
};

function UserDashboard(props: Props) {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(true);
  const [candidates, setCandidates] = React.useState([]);

  React.useEffect(() => {
    fetchCandidates();
  }, []);

  async function fetchCandidates() {
    setLoading(true);
    const data = await getCandidates();
    setLoading(false);
    setCandidates(data || []);
  }

  function navigateToElections() {
    navigate('/dashboard/user');
  }

  return (
    <div>
      <Appbar logout={props.logout} />
      <div className={classes.dashboardWrapper}>
        <div className={classes.sidebar}>
          <CandidatesSidebar candidates={candidates} loading={loading} />
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
    borderRight: '1px solid #ccc',
  },
  container: {
    flex: 4,
  },
  fab: {
    position: 'fixed',
    right: '0',
    bottom: '0',
    margin: '20px',
  },
});

export default UserDashboard;
