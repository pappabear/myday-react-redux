import request from 'superagent'

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
	return (dispatch) => {
        dispatch(tasksIsLoading(true));

		request
		.get('http://localhost:3000/api/today')
		.end((err, res) => {
			if (err) {
				dispatch(tasksHasErrored(true));
			}
	  
			const resultText = JSON.parse(res.text)
			const tasks = resultText.data

			dispatch(tasksIsLoading(false));
			dispatch(tasksFetchDataSuccess(tasks));
			})
	}
}


export function tasksFetchTomorrowData() {
	return (dispatch) => {
        dispatch(tasksIsLoading(true));

		request
		.get('http://localhost:3000/api/tomorrow')
		.end((err, res) => {
			if (err) {
				dispatch(tasksHasErrored(true));
			}
	  
			const resultText = JSON.parse(res.text)
			const tasks = resultText.data

			dispatch(tasksIsLoading(false));
			dispatch(tasksFetchDataSuccess(tasks));
			})
	
	}
}
