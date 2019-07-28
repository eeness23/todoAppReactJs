import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "./component/Table/Table";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ErrorPage from "./component/404/ErrorPage";
import Add from "./component/Add";
import Login from "./component/Login";
import Register from "./component/Register";
import Update from "./component/Update";
import {setJwtToSession,getJwtFromSession} from "./security/jwt";


class App extends Component {
  render() {
    setJwtToSession(getJwtFromSession());

    return (
      <BrowserRouter>
  
          <Switch>
            <Route exact path="/" component={Table} />
            <Route component={Add} path="/add"/>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/tasks/:taskId" component={Update} />
            <Route path="*" component={ErrorPage} />
          </Switch>
  
      </BrowserRouter>
    );
  }
}

export default App;
