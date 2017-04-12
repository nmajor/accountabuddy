import { combineReducers } from 'redux';
import EntriesReducer from './EntriesReducer';
import GoalsReducer from './GoalsReducer';

export default combineReducers({
  entries: EntriesReducer,
  goals: GoalsReducer,
});
