/* @flow */
import * as React from 'react';
import { makeStyles } from '@material-ui/styles';

import Sidebar from './Sidebar';
import Appbar from './Appbar';

type Props = {
  children: React.Node,
};

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

function UserDashboard(props: Props) {
  const classes = useStyles();

  return (
    <div>
      <Appbar />
      <div className={classes.dashboardWrapper}>
        <div className={classes.sidebar}>
          <Sidebar />
        </div>
        <div className={classes.container}>{props.children}</div>
      </div>
    </div>
  );
}

export default UserDashboard;
