import { combineReducers } from 'redux';
import { articles, articlesHasErrored, articlesIsLoading } from './articles';

export default combineReducers({
    articles,
    articlesHasErrored,
    articlesIsLoading
});
