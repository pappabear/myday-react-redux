import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { DatePicker, TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import { updateTask } from '../../actions';

// this validates the INCOMING fields
const required = value => (value == null ? 'Required' : undefined)

// this validates the REVISED fields
const validate = values => 
{
    const errors = {}

    if (!values.subject) 
    {
      errors.subject = 'Required'
    }

    if (!values.due_date) 
    {
      errors.email = 'Required'
    }
    
    return errors
}

const submit = (values, dispatch) =>
{   
    var task = { id: values.id,
                 subject: values.subject,
                 due_date: values.due_date }
    dispatch(updateTask(task))
}

const EditForm = props => {

    const { handleSubmit } = props

    const styles = {
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

            <form onSubmit={handleSubmit(submit)}>

                <div>
                    <Field
                        name="subject"
                        component={TextField}
                        hintText="Subject"
                        floatingLabelText="Subject"
                        validate={required}
                    />
                </div>

                <div>
                    <Field
                        name="due_date"
                        component={DatePicker}
                        format={null}
                        hintText="Due Date"
                        floatingLabelText="Due Date"
                        validate={required}
                    />
                </div>

                <div style={styles.buttons}>
                    <RaisedButton label="Save"
                                style={styles.saveButton}
                                type="submit"
                                primary={true}/>
                </div>

            </form>
        
        </div>
    )
}

const successfulSubmitNowRedirect = (result, dispatch, props) =>
{
        //determine where to route to next
        var originalDueDateOnTask = props.originalDueDate.split('T')[0]
        
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

        //console.log("originalDueDateOnTask="+originalDueDateOnTask)
        //console.log("todayString="+todayString)
        //console.log("tomorrowString="+tomorrowString)
        
        if (originalDueDateOnTask === todayString)
            props.history.push("/today");
        else if (originalDueDateOnTask === tomorrowString)
            props.history.push("/tomorrow");
        else
            props.history.push("/week")
}

export default reduxForm({
    form: 'editForm',
    validate,
    submit,
    onSubmitSuccess: (result, dispatch, props) => {
        // use this callback to handle next route
        successfulSubmitNowRedirect(result, dispatch, props)       
      }
})(EditForm)

