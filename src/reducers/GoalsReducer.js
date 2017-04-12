import _ from 'lodash';
import {
  ADD_GOAL,
  REMOVE_GOAL,
  HIDE_GOAL,
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_GOAL:
      return [...state, action.payload];
    case REMOVE_GOAL: {
      const index = _.findIndex(state, { id: action.payload });
      if (index > -1) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1),
        ];
      }
      return state;
    }
    case HIDE_GOAL:
      return state;
    default:
      return state;
  }
};
