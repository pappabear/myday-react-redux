import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { DatePicker, TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton';

const required = value => (value == null ? 'Required' : undefined)

const EditForm = props => {

    const { handleSubmit, pristine, reset, submitting } = props;

    const styles = {
        buttons: {
          marginTop: 30,
          float: 'right'
        },
        saveButton: {
          marginLeft: 5
        }
      };
  
    return (

        <div>

            <h1>Edit Task</h1>

            <form onSubmit={handleSubmit}>

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
};

export default reduxForm({
    form: 'editForm'
})(EditForm);
