import shortid from 'shortid';
import {
  ADD_ENTRY,
} from './types';

export const createEntry = (entry) => {
  return {
    type: ADD_ENTRY,
    payload: { ...entry, id: shortid.generate(), createdAt: new Date() },
  };
};
