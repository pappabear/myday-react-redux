import React, { Component } from "react";
import { connect } from "react-redux";
import { tasksFetchWeekData } from '../actions';
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
import {Link} from 'react-router-dom';

const mapStateToProps = state => {
      return { 
        tasks: state.tasks,
        hasErrored: state.tasksHasErrored,
        isLoading: state.tasksIsLoading
        };
};

class Week extends Component {
    
    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
        this.renderToday = this.renderToday.bind(this);
        this.renderTomorrow = this.renderTomorrow.bind(this);
        this.renderTomorrowPlus1 = this.renderTomorrowPlus1.bind(this);
        this.renderTomorrowPlus2 = this.renderTomorrowPlus2.bind(this);
        this.renderTomorrowPlus3 = this.renderTomorrowPlus3.bind(this);
      }

    componentDidMount() {
        this.props.fetchWeekTasks();
    }

    renderList(styles, rightIconMenu, header, subHeader, workingDate)
    {
        var tasks = [];
        var i = 0;

        for ( i=0; i < this.props.tasks.length; i++ )
        {
            var dueDate = new Date(this.props.tasks[i].due_date);      
            var dd = dueDate.getDate(); 
            if (dd < 10) dd = '0' + dd;
            var mm = dueDate.getMonth()+1; //January is 0! 
            if (mm < 10) mm = '0' + mm;
            var yyyy = dueDate.getFullYear(); 
            var duedateString = yyyy + '-' + mm + '-' + dd;
            if (duedateString === workingDate)
                tasks.push(this.props.tasks[i]);
        }
        
        if (tasks.length === 0)
            return  <div>
                        <h5>{header} &nbsp;&nbsp;&nbsp;&nbsp; <span style={styles.subheader}>{ subHeader }</span></h5>
                        None
                    </div>
        else    
            return  <div>                
                        <h5>{header} &nbsp; &nbsp;&nbsp;&nbsp; <span style={styles.subheader}>{ subHeader }</span></h5>

                        <List>
                        {tasks.map(task =>
                        <div key={task.id}>
                                <ListItem 
                                    rightIconButton={rightIconMenu}
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
                    </div>
    }

    renderToday(styles, rightIconMenu)
    {
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        
        var today = new Date();      
        var dd = today.getDate(); 
        if (dd < 10) dd = '0' + dd;
        var mm = today.getMonth()+1; //January is 0! 
        if (mm < 10) mm = '0' + mm;
        var yyyy = today.getFullYear(); 
        var todayString = yyyy + '-' + mm + '-' + dd;

        var day = days[ today.getDay() ];
        var month = months[ today.getMonth() ];
        var subHeader = day + ", " + month + " " + today.getDate()+ " " + yyyy;

        return this.renderList(styles, rightIconMenu, "Today", subHeader, todayString)
    }

    renderTomorrow(styles, rightIconMenu)
    {
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        
        var dt = new Date();
        dt.setDate(dt.getDate() + 1);        
        var dd = dt.getDate(); 
        if (dd < 10) dd = '0' + dd;
        var mm = dt.getMonth()+1; //January is 0! 
        if (mm < 10) mm = '0' + mm;
        var yyyy = dt.getFullYear(); 
        var dtString = yyyy + '-' + mm + '-' + dd;

        var day = days[ dt.getDay() ];
        var month = months[ dt.getMonth() ];
        var subHeader = day + ", " + month + " " + dt.getDate()+ " " + yyyy;

        return this.renderList(styles, rightIconMenu, "Tomorrow", subHeader, dtString)
    }

    renderTomorrowPlus1(styles, rightIconMenu)
    {
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        
        var dt = new Date();
        dt.setDate(dt.getDate() + 2);        
        var dd = dt.getDate(); 
        if (dd < 10) dd = '0' + dd;
        var mm = dt.getMonth()+1; //January is 0! 
        if (mm < 10) mm = '0' + mm;
        var yyyy = dt.getFullYear(); 
        var dtString = yyyy + '-' + mm + '-' + dd;

        var day = days[ dt.getDay() ];
        var month = months[ dt.getMonth() ];
        var subHeader = month + " "  + dt.getDate() + " " + yyyy;

        return this.renderList(styles, rightIconMenu, day, subHeader, dtString)
    }

    renderTomorrowPlus2(styles, rightIconMenu)
    {
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        
        var dt = new Date();
        dt.setDate(dt.getDate() + 3);        
        var dd = dt.getDate(); 
        if (dd < 10) dd = '0' + dd;
        var mm = dt.getMonth()+1; //January is 0! 
        if (mm < 10) mm = '0' + mm;
        var yyyy = dt.getFullYear(); 
        var dtString = yyyy + '-' + mm + '-' + dd;

        var day = days[ dt.getDay() ];
        var month = months[ dt.getMonth() ];
        var subHeader = month + " "  + dt.getDate() + " " + yyyy;

        return this.renderList(styles, rightIconMenu, day, subHeader, dtString)
    }

    renderTomorrowPlus3(styles, rightIconMenu)
    {
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        
        var dt = new Date();
        dt.setDate(dt.getDate() + 4);        
        var dd = dt.getDate(); 
        if (dd < 10) dd = '0' + dd;
        var mm = dt.getMonth()+1; //January is 0! 
        if (mm < 10) mm = '0' + mm;
        var yyyy = dt.getFullYear(); 
        var dtString = yyyy + '-' + mm + '-' + dd;

        var day = days[ dt.getDay() ];
        var month = months[ dt.getMonth() ];
        var subHeader = month + " "  + dt.getDate() + " " + yyyy;

        return this.renderList(styles, rightIconMenu, day, subHeader, dtString)
    }

    render() {

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
            },
            subheader: {
                color: grey400,
                fontWeight: 'normal'
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
                
                <h1>This Week</h1>

                { this.renderToday(styles, rightIconMenu) }
                { this.renderTomorrow(styles, rightIconMenu) }
                { this.renderTomorrowPlus1(styles, rightIconMenu) }
                { this.renderTomorrowPlus2(styles, rightIconMenu) }
                { this.renderTomorrowPlus3(styles, rightIconMenu) }

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
        fetchWeekTasks: () => dispatch(tasksFetchWeekData())
    };
};

//export default connect(mapStateToProps, mapDispatchToProps)(Today);
const componentCreator = connect(mapStateToProps, mapDispatchToProps);
export default withWidth()(componentCreator(Week));

