/* @flow */

import {
  START_FETCHING_STATISTICS,
  SUCCESS_FETCHING_STATISTICS,
  FAILURE_FETCHING_STATISTICS,
} from '../actionTypes';

import { type Action } from '../types/action';
import { type Statistics } from '../../types';

export type StatisticsState = {|
  statistics: {
    [key: string]: Statistics,
  },
  loading: boolean,
|};

const initialState = {
  statistics: {},
  loading: false,
};

export default function(
  state: StatisticsState = initialState,
  action: Action
): StatisticsState {
  switch (action.type) {
    case START_FETCHING_STATISTICS: {
      return {
        ...state,
        loading: true,
      };
    }
    case SUCCESS_FETCHING_STATISTICS: {
      const { electionId, voteCounts, candidate } = action.payload;
      return {
        ...state,
        statistics: {
          ...state.statistics,
          [electionId]: { voteCounts, candidate },
        },
        loading: false,
      };
    }
    case FAILURE_FETCHING_STATISTICS: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}
