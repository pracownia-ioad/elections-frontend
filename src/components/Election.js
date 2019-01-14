/* @flow */
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

import { type Election, type VoteObject } from '../types';

type Props = {|
  election: ?Election,
  vote: VoteObject => Promise<*>,
|};

function voting({ election, vote }: Props) {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);

  function handleCandidateClick(id: number) {
    setCurrentId(id);
  }

  function handleSubmitButtonClick() {
    if (!election || !currentId) {
      return;
    }

    const candidate = election.candidates.find(({ id }) => currentId === id);

    if (!candidate) {
      return;
    }

    vote({
      electionId: election.id,
      candidateId: candidate.id,
    });
  }

  if (!election) {
    return 'Something went wrong';
  }

  return (
    <div className={classes.container}>
      <div className={classes.titleWrapper}>
        <Typography variant="headline">{election.name}</Typography>
      </div>
      <Divider />
      <List
        className={classes.list}
        component="ul"
        subheader={<ListSubheader component="div">Kandydaci</ListSubheader>}
      >
        {election.candidates.map(({ firstName, lastName, id }) => (
          <ListItem
            key={id}
            dense
            button
            onClick={handleCandidateClick.bind(null, id)}
          >
            <Radio checked={currentId === id} color="primary" />
            <ListItemText primary={`${firstName} ${lastName}`} />
          </ListItem>
        ))}
      </List>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          component="button"
          color="primary"
          onClick={handleSubmitButtonClick}
        >
          Zatwierdź głos
        </Button>
      </div>
    </div>
  );
}

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

export default voting;
