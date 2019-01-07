/* @flow */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

import withAuthentication from '../hoc/withAuthentication';
import type { AuthenticationType } from '../context/authentication';

type Props = {
  user: AuthenticationType,
};

function Appbar(props: Props) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar variant="dense" className={classes.toolbar}>
        <Typography variant="h6" color="inherit">
          System głosowania
        </Typography>
        {props.user ? (
          <Typography variant="subtitle1" color="inherit">
            {`${props.user.firstName} ${props.user.lastName} ${
              props.user.index
            }`}
          </Typography>
        ) : (
          <Button color="inherit">Zaloguj</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default withAuthentication(Appbar);
