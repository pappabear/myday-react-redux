import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import App from "./components/App";
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from './theme-default';
import { BrowserRouter } from 'react-router-dom'

const store = configureStore();

injectTapEventPlugin();

render(
  <Provider store={store}>
        <MuiThemeProvider muiTheme={ThemeDefault} >
            <BrowserRouter>
                  <App />
            </BrowserRouter>
        </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
