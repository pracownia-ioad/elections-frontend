/* @flow */
// $FlowFixMe
import React, { useState } from 'react';
import { unstable_createResource } from 'react-cache'; // eslint-disable-line
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

import { getVoting } from '../services';

type Props = {
  votingId: number,
};

const useStyles = makeStyles({
  container: {
    margin: 50,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 40,
  },
  list: {
    marginTop: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const VotingResource = unstable_createResource(votingId => getVoting(votingId));

function voting({ votingId }: Props) {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(null);

  function handleCandidateClick(id: number) {
    setCurrentIndex(id);
  }

  const data = VotingResource.read(parseInt(votingId, 10));

  return (
    <div className={classes.container}>
      <div className={classes.titleWrapper}>
        <Typography variant="headline">{data.description}</Typography>
      </div>
      <Divider />
      <List
        className={classes.list}
        component="ul"
        subheader={<ListSubheader component="div">Kandydaci</ListSubheader>}
      >
        {data.candidats.map(({ firstName, lastName, id }) => (
          <ListItem
            key={id}
            dense
            button
            onClick={handleCandidateClick.bind(null, id)}
          >
            <Radio checked={currentIndex === id} color="primary" />
            <ListItemText primary={`${firstName} ${lastName}`} />
          </ListItem>
        ))}
      </List>
      <div className={classes.buttonContainer}>
        <Button variant="contained" component="button" color="primary">
          Zatwierdź głos
        </Button>
      </div>
    </div>
  );
}

export default voting;
