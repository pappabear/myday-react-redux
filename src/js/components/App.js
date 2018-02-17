import React from "react";
import Tasklist from "./Tasklist";
import Form from "./Form";
import MDemo from './MDemo';
import Header from './Header';
import LeftDrawer from '../components/LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import Paper from 'material-ui/Paper';
import globalStyles from '../globalStyles';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

  handleChangeRequestNavDrawer() {
    console.log('recived click');
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {

    const data = {
      menus: [
        { text: 'Today', link: '/ListPage?dt=2018-02-01' },
        { text: 'Tomorrow', link: '/ListPage?dt=2018-02-03' },
      ],
    }

    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };

    return (
        <div>
          <Header 
            styles={styles.header}
            handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}
            />

            <LeftDrawer 
              navDrawerOpen={navDrawerOpen}
              menus={data.menus}
            />

            <div style={styles.container}>
              <Paper style={globalStyles.paper}>
                <Tasklist />
                <Form />
                <MDemo />
                <div style={globalStyles.clear}/>
              </Paper>

            </div>

        </div>
      
    );
  }
}

//export default App;
export default withWidth()(App);
