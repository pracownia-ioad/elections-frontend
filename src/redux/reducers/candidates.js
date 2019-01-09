import {
  ADD_CANDIDATE,
  START_CANDIDATES_FETCHING,
  STOP_CANDIDATES_FETCHING,
} from '../actionTypes';

const initialState = {
  candidates: [],
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CANDIDATE: {
      return {
        ...state,
        candidates: [...state.candidates, action.payload],
      };
    }
    case START_CANDIDATES_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case STOP_CANDIDATES_FETCHING: {
      return {
        ...state,
        candidates: action.payload,
        loading: false,
      };
    }
    default:
      return state;
  }
}
