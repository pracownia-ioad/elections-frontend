/* @flow */
import * as React from 'react';

import { makeStyles } from '@material-ui/styles';

type Props = {
  children: React.Node,
};

function AdminPanel(props: Props) {
  const classes = useStyles();

  return <div className={classes.container}>{props.children}</div>;
}

const useStyles = makeStyles({
  container: {
    margin: 50,
  },
});

export default AdminPanel;
