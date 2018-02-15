//import { createStore } from "redux";
//import rootReducer from "../reducers/index";
//const store = createStore(rootReducer);
//export default store;

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import initialState from '../reducers';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
//        initialState,
        applyMiddleware(thunk)
    );
}

