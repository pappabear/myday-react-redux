import React, { Component } from "react";
import { connect } from "react-redux";
import { tasksFetchData } from '../actions';
import Checkbox from 'material-ui/Checkbox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey400} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import withWidth from 'material-ui/utils/withWidth';
import globalStyles from '../globalStyles';
import QuickAddForm from './QuickAddForm';

const mapStateToProps = state => {
      return { 
        tasks: state.tasks,
        hasErrored: state.tasksHasErrored,
        isLoading: state.tasksIsLoading
        };
};

class Tasklist extends Component {
	
    componentDidMount() {
        //const queryString = require('query-string');
        //const parsed = queryString.parse(this.props.location.search);
        console.log("this.props.match.params.dt=" + this.props.match.params.dt);
        this.props.fetchData(this.props.match.params.dt);
    }

    render() {

        //const queryString = require('query-string');
 
        //const parsed = queryString.parse(this.props.location.search);
        //console.log("Tasklist render() ==> parsed.dt=" + parsed.dt);
        console.log("this.props.match.params.dt=" + this.props.match.params.dt);
        const pageTitle = this.props.match.params.dt;

        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        const styles = {
            floatingActionButton: {
              margin: 0,
              top: 'auto',
              right: 20,
              bottom: 20,
              left: 'auto',
              position: 'fixed',
            }
          };
        
          const iconButtonElement = (
            <IconButton
              touch={true}
              tooltipPosition="bottom-left"
            >
                <MoreVertIcon color={grey400} />
            </IconButton>
          );
        
          const rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
              <MenuItem>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
            </IconMenu>
          );
      
        return (
            <div>
                <h3 style={globalStyles.title}>{pageTitle}</h3>

                <List>
                {this.props.tasks.map(task =>
                <div key={task.id}>
                        <ListItem 
                            righticonbutton={rightIconMenu}
                            >
                            <Checkbox
                                label={task.title}
                                //checked={task.is_complete}
                                style={styles.checkbox}
                                righticonbutton={rightIconMenu}
                                //onClick={this.handleClick}
                            />
                        </ListItem>
                        <Divider inset={true} />
                </div>
                )}
                </List>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <QuickAddForm />
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <div>
                    <div>add + button</div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (searchDate) => dispatch(tasksFetchData(searchDate))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasklist);

