/* @flow */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { DatePicker } from 'material-ui-pickers';

import { type LocalElection, type Candidate } from '../types';

type Props = {
  visible: boolean,
  onClose: () => void,
  createElection: LocalElection => Promise<*>,
  candidates: Array<Candidate>,
};

function createCandidateModal(props: Props) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [candidates, setCandidates] = useState([]);

  function onNameChange(e) {
    setName(e.target.value);
  }

  function createElection() {
    // TODO: add client side validation
    if (!startDate || !endDate) {
      return;
    }

    props.createElection({
      candidates,
      name,
      startDate,
      endDate,
    });
  }

  function onCandidateChange(e) {
    setCandidates(e.target.value);
  }

  return (
    <Modal
      open={props.visible}
      onClose={props.onClose}
      className={classes.modal}
    >
      <div className={classes.paper}>
        <TextField
          className={classes.input}
          label="Nazwa"
          variant="standard"
          value={name}
          onChange={onNameChange}
        />
        <DatePicker
          emptyLabel="Data rozpoczęcia"
          className={classes.input}
          value={startDate}
          format="dddd, MMMM Do YYYY"
          onChange={setStartDate}
        />
        <DatePicker
          emptyLabel="Data zakończenia"
          className={classes.input}
          value={endDate}
          format="dddd, MMMM Do YYYY"
          onChange={setEndDate}
        />
        <FormControl className={classes.input}>
          <InputLabel htmlFor="select-multiple-chip">Kandydaci</InputLabel>
          <Select
            multiple
            value={candidates}
            onChange={onCandidateChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(id => {
                  const item = props.candidates.find(
                    ({ id: candidateId }) => candidateId === id
                  );
                  return item ? (
                    <Chip
                      key={id}
                      label={`${item.firstName} ${item.lastName}`}
                      className={classes.chip}
                    />
                  ) : null;
                })}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {props.candidates.map(item => (
              <MenuItem key={item.id} value={item.id} className={classes.chip}>
                {`${item.firstName} ${item.lastName}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={createElection}
          className={classes.button}
        >
          Stwórz głosowanie
        </Button>
      </div>
    </Modal>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    position: 'absolute',
    width: '450px',
    backgroundColor: '#eee',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    borderRadius: '5px',
  },
  input: {
    marginTop: '15px',
  },
  button: {
    marginTop: '25px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: '5px',
    marginBottom: '5px',
  },
});

export default createCandidateModal;
