import React, { Component } from "react"
import Checkbox from 'material-ui/Checkbox'
import { grey400} from 'material-ui/styles/colors'
import { ListItem} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import {Link} from 'react-router-dom'


class TaskListItemView extends Component {

    render() {
        
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
              <MenuItem primaryText="Edit" containerElement={<Link to={`/edit/${this.props.task_id}`} />}/>
              <MenuItem primaryText="Delete" containerElement={<Link to="/login"/>}/>
            </IconMenu>
          );
      
        
        return (
            <ListItem 
                rightIconButton={rightIconMenu}
                >
                <Checkbox
                    label={this.props.subject}
                    defaultChecked={this.props.is_complete}
                    righticonbutton={rightIconMenu}
                    onClick={this.props.handleClick}
                    id={this.props.task_id}
                />
            </ListItem>
        )
    }
}


export default TaskListItemView

