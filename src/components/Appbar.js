/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

import { type User } from '../types';
import { type State } from '../redux/types/state';

type Props = {
  logout: () => mixed,
  user: ?User,
  children: React.Node,
};

function Appbar(props: Props) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.toolbar}>
          <Typography variant="h6" color="inherit">
            System głosowania
          </Typography>
          {props.user ? (
            <div className={classes.rightContent}>
              <Typography variant="subtitle1" color="inherit">
                {props.user.index}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={props.logout}
                className={classes.logoutButton}
              >
                Wyloguj
              </Button>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
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

const mapStateToProps = ({ user }: State) => ({
  user: user.user,
});

export default connect(mapStateToProps)(Appbar);
