import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchTask } from '../../actions'
import EditForm from "./EditForm"
import withWidth from 'material-ui/utils/withWidth'

import {pink500, grey400} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';
import Checkbox from 'material-ui/Checkbox';
import { Field, reduxForm } from 'redux-form'
import { DatePicker, TextField } from 'redux-form-material-ui'


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
                              initialValues={{ subject: task.subject,
                                               due_date: new Date(task.due_date),
                                               id: task.id }}
                    />
                )}

                <h3>DEBUG INFO</h3><br/>
                <div>Querystring id passed = {this.props.match.params.id}</div><br/>
                <div>tasks.length = {this.props.tasks.length}</div><br/>
                
                {this.props.tasks.map(task =>
                    <div key={task.id}>
                        <div>subject should be {task.subject}</div><br/>
                        <div>id should be {task.id}</div><br/>
                        <div>due_date should be {task.due_date}</div><br/>
                    </div>
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


