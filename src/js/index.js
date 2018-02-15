import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "../js/store";
import App from "../js/components/App";

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
