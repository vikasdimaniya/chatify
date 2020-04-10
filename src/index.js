import React from "react";
import Home from "./Components/home";
import App from "./App.jsx";

import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./Components/profile";
import Forum from "./Components/forum";
import NotFound from "./Components/notFound";
import "bootstrap/dist/css/bootstrap.min.css";
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/notfound" component={NotFound} />
      <Route exact path="/u/:username" component={Profile} />
      <Route exact path="/f/:forumName:" component={Forum} />
      <Route exact path="/home" component={Home} />
    </Switch>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//
