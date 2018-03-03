import React, { Component } from "react";
import SubmitHandler from "./SubmitHandler"
import EditForm from "./EditForm"


class TaskEditor extends Component {

    render() {
    
        const task = { subject:"hello", due_date: new Date("2018-12-25"), id:72 }

        return (

            <div>
                <EditForm onSubmit={SubmitHandler}
                          //task={task} 
                          initialValues={{ subject: task.subject,
                                           due_date: task.due_date }}
                />
            </div>  
        );
    }
}


export default TaskEditor;
