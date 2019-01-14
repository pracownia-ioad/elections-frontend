/* @flow */
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import AlarmIcon from '@material-ui/icons/Alarm';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import { navigate } from '@reach/router';

import { fetchElections, fetchStatistics } from '../redux/actions';
import { type State } from '../redux/types/state';
import { type Election } from '../types';

function sortElections(first: Election, second: Election) {
  return first.name > second.name ? 1 : -1;
}

type Props = {
  items: Array<Election>,
  fetchStatistics: ({ electionId: number }) => Promise<*>,
};

function SidebarItems(props: Props) {
  const now = Date.now();

  function handleClick(route: number) {
    navigate(`/dashboard/user/election/${route}`);
  }

  return [...props.items]
    .sort(sortElections)
    .map(({ id, name, startDate, endDate }) => {
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

function Sidebar(props) {
  const classes = useStyles();

  useEffect(() => {
    //  Run on mount
    props.fetchElections();
  }, []);

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
        <SidebarItems
          fetchStatistics={props.fetchStatistics}
          items={props.elections}
        />
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

const mapStateToProps = ({ elections }: State) => ({
  elections: Object.values(elections.elections),
  loading: elections.fetchingElections,
});

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      fetchElections,
      fetchStatistics,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
