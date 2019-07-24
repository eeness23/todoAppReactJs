import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./component/Header";
import Table from "./component/Table/Table";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ErrorPage from "./component/404/ErrorPage";
import Add from "./component/Add";
import Login from "./component/Login";
import Register from "./component/Register";
import Update from "./component/Update";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Table} />
            <Route path="/add" component={Add} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/tasks/:taskId" component={Update} />
            <Route path="*" component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
