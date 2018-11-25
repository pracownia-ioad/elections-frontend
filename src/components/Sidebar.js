/* @flow */
// $FlowFixMe
import React, { Suspense, Fragment } from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import AlarmIcon from '@material-ui/icons/Alarm';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import { unstable_createResource } from 'react-cache'; // eslint-disable-line
import { navigate } from '@reach/router';

import { getVotings } from '../services';

const useStyles = makeStyles({
  list: {
    marginTop: 10,
  },
  placeholder: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 50,
  },
});

const APIResource = unstable_createResource(() => getVotings());

function sortVotings(first, second) {
  return first.name > second.name ? 1 : -1;
}

function SidebarItems() {
  const data = APIResource.read();

  const now = Date.now();

  function handleClick(route: number) {
    navigate(`/dashboard/user/voting/${route}`);
  }

  return [...data].sort(sortVotings).map(({ id, name, startDate, endDate }) => {
    const isCurrent = startDate.getTime() <= now && endDate.getTime() > now;
    return (
      <Fragment>
        <ListItem onClick={handleClick.bind(null, id)} button key={id}>
          <ListItemIcon>
            <AlarmIcon color={isCurrent ? 'primary' : ''} />
          </ListItemIcon>
          <ListItemText
            inset
            primary={name}
            secondary={`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}
          />
        </ListItem>
        <li>
          <Divider inset />
        </li>
      </Fragment>
    );
  });
}

function Sidebar() {
  const classes = useStyles();

  return (
    <Suspense
      maxDuration={300}
      fallback={
        <div className={classes.placeholder}>
          <CircularProgress size={25} />
        </div>
      }
    >
      <List
        className={classes.list}
        component="nav"
        subheader={
          <ListSubheader component="div">Lista głosowań</ListSubheader>
        }
      >
        <SidebarItems />
      </List>
    </Suspense>
  );
}

export default Sidebar;
