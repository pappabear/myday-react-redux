export function articlesHasErrored(state = false, action) {
    switch (action.type) {
        case 'ARTICLES_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function articlesIsLoading(state = false, action) {
    switch (action.type) {
        case 'ARTICLES_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function articles(state = [], action) {
    switch (action.type) {
        case 'ARTICLES_FETCH_DATA_SUCCESS':
            return action.articles;

	    case 'ADD_ARTICLE':
			console.log('inside reducer with ADD_ARTICLE');
			console.log('action.payload.title=' + action.payload.title);
			console.log('state.length (before thunk) = ' + state.length);
			return [...state, action.payload];

        default:
            return state;
    }
}
