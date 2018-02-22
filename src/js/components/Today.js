import React, { Component } from "react";
import { connect } from "react-redux";
import { tasksFetchTodayData } from '../actions';
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

class Today extends Component {
	
    componentDidMount() {
        this.props.fetchTodayTasks();
    }

    render() {

        var dateBuffer = new Date();
        var dd = dateBuffer.getDate(); 
        var mm = dateBuffer.getMonth()+1; //January is 0! 
        var yyyy = dateBuffer.getFullYear(); 
        var workingDate = yyyy + '-' + mm + '-' + dd;
        
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
                
                <h1>Today</h1>

                <List>
                {this.props.tasks.map(task =>
                <div key={task.id}>
                        <ListItem 
                            righticonbutton={rightIconMenu}
                            >
                            <Checkbox
                                label={task.subject}
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
                <QuickAddForm workingDate={workingDate} />
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
        fetchTodayTasks: () => dispatch(tasksFetchTodayData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Today);

