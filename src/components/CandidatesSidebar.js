/* @flow */
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';

import { type Candidate } from '../types';
import { type State } from '../redux/types/state';

function sortCandidates(first, second) {
  return `${first.lastName}${first.firstName}` >
    `${second.lastName}${second.firstName}`
    ? 1
    : -1;
}

type SidebarItemsProps = {
  search: string,
  candidates: Array<Candidate>,
};

function SidebarItems({ search, candidates }: SidebarItemsProps) {
  return [...candidates]
    .filter(
      ({ firstName, lastName }) =>
        firstName.toLowerCase().includes(search) ||
        lastName.toLowerCase().includes(search)
    )
    .sort(sortCandidates)
    .map(({ id, firstName, lastName }: Candidate) => (
      <Fragment>
        <ListItem button key={id}>
          <ListItemText primary={`${lastName} ${firstName}`} />
        </ListItem>
      </Fragment>
    ));
}

function Sidebar({ candidates, isFetching }) {
  const classes = useStyles();
  const [search, setSearch] = useState('');

  function setSearchText(event) {
    setSearch(event.target.value);
  }

  return (
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
      {isFetching ? (
        <div className={classes.placeholder}>
          <CircularProgress size={25} />
        </div>
      ) : (
        <div className={classes.scrollable}>
          <SidebarItems candidates={candidates} search={search.toLowerCase()} />
        </div>
      )}
    </List>
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
  scrollable: {
    maxHeight: 200,
    overflowY: 'auto',
  },
});

const mapStateToProps = ({ candidates }: State) => ({
  candidates: Object.values(candidates.candidates),
  isFetching: candidates.fetchingCandidates,
});

export default connect(mapStateToProps)(Sidebar);
