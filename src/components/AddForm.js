import React, { Component } from "react";
import { connect } from "react-redux";
import { addTask } from "../actions/index";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
import {Link} from 'react-router-dom';


const mapDispatchToProps = dispatch => {
  return {
    addTask: task => dispatch(addTask(task))
  };
};

class ConnectedForm extends Component {

    constructor(props) 
    {
        super(props)
        var d = new Date()
        var dd = d.getDate()
        var mm = d.getMonth()+1
        if (dd < 10)
            dd = '0' + dd
        if (mm < 10)
            mm = '0' + mm
        var yyyy = d.getFullYear()
        var dateString = yyyy + '-' + mm + '-' + dd

        this.state = 
        {
            subject: "",
            due_date: dateString,
            subject_hasErrors: false,
            due_date_hasErrors: false
        }
        
        this.handleSubjectChange = this.handleSubjectChange.bind(this)
        this.handleDueDateChange = this.handleDueDateChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    isValid = () => {
        if (this.state.subject === "")
        {
            this.setState({ subject_hasErrors: true })
            return false
        }
        if (this.state.due_date === "")
        {
            this.setState({ due_date_hasErrors: true })
            return false
        }
        return true
    }

    handleDueDateChange(event, controlledDate) 
    {
        var d = new Date(controlledDate)
        var dd = d.getDate()
        var mm = d.getMonth()+1
        if (dd < 10)
            dd = '0' + dd
        if (mm < 10)
            mm = '0' + mm
        var yyyy = d.getFullYear()
        var dateString = yyyy + '-' + mm + '-' + dd
        this.setState({ due_date: dateString })
    }

    handleSubjectChange(event) 
    {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleSubmit(event) 
    {
        event.preventDefault()

        if (!this.isValid())
            return

        var task = { subject: this.state.subject, 
                     due_date: this.state.due_date,
                     is_complete: false } 
        
        // dispatch the update through the API
        this.props.addTask(task)

        // redirect to the right view
        var dateBuffer = new Date()
        var dd = dateBuffer.getDate()
        if (dd < 10)
            dd = '0' + dd
        var mm = dateBuffer.getMonth()+1; //January is 0! 
        if (mm < 10)
            mm = '0' + mm
        var yyyy = dateBuffer.getFullYear()
        var todayString = yyyy + '-' + mm + '-' + dd
        dateBuffer.setDate(dateBuffer.getDate() + 1)
        dd = dateBuffer.getDate()
        if (dd < 10)
          dd = '0' + dd
            mm = dateBuffer.getMonth()+1; //January is 0! 
        if (mm < 10)
          mm = '0' + mm
            yyyy = dateBuffer.getFullYear()
            var tomorrowString = yyyy + '-' + mm + '-' + dd

        if (task.due_date === todayString)
            this.props.history.push("/today")
        else if (task.due_date === tomorrowString)
            this.props.history.push("/tomorrow")
        else
            this.props.history.push("/week")
    }

    render() {
  
        const styles = 
        {
        toggleDiv: {
            maxWidth: 300,
            marginTop: 40,
            marginBottom: 5
        },
        toggleLabel: {
            color: grey400,
            fontWeight: 100
        },
        buttons: {
            marginTop: 30,
            float: 'right'
        },
        saveButton: {
            marginLeft: 5
        }
        }
  
        return (

            <div>

                <h1>Add a New Task</h1>

                <form onSubmit={this.handleSubmit}>

                    <TextField
                        hintText="Subject"
                        floatingLabelText="Subject"
                        fullWidth={true}
                        id={'subject'}
                        name={'subject'}
                        value={this.state.subject}
                        onChange={this.handleSubjectChange}
                        errorText={this.state.subject_hasErrors ? 'Required' : ''}
                    />

                    <DatePicker
                        hintText="Due Date"
                        floatingLabelText="Due Date"
                        autoOk={true}
                        fullWidth={true}
                        id={'due_date'}
                        name={'due_date'}
                        firstDayOfWeek={0}
                        value={ new Date(this.state.due_date) } 
                        onChange={this.handleDueDateChange}
                        errorText={this.state.due_date_hasErrors ? 'Required' : ''}
                    />

                    <div style={styles.buttons}>
                        <Link to="/today">
                        <RaisedButton label="Cancel"/>
                        </Link>

                        <RaisedButton label="Save"
                                    style={styles.saveButton}
                                    type="submit"
                                    primary={true}/>
                    </div>
                </form>  
          </div>  
      )
  }
}

const AddForm = connect(null, mapDispatchToProps)(ConnectedForm);

export default AddForm;
