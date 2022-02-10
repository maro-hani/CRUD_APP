import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/popper.js/dist/umd/popper.min.js";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App/App.js";
import store from "./store/store";
// npx json-server --watch data/db.json --port 8000
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
