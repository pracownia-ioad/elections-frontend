/* @flow */
import * as React from 'react';

import { makeStyles } from '@material-ui/styles';

type Props = {
  children: React.Node,
  sidebar: React.Node,
};

function Sidebar(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <div className={classes.scrollable}>
          <div className={classes.container}>{props.sidebar}</div>
        </div>
      </div>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    height: '100vh',
  },
  sidebar: {
    flex: 1,
    height: '100%',
    borderRight: '1px solid #ccc',
  },
  scrollable: {
    overflowY: 'auto',
    maxHeight: '90%',
  },
  content: {
    flex: 4,
  },
});

export default Sidebar;
