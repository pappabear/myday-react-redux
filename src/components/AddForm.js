import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addTask } from "../actions/index";
import RaisedButton from 'material-ui/RaisedButton';
//import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
//import SelectField from 'material-ui/SelectField';
//import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
//import Divider from 'material-ui/Divider';
import {Link} from 'react-router-dom';
//import { withRouter } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
  return {
    addTask: task => dispatch(addTask(task))
  };
};

class ConnectedForm extends Component {

  constructor() {
    super();
    this.state = {
      title: "",
      due_date: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, controlledDate) {
    
    if (!isNaN(controlledDate))
    {
      var d = new Date(controlledDate);      
      var dd = d.getDate(); 
      var mm = d.getMonth()+1; //January is 0! 
      var yyyy = d.getFullYear(); 
      var dateString = yyyy + '-' + mm + '-' + dd;
      this.setState({ due_date: dateString });
    }
    else
    {
      this.setState({ [event.target.id]: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { subject, due_date } = this.state;
    const id = uuidv1();
    var task = {subject:subject, due_date:due_date, id:id, is_complete:false };
    this.props.addTask(task);
    this.setState({ title: "", due_date: "" });
    this.props.history.push("/today");
  }

  render() {
    
    const styles = {
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
    };
    
    const { subject } = this.state;

    return (

      <div>

        <h1>Add New Task</h1>

        <form onSubmit={this.handleSubmit}>

          <TextField
            hintText="Subject"
            floatingLabelText="Subject"
            fullWidth={true}
            id={'subject'}
            name={'subject'}
            value={subject}
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
);
  }
}

const AddForm = connect(null, mapDispatchToProps)(ConnectedForm);

export default AddForm;
