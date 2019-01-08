/* @flow */
import React, { Suspense, Fragment, useState } from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import { unstable_createResource } from 'react-cache'; // eslint-disable-line

import { getCandidates } from '../services';
import { type Candidate } from '../types';

const APIResource = unstable_createResource(() => getCandidates());

function sortCandidates(first, second) {
  return `${first.lastName}${first.firstName}` >
    `${second.lastName}${second.firstName}`
    ? 1
    : -1;
}

type SidebarItemsProps = {
  search: string,
};

function SidebarItems({ search }: SidebarItemsProps) {
  const data = APIResource.read();

  return [...data]
    .filter(
      ({ firstName, lastName }) =>
        firstName.toLowerCase().startsWith(search) ||
        lastName.toLowerCase().startsWith(search)
    )
    .sort(sortCandidates)
    .map(({ id, firstName, lastName }: Candidate) => (
      <Fragment>
        <ListItem button key={id}>
          <ListItemText primary={`${lastName} ${firstName}`} />
        </ListItem>
        {/* <li>
          <Divider />
        </li> */}
      </Fragment>
    ));
}

function Sidebar() {
  const classes = useStyles();
  const [search, setSearch] = useState('');

  function setSearchText(event) {
    setSearch(event.target.value);
  }

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
          <ListSubheader component="div">Lista Kandydatów</ListSubheader>
        }
      >
        <ListItem>
          <TextField
            label="Szukaj"
            variant="outlined"
            value={search}
            onChange={setSearchText}
          />
        </ListItem>
        <SidebarItems search={search.toLowerCase()} />
      </List>
    </Suspense>
  );
}

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

export default Sidebar;
