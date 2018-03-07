import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchTask } from '../../actions'
import { updateTask } from '../../actions'
import EditForm from "./EditForm"
import withWidth from 'material-ui/utils/withWidth'


const mapStateToProps = state => {
    return { 
      tasks: state.tasks,
      hasErrored: state.tasksHasErrored,
      isLoading: state.tasksIsLoading
      }
}

class TaskEditor extends Component {

    componentDidMount() 
    {
        this.props.fetchTask(this.props.match.params.id);
    }

    render() 
    {
    
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (

            <div>

                {this.props.tasks.map(task =>
                    <EditForm key={task.id}
                              history={this.props.history}  // for redirecting after the submit action
                              originalDueDate={task.due_date} // for redirecting after the submit action
                              taskId={task.id}
                              subject={task.subject}
                              due_date={task.due_date}
                              updateTask={this.props.updateTask}
                    />
                )}

            </div>  
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchTask: (id) => dispatch(fetchTask(id)),
        updateTask: (task) => dispatch(updateTask(task))
    }
}


const componentCreator = connect(mapStateToProps, mapDispatchToProps)
export default withWidth()(componentCreator(TaskEditor))


