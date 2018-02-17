import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "../js/store";
import App from "../js/components/App";
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from './theme-default';

const store = configureStore();

injectTapEventPlugin();

render(
  <Provider store={store}>
        <MuiThemeProvider muiTheme={ThemeDefault} >
              <App />
        </MuiThemeProvider>
  </Provider>,
  document.getElementById("app")
);
