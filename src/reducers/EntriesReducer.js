import _ from 'lodash';
import initialState from '../initialState';

import {
  ADD_ENTRY,
  DELETE_ENTRY,
  DELETE_ALL_ENTRIES,
} from '../actions/types';

export default (state = initialState.entries, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return [...state, action.payload];
    case DELETE_ENTRY: {
      const entryIndex = _.findIndex(state, { id: action.payload });
      if (entryIndex > -1) {
        return [
          ...state.slice(0, entryIndex),
          ...state.slice(entryIndex + 1),
        ];
      }
      return state;
    }
    case DELETE_ALL_ENTRIES:
      return [];
    default:
      return state;
  }
};
