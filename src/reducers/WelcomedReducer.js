import initialState from '../initialState';

import {
  SET_WELCOMED,
} from '../actions/types';

export default (state = initialState.welcomed, action) => {
  switch (action.type) {
    case SET_WELCOMED:
      return action.payload;
    default:
      return state;
  }
};
