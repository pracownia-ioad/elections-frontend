/* @flow */
import * as React from 'react';
import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';
import { navigate } from '@reach/router';

import { makeStyles } from '@material-ui/styles';
import { type User } from '../types';

type Props = {
  children: React.Node,
  user: ?User,
};

function UserPanel(props: Props) {
  const classes = useStyles();

  function navigateToAdminPanel() {
    navigate('/dashboard/admin');
  }

  return (
    <div>
      <div className={classes.container}>{props.children}</div>;
      {props.user && props.user.isAdmin ? (
        <Button
          variant="extendedFab"
          color="primary"
          aria-label="Navigate to admin panel"
          className={classes.fab}
          onClick={navigateToAdminPanel}
        >
          <NavigationIcon className={classes.extendedIcon} />
          Panel admina
        </Button>
      ) : null}
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    flex: 1,
    margin: 50,
  },
  fab: {
    position: 'fixed',
    right: '0',
    bottom: '0',
    margin: '20px',
  },
});

export default UserPanel;
