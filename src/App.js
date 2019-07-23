import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./component/Header";
import Table from "./component/Table";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ErrorPage from "./component/404/ErrorPage";
import Add from "./component/Add";
import Login from "./component/Login";
import Register from "./component/Register";

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
            <Route path="*" component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
