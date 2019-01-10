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
  logout: () => mixed,
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
          <div className={classes.rightContent}>
            <Typography variant="subtitle1" color="inherit">
              {`${props.user.firstName} ${props.user.lastName} ${
                props.user.index
              }`}
            </Typography>
            <Button
              variant="raised"
              color="secondary"
              onClick={props.logout}
              className={classes.logoutButton}
            >
              Wyloguj
            </Button>
          </div>
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
    alignItems: 'center',
  },
  rightContent: {
    display: 'flex',
    alignItems: 'center',
  },
  logoutButton: {
    marginLeft: '15px',
    marginRight: '15px',
  },
});

export default withAuthentication(Appbar);
