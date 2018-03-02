import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTask } from '../actions';
import withWidth from 'material-ui/utils/withWidth';
import {Link} from 'react-router-dom';

const mapStateToProps = state => {
      return { 
        tasks: state.tasks,
        hasErrored: state.tasksHasErrored,
        isLoading: state.tasksIsLoading
        };
};

class EditForm extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchTask(72);
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
                
                <h1>Edit Task</h1>

                {this.props.tasks.map(task =>
                <div key={task.id}>
                    <span>Subject:{task.subject}</span><p/>
                    <span>Due Date:{task.due_date}</span><p/>
                    <span>Complete?{task.is_complete}</span>
                </div>
                )}

            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchTask: (id) => dispatch(fetchTask(id))
    };
};


const componentCreator = connect(mapStateToProps, mapDispatchToProps);
export default withWidth()(componentCreator(EditForm));

