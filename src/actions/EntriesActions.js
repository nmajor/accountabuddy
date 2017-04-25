import shortid from 'shortid';
import {
  ADD_ENTRY,
  DELETE_ENTRY,
  DELETE_ALL_ENTRIES,
} from './types';

export const createEntry = (entry) => {
  return {
    type: ADD_ENTRY,
    payload: { ...entry, id: shortid.generate(), createdAt: new Date() },
  };
};

export const deleteEntry = (id) => {
  return {
    type: DELETE_ENTRY,
    payload: id,
  };
};

export const deleteAllEntries = () => {
  return {
    type: DELETE_ALL_ENTRIES,
  };
};
