/* @flow */
import * as React from 'react';
import { makeStyles } from '@material-ui/styles';

import CandidatesSidebar from './CandidatesSidebar';
import Appbar from './Appbar';

import { getCandidates } from '../services';
import adminChecker from '../hoc/adminChecker';

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

  return (
    <div>
      <Appbar logout={props.logout} />
      <div className={classes.dashboardWrapper}>
        <div className={classes.sidebar}>
          <CandidatesSidebar candidates={candidates} loading={loading} />
        </div>
        <div className={classes.container}>{props.children}</div>
      </div>
    </div>
  );
}

const useStyles: () => {
  sidebar: any,
  dashboardWrapper: any,
  container: any,
  nested: any,
} = makeStyles({
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
});

export default adminChecker(UserDashboard);
