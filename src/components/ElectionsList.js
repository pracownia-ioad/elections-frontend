/* @flow */
import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import { navigate } from '@reach/router';

import ElectionItem from './ElectionItem';
import { type Election } from '../types';

function sortElections(first: Election, second: Election) {
  return first.name > second.name ? 1 : -1;
}

type Props = {
  elections: Array<Election>,
  loading: boolean,
  actionType: 'election' | 'statistics',
};

function Elections(props: Props) {
  const classes = useStyles();

  const now = Date.now();

  function handleClick(electionId: number) {
    if (props.actionType === 'election') {
      navigate(`/dashboard/user/election/${electionId}`);
    } else {
      navigate(`/dashboard/admin/statistics/${electionId}`);
    }
  }

  return (
    <List
      className={classes.list}
      component="nav"
      subheader={<ListSubheader component="div">Lista głosowań</ListSubheader>}
    >
      {props.loading ? (
        <div className={classes.placeholder}>
          <CircularProgress size={25} />
        </div>
      ) : (
        [...props.elections].sort(sortElections).map(election => {
          const isCurrent =
            election.startDate.getTime() <= now &&
            election.endDate.getTime() > now;
          return (
            <ElectionItem
              key={election.id}
              election={election}
              isCurrent={isCurrent}
              onClick={handleClick}
            />
          );
        })
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
});

export default Elections;
