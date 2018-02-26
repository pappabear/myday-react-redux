import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTomorrowTasks } from '../actions';
import { toggleTaskStatus } from '../actions';
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
import QuickAddForm from './QuickAddForm';
import {Link} from 'react-router-dom';

const mapStateToProps = state => {
      return { 
        tasks: state.tasks,
        hasErrored: state.tasksHasErrored,
        isLoading: state.tasksIsLoading
        };
};

class Tomorrow extends Component {
    
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
      }

    componentDidMount() {
        this.props.fetchTomorrowTasks();
    }

    handleClick(event)
    {
      var task = {due_date:this.getTomorrowsDate(), id:event.target.id };
      this.props.toggleTaskStatus(task)
    }

    getTomorrowsDate()
    {
        var dateBuffer = new Date();
        dateBuffer.setDate(dateBuffer.getDate() + 1);
        var dd = dateBuffer.getDate(); 
        var mm = dateBuffer.getMonth()+1; //January is 0! 
        var yyyy = dateBuffer.getFullYear(); 
        var workingDate = yyyy + '-' + mm + '-' + dd;
        return workingDate;
    }

    render() {

        var workingDate = this.getTomorrowsDate();
        
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
              <MenuItem primaryText="Edit" containerElement={<Link to="/login"/>}/>
              <MenuItem primaryText="Delete" containerElement={<Link to="/login"/>}/>
            </IconMenu>
          );
      
        
          return (
            <div>
                
                <h1>Tomorrow</h1>

                <List>
                {this.props.tasks.map(task =>
                <div key={task.id}>
                        <ListItem 
                            rightIconButton={rightIconMenu}
                            >
                            <Checkbox
                                label={task.subject}
                                defaultChecked={task.is_complete}
                                style={styles.checkbox}
                                righticonbutton={rightIconMenu}
                                onClick={this.handleClick}
                                id={task.id}
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
                    <Link to="/new" >
                        <FloatingActionButton 
                            style={styles.floatingActionButton} 
                            backgroundColor={pink500}
                            >
                            <ContentAdd />
                        </FloatingActionButton>
                    </Link>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        toggleTaskStatus: (task) => dispatch(toggleTaskStatus(task)),
        fetchTomorrowTasks: () => dispatch(fetchTomorrowTasks())
    };
};


const componentCreator = connect(mapStateToProps, mapDispatchToProps);
export default withWidth()(componentCreator(Tomorrow));

