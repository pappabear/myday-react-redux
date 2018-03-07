import React, { Component } from "react"
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import {grey400} from 'material-ui/styles/colors'
import {Link} from 'react-router-dom'

class EditForm extends Component {

    constructor(props) 
    {
        super(props)
        this.state = 
        {
            subject: this.props.subject,
            due_date: this.props.due_date.split('T')[0]
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event, controlledDate) 
    {

        if (!isNaN(controlledDate))
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
        else
        {
            this.setState({ [event.target.id]: event.target.value })
        }

    }

    handleSubmit(event) 
    {
        event.preventDefault()
        const { subject, due_date } = this.state
        var task = {subject:subject, due_date:due_date, id:this.props.taskId }
        console.log("submit date="+ task.due_date)
        //this.props.updateTask(task)

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

                <h1>Edit Task</h1>

                <form onSubmit={this.handleSubmit}>

                <TextField
                    hintText="Subject"
                    floatingLabelText="Subject"
                    fullWidth={true}
                    id={'subject'}
                    name={'subject'}
                    value={this.state.subject}
                    onChange={this.handleChange}
                />

                <DatePicker
                    hintText="Due Date"
                    floatingLabelText="Due Date"
                    autoOk={true}
                    fullWidth={true}
                    id={'due_date'}
                    name={'due_date'}
                    firstDayOfWeek={0}
                    //value={ new Date(this.state.due_date) } // display wrong date in picker!
                    value={ new Date((new Date(this.state.due_date)).setDate((new Date(this.state.due_date)).getDate() + 1)) }
                    onChange={this.handleChange}
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

export default EditForm;
