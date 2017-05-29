import shortid from 'shortid';
import {
  ADD_GOAL,
  REMOVE_GOAL,
  HIDE_GOAL,
  DELETE_ALL_GOALS,
} from './types';

export const createGoal = (goal) => {
  return {
    type: ADD_GOAL,
    payload: { ...goal, id: shortid.generate(), createdAt: new Date() },
  };
};

export const removeGoal = (id) => {
  return {
    type: REMOVE_GOAL,
    payload: id,
  };
};

export const hideGoal = (id) => {
  return {
    type: HIDE_GOAL,
    payload: id,
  };
};

export const deleteAllGoals = () => {
  return {
    type: DELETE_ALL_GOALS,
  };
};
