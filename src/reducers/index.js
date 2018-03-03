import { combineReducers } from 'redux';
import { tasks, tasksHasErrored, tasksIsLoading } from './tasks';
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
    tasks,
    tasksHasErrored,
    tasksIsLoading,
    form: reduxFormReducer
});
