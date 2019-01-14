/* @flow */
import React, { Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import AlarmIcon from '@material-ui/icons/Alarm';

import { type Election } from '../types';

type Props = {
  election: Election,
  isCurrent: boolean,
  onClick: (electionId: number) => void,
};

function ElectionItem({ election, isCurrent, onClick }: Props) {
  return (
    <Fragment>
      <ListItem onClick={onClick.bind(null, election.id)} button>
        <ListItemIcon>
          <AlarmIcon color={isCurrent ? 'primary' : ''} />
        </ListItemIcon>
        <ListItemText
          inset
          primary={election.name}
          secondary={`${election.startDate.toLocaleDateString()} - ${election.endDate.toLocaleDateString()}`}
        />
      </ListItem>
      <li>
        <Divider inset />
      </li>
    </Fragment>
  );
}

export default ElectionItem;
