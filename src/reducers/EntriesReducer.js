import {
  ADD_ENTRY,
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return [...state, action.payload];
    default:
      return state;
  }
};
