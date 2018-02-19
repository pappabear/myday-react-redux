export function tasksHasErrored(bool) {
    return {
        type: 'TASKS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function tasksIsLoading(bool) {
    return {
        type: 'TASKS_IS_LOADING',
        isLoading: bool
    };
}

export function addTask(task) {
	//console.log('Put your addArticle API call here')
    return {
        type: 'ADD_TASK',
        payload: task
    };
}

export function tasksFetchDataSuccess(tasks) {
    return {
        type: 'TASKS_FETCH_DATA_SUCCESS',
        tasks
    };
}

export function tasksFetchTodayData() {
	//console.log('Put your articlesFetchData() API call here, since its connected and thunked')
	return (dispatch) => {
        dispatch(tasksIsLoading(true));
		var tasks = [
			{
				id: '1',
				title: 'due today one'
			},
			{
				id: '2',
				title: 'due today two'
			}
		];			
		dispatch(tasksIsLoading(false));
		dispatch(tasksFetchDataSuccess(tasks));
	}
	//return (dispatch) => {dispatch(tasksFetchDataSuccess(tasks));};
}

export function tasksFetchTomorrowData() {
	//console.log('Put your articlesFetchData() API call here, since its connected and thunked')
	return (dispatch) => {
        dispatch(tasksIsLoading(true));
		var tasks = [
			{
				id: '1',
				title: 'due tomorrow one'
			},
			{
				id: '2',
				title: 'due tomorrow two'
			}
		];			
		dispatch(tasksIsLoading(false));
		dispatch(tasksFetchDataSuccess(tasks));
	}
	//return (dispatch) => {dispatch(tasksFetchDataSuccess(tasks));};
}
