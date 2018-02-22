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
	//console.log('in the action now...');
	//console.log('subject=' + task.subject)
	//console.log('dueDate=' + task.dueDate)
    //return {
    //    type: 'ADD_TASK',
    //    payload: task
	//};
	return (dispatch) => {
        dispatch(tasksIsLoading(true));

		var dateBuffer = new Date();
        var dd = dateBuffer.getDate(); 
        var mm = dateBuffer.getMonth()+1; //January is 0! 
        var yyyy = dateBuffer.getFullYear(); 
        var todayString = yyyy + '-' + mm + '-' + dd;
		dateBuffer.setDate(dateBuffer.getDate() + 1);
		dd = dateBuffer.getDate(); 
        mm = dateBuffer.getMonth()+1; //January is 0! 
        yyyy = dateBuffer.getFullYear(); 
        var tomorrowString = yyyy + '-' + mm + '-' + dd;

		request
		.post('http://localhost:3000/api/tasks')
		.send(task)
		.end((err, res) => {
			if (err) {
				dispatch(tasksHasErrored(true));
			}
	  
			dispatch(tasksIsLoading(false));
			if (task.due_date == todayString)
				dispatch(tasksFetchTodayData());
			else
				dispatch(tasksFetchTomorrowData());
			})
	}
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
