import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchTask } from '../../actions'
import SubmitHandler from "./SubmitHandler"
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
        const { match: { params } } = this.props;
        var id = `${params.id}`
        this.props.fetchTask(id);
    }

    render() {
    
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
                              initialValues={{ subject: task.subject,
                                               due_date: new Date(task.due_date),
                                               id: task.id }}
                    />
                )}
            </div>  
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchTask: (id) => dispatch(fetchTask(id))
    }
}


const componentCreator = connect(mapStateToProps, mapDispatchToProps)
export default withWidth()(componentCreator(TaskEditor))


