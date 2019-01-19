/* @flow */
import * as React from 'react';
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
};

function Elections(props: Props) {
  const classes = useStyles();
  const [state, setState] = React.useState({}); // eslint-disable-line

  React.useEffect(() => {
    const interval = setInterval(() => {
      setState({});
      return () => {
        clearInterval(interval);
      };
    }, 2000);
  }, []);

  const now = Date.now();

  function handleClick(isCurrent: boolean) {
    return function handle(electionId: number) {
      if (isCurrent) {
        navigate(`/dashboard/user/election/${electionId}`);
      } else {
        navigate(`/dashboard/user/statistics/${electionId}`);
      }
    };
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
              onClick={handleClick(isCurrent)}
            />
          );
        })
      )}
    </List>
  );
}

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
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
