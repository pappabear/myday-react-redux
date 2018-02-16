export function addTask(task) {
	//console.log('Put your addArticle API call here')
	//console.log("id=" + article.id);
	//console.log("title=" + article.title);
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

export function tasksFetchData() {
	//console.log('Put your articlesFetchData() API call here, since its connected and thunked')
	    return (dispatch) => {
			var tasks = [
		        {
		            id: '1',
		            title: 'task one'
		        },
		        {
		            id: '2',
		            title: 'task two'
		        }
			];			
			dispatch(tasksFetchDataSuccess(tasks));
		};
}
