import initialState from '../initialState';

import {
  ADD_ENTRY,
  DELETE_ALL_ENTRIES,
} from '../actions/types';

export default (state = initialState.entries, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return [...state, action.payload];
    case DELETE_ALL_ENTRIES:
      return [];
    default:
      return state;
  }
};
