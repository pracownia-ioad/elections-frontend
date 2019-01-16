/* @flow */
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { VictoryBar, VictoryChart } from 'victory';

import { makeStyles } from '@material-ui/styles';

import { Typography } from '@material-ui/core';
import { fetchStatistics } from '../redux/actions';

import { type Statistics, type Election } from '../types';
import { type State } from '../redux/types/state';

type Props = {
  electionID: string,
  elections: { [key: string]: Election },
  statistics: { [key: string]: Array<Statistics> },
  fetchStatistics: ({ electionId: string }) => void,
};

const colors = ['#252525', '#525252', '#737373', '#969696', '#bdbdbd'];

function ElectionStatistics(props: Props) {
  const classes = useStyles();

  React.useEffect(() => {
    props.fetchStatistics({ electionId: props.electionID });
  }, []);

  React.useEffect(
    () => {
      props.fetchStatistics({ electionId: props.electionID });
    },
    [props.electionID]
  );

  const statistic = props.statistics[props.electionID];
  const election = props.elections[props.electionID];

  const totalVotes = statistic
    ? statistic.reduce((prev, curr) => prev + curr.voteCounts, 0)
    : 0;

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        {!statistic || !election || totalVotes === 0 ? (
          <Typography variant="h4" className={classes.message}>
            Aktualnie nie oddano żadnego głosu na to głosowanie.
          </Typography>
        ) : (
          <React.Fragment>
            <Typography variant="headline">{election.name}</Typography>
            <VictoryChart
              domainPadding={{ x: 30 }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
            >
              <VictoryBar
                width="100%"
                data={statistic.map(
                  ({ voteCounts, candidate: { lastName } }, index) => ({
                    x: `${lastName}`,
                    y: voteCounts,
                    index,
                  })
                )}
                style={{
                  data: {
                    fill: d =>
                      colors[(d.index + colors.length) % colors.length],
                  },
                }}
              />
            </VictoryChart>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    flex: 1,
    height: 400,
    display: 'flex',
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: '#efefef',
    padding: 50,
  },
  message: {
    textAlign: 'center',
    color: '#555',
    fontWeight: 'normal',
  },
});

const mapStateToProps = ({ statistics, elections }: State) => ({
  statistics: statistics.statistics,
  elections: elections.elections,
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
