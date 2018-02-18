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

  constructor() {
    super();
    this.state = {
      title: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    const id = uuidv1();
	  //console.log("id=" + id);
	  //console.log("title=" + title);
    this.props.addTask({ title, id });
    this.setState({ title: "" });
  }

  render() {

    const { title } = this.state;

    const style = {
      margin: 12,
    };

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <TextField
              hintText="Quickly add a task here"
              id={'title'}
              name={'title'}
              value={title}
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
