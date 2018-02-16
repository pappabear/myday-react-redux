export function tasksHasErrored(state = false, action) {
    switch (action.type) {
        case 'TASKS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function tasksIsLoading(state = false, action) {
    switch (action.type) {
        case 'TASKS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function tasks(state = [], action) {
    switch (action.type) {
        case 'TASKS_FETCH_DATA_SUCCESS':
            return action.tasks;

	    case 'ADD_TASK':
			//console.log('inside reducer with ADD_ARTICLE');
			//console.log('action.payload.title=' + action.payload.title);
			//console.log('state.length (before thunk) = ' + state.length);
			return [...state, action.payload];

        default:
            return state;
    }
}
