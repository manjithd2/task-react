import React from "react";
import ReactDOM  from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/Store";
import App from "./App";

import './styles/indexStyle.scss';

ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
    document.getElementById('root')
  );
  