import initialState from '../initialState';
import _ from 'lodash';
import {
  ADD_GOAL,
  REMOVE_GOAL,
  HIDE_GOAL,
  DELETE_ALL_GOALS,
} from '../actions/types';

export default (state = initialState.goals, action) => {
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
    case HIDE_GOAL: {
      const index = _.findIndex(state, { id: action.payload });
      if (index > -1) {
        return [
          ...state.slice(0, index),
          { ...state[index], hide: true },
          ...state.slice(index + 1),
        ];
      }
      return state;
    }
    case DELETE_ALL_GOALS:
      return [];
    default:
      return state;
  }
};
