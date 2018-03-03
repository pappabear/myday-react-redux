import React from 'react';
import { Field, reduxForm } from 'redux-form';

const EditForm = props => {

    const { handleSubmit, pristine, reset, submitting } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name</label>
                <div>
                <Field
                    name="subject"
                    component="input"
                    type="text"
                    placeholder="Subject"
                />
                </div>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
  );
};

export default reduxForm({
    form: 'editForm'
})(EditForm);
