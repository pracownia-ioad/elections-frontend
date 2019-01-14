/* @flow */
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import { fetchStatistics } from '../redux/actions';

import { type Statistics } from '../types';
import { type State } from '../redux/types/state';

type Props = {
  electionID: string,
  statistics: { [key: string]: Array<Statistics> },
  fetchStatistics: ({ electionId: string }) => void,
};

function ElectionStatistics(props: Props) {
  const classes = useStyles();

  React.useEffect(() => {
    props.fetchStatistics({ electionId: props.electionID });
  }, []);

  const statistic = props.statistics[props.electionID];

  if (!statistic) {
    return null;
  }

  return (
    <div className={classes.container}>
      <Typography>{statistic[0].voteCounts}</Typography>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    flex: 1,
    height: 400,
    display: 'flex',
  },
});

const mapStateToProps = ({ statistics }: State) => ({
  statistics: statistics.statistics,
});

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      fetchStatistics,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ElectionStatistics);
