import { combineReducers } from 'redux';
import EntriesReducer from './EntriesReducer';
import GoalsReducer from './GoalsReducer';
import WelcomedReducer from './WelcomedReducer';

export default combineReducers({
  entries: EntriesReducer,
  goals: GoalsReducer,
  welcomed: WelcomedReducer,
});
