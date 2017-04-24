import initialState from '../initialState';

import {
  ADD_ENTRY,
} from '../actions/types';

export default (state = initialState.entries, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return [...state, action.payload];
    default:
      return state;
  }
};
