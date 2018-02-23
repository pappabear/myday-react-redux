import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addTask } from "../actions/index";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const mapDispatchToProps = dispatch => {
  return {
    addTask: task => dispatch(addTask(task))
  };
};

class ConnectedForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subject: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { subject } = this.state;
    const id = uuidv1();
    var task = {subject:subject, due_date:this.props.workingDate, id:id, is_complete:false };
    this.props.addTask(task);
    this.setState({ subject: "" });
  }

  render() {

    const { subject } = this.state;

    const style = {
      margin: 12,
    };

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <TextField
              hintText="Quickly add a task here"
              id={'subject'}
              name={'subject'}
              value={subject}
              onChange={this.handleChange}
          />
          <RaisedButton 
              label="Add" 
              style={style} 
              onClick={this.handleSubmit} 
          />
        </div>  
      </form>
    );
  }
}

const QuickAddForm = connect(null, mapDispatchToProps)(ConnectedForm);

export default QuickAddForm;
