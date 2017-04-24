import {
  SET_WELCOMED,
} from './types';

export const setWelcomed = (val) => {
  return {
    type: SET_WELCOMED,
    payload: val,
  };
};
