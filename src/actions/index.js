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
	return (dispatch) => {
        dispatch(tasksIsLoading(true));

		var dateBuffer = new Date();
		var dd = dateBuffer.getDate(); 
		if (dd < 10)
			dd = '0' + dd;
        var mm = dateBuffer.getMonth()+1; //January is 0! 
		if (mm < 10)
			mm = '0' + mm;
        var yyyy = dateBuffer.getFullYear(); 
        var todayString = yyyy + '-' + mm + '-' + dd;
		dateBuffer.setDate(dateBuffer.getDate() + 1);
		dd = dateBuffer.getDate(); 
		if (dd < 10)
			dd = '0' + dd;
        mm = dateBuffer.getMonth()+1; //January is 0! 
		if (mm < 10)
			mm = '0' + mm;
        yyyy = dateBuffer.getFullYear(); 
        var tomorrowString = yyyy + '-' + mm + '-' + dd;

		request
		.post('http://localhost:3000/api/tasks')
		.send(task)
		.end((err, res) => {
			if (err) {
				//console.log('API call failed')
				dispatch(tasksHasErrored(true));
			}
			//console.log('API call succeeded')
			dispatch(tasksIsLoading(false));
			if (task.due_date === todayString)
				dispatch(fetchTodayTasks());
			else if (task.due_date === tomorrowString)
				dispatch(fetchTomorrowTasks());
			else
				dispatch(fetchWeekTasks());
			})
	}
}

export function tasksFetchDataSuccess(tasks) {
    return {
        type: 'TASKS_FETCH_DATA_SUCCESS',
        tasks
    };
}


export function fetchTodayTasks() {
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


export function fetchTomorrowTasks() {
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


export function fetchWeekTasks() {
	return (dispatch) => {
        dispatch(tasksIsLoading(true));

		request
		.get('http://localhost:3000/api/week')
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


export function toggleTaskStatus(task) {
	return (dispatch) => {
        dispatch(tasksIsLoading(true));

		var dateBuffer = new Date();
		var dd = dateBuffer.getDate(); 
		if (dd < 10)
			dd = '0' + dd;
        var mm = dateBuffer.getMonth()+1; //January is 0! 
		if (mm < 10)
			mm = '0' + mm;
        var yyyy = dateBuffer.getFullYear(); 
        var todayString = yyyy + '-' + mm + '-' + dd;
		dateBuffer.setDate(dateBuffer.getDate() + 1);
		dd = dateBuffer.getDate(); 
		if (dd < 10)
			dd = '0' + dd;
        mm = dateBuffer.getMonth()+1; //January is 0! 
		if (mm < 10)
			mm = '0' + mm;
        yyyy = dateBuffer.getFullYear(); 
        var tomorrowString = yyyy + '-' + mm + '-' + dd;

		request
		.put('http://localhost:3000/api/toggleStatus/' + task.id)
		//.send(task)
		.end((err, res) => {
			if (err) {
				//console.log('API call failed')
				dispatch(tasksHasErrored(true));
			}
			//console.log('API call succeeded')
			dispatch(tasksIsLoading(false));

			if (task.due_date === todayString)
				dispatch(fetchTodayTasks());
			else if (task.due_date === tomorrowString)
				dispatch(fetchTomorrowTasks());
			else
				dispatch(fetchWeekTasks());
		})	
	}
}

export function fetchTask(id) {
	return (dispatch) => {
        dispatch(tasksIsLoading(true));

		request
		.get('http://localhost:3000/api/tasks/'+id)
		.end((err, res) => {
			if (err) {
				dispatch(tasksHasErrored(true));
			}
	  
			const resultText = JSON.parse(res.text)
			const result = resultText.data
			var task = { id:result.id, subject:result.subject, due_date:result.due_date }

			var tasks = []
			tasks.push(task)

			dispatch(tasksIsLoading(false));
			dispatch(tasksFetchDataSuccess(tasks));
			})
	}
}

export function updateTask(task) {
	return (dispatch) => {
        dispatch(tasksIsLoading(true));

		var dateBuffer = new Date();
		var dd = dateBuffer.getDate(); 
		if (dd < 10)
			dd = '0' + dd;
        var mm = dateBuffer.getMonth()+1; //January is 0! 
		if (mm < 10)
			mm = '0' + mm;
        var yyyy = dateBuffer.getFullYear(); 
        var todayString = yyyy + '-' + mm + '-' + dd;
		dateBuffer.setDate(dateBuffer.getDate() + 1);
		dd = dateBuffer.getDate(); 
		if (dd < 10)
			dd = '0' + dd;
        mm = dateBuffer.getMonth()+1; //January is 0! 
		if (mm < 10)
			mm = '0' + mm;
        yyyy = dateBuffer.getFullYear(); 
        var tomorrowString = yyyy + '-' + mm + '-' + dd;

		request
		.put('http://localhost:3000/api/tasks/' + task.id)
		.send(task)
		.end((err, res) => {
			if (err) {
				//console.log('API call failed')
				dispatch(tasksHasErrored(true));
			}
			//console.log('API call succeeded')
			dispatch(tasksIsLoading(false));

			// need to refresh state here since we are redirecting to a list view!
			if (task.due_date === todayString)
				dispatch(fetchTodayTasks());
			else if (task.due_date === tomorrowString)
				dispatch(fetchTomorrowTasks());
			else
				dispatch(fetchWeekTasks());

			})
	}
}

export function deleteTask(id) {
	return (dispatch) => {
        dispatch(tasksIsLoading(true));

		request
		.get('http://localhost:3000/api/tasks/'+id)
		.end((err, res) => {
			if (err) {
				dispatch(tasksHasErrored(true));
			}
	  
			const resultText = JSON.parse(res.text)
			const result = resultText.data
			var taskDueDate = new Date(result.due_date.split('T')[0])

			var dateBuffer = new Date();
			var dd = dateBuffer.getDate(); 
			if (dd < 10)
				dd = '0' + dd;
			var mm = dateBuffer.getMonth()+1; //January is 0! 
			if (mm < 10)
				mm = '0' + mm;
			var yyyy = dateBuffer.getFullYear(); 
			var todayString = yyyy + '-' + mm + '-' + dd;
			dateBuffer.setDate(dateBuffer.getDate() + 1);
			dd = dateBuffer.getDate(); 
			if (dd < 10)
				dd = '0' + dd;
			mm = dateBuffer.getMonth()+1; //January is 0! 
			if (mm < 10)
				mm = '0' + mm;
			yyyy = dateBuffer.getFullYear(); 
			var tomorrowString = yyyy + '-' + mm + '-' + dd;

			request
			.delete('http://localhost:3000/api/tasks/' + id)
			//.send(task)
			.end((err, res) => {
				if (err) {
					console.log('API call failed')
					dispatch(tasksHasErrored(true));
				}
				console.log('API call succeeded')
				dispatch(tasksIsLoading(false));

				// need to refresh state here since we are redirecting to a list view!
				if (taskDueDate === todayString)
					dispatch(fetchTodayTasks());
				else if (taskDueDate === tomorrowString)
					dispatch(fetchTomorrowTasks());
				else
					dispatch(fetchWeekTasks());

				})
			})
	}
}
