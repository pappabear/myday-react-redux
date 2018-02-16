import { combineReducers } from 'redux';
import { tasks, tasksHasErrored, tasksIsLoading } from './tasks';

export default combineReducers({
    tasks,
    tasksHasErrored,
    tasksIsLoading
});
