import React from 'react';
import Drawer from 'material-ui/Drawer';
import {spacing, typography} from 'material-ui/styles';
import {white, blue600} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';
//import Avatar from 'material-ui/Avatar';
import DatePicker from 'material-ui/DatePicker';
//import Divider from 'material-ui/Divider';

const LeftDrawer = (props) => {
  let { navDrawerOpen } = props;

  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 22,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: blue600,
      paddingLeft: 40,
      height: 56,
    },
    menuItem: {
      color: white,
      fontSize: 14
    },
    datePickerPlaceholder: {
      color: white,
      fontSize: 14
    },
    avatar: {
      div: {
        padding: '15px 0 20px 15px',
        //backgroundImage:  'url(' + require('../images/material_bg.png') + ')',
        height: 45
      },
      icon: {
        float: 'left',
        display: 'block',
        marginRight: 15,
        boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
      },
      span: {
        paddingTop: 12,
        display: 'block',
        color: 'white',
        fontWeight: 300,
        textShadow: '1px 1px #444'
      }
    }
  };


  const menus = [
    { text: 'Home', link: '/' },  
    { text: 'Today', link: '/today' },
    { text: 'Tomorrow', link: '/tomorrow' },
    { text: 'Form', link: '/form' },
  ]
  

  return (
    <Drawer
      docked={true}
      open={navDrawerOpen}>
        <div style={styles.logo}>
        </div>
        <div style={styles.avatar.div}>
          <span style={styles.avatar.span}>MANAGE YOUR TIME</span>
        </div>
        <div>
          {menus.map((menu, index) =>
            <MenuItem
              key={index}
              style={styles.menuItem}
              primaryText={menu.text}
              leftIcon={menu.icon}
              containerElement={<Link to={menu.link}/>}
            />
          )}
        </div>

            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <MenuItem
              key={999}
              style={styles.menuItem}
              >
                <DatePicker style={styles.datePickerPlaceholder}
                            hintText="Or, choose a specific date" 
                            hintStyle={{color:'grey'}}
                            inputStyle={{color: 'grey'}}
                            container="inline"
                            locale={'en-US'} 
                            autoOk={true}
                            mode="landscape" />
            </MenuItem>

    </Drawer>
  );
};

export default LeftDrawer;
