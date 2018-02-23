import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addTask } from "../actions/index";
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import {Link} from 'react-router-dom';

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
    
    return (
      <form onSubmit={this.handleSubmit}>

        <TextField
          hintText="Name"
          floatingLabelText="Name"
          fullWidth={true}
        />

        <SelectField
          floatingLabelText="City"
          value=""
          fullWidth={true}>
          <MenuItem key={0} primaryText="London"/>
          <MenuItem key={1} primaryText="Paris"/>
          <MenuItem key={2} primaryText="Rome"/>
        </SelectField>

        <DatePicker
          hintText="Expiration Date"
          floatingLabelText="Expiration Date"
          fullWidth={true}/>

        <div style={styles.toggleDiv}>
          <Toggle
            label="Disabled"
            labelStyle={styles.toggleLabel}
          />
        </div>

        <Divider/>

        <div style={styles.buttons}>
          <Link to="/">
            <RaisedButton label="Cancel"/>
          </Link>

          <RaisedButton label="Save"
                        style={styles.saveButton}
                        type="submit"
                        primary={true}/>
        </div>
      </form>    
);
  }
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export default Form;
