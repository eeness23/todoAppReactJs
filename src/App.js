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
import PrivateRoute from "./component/PrivateRoute";
import jwt_decode from "jwt-decode";

const jwtToken = sessionStorage.getItem("Authorization");

if(jwtToken){
  const decodeToken = jwt_decode(jwtToken)

  const currentTime = Date.now()/1000;
  if(decodeToken.exp < currentTime){
    sessionStorage.removeItem("Authorization");
  }
}





class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Table} />
            <PrivateRoute component={Add} path="/add" exact />
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
