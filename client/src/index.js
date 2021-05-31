import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware,compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import * as actions from "./actions/index.js";
import App from "./App.jsx";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancer(
    applyMiddleware(thunk)
  )
);
window.mainStore = store;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

fetch("/api/auth/data", {credentials: "same-origin"})
  .then(r => r.json())
  .then(res => {
    if (res) {
      store.dispatch(actions.login(res));
    }
});