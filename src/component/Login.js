import React, { Component } from "react";
import { Link } from "react-router-dom";
import { login } from "../action/Action";
import {setJwtToSession, decodeToken} from "../security/jwt"

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createUser: false,
      username: "",
      password: "",
      mustLogin: "",
      error: ""
    };

    if (this.props.location.state) {
      this.state = {
        ...this.state,
        createUser: this.props.location.state.createUser,
        mustLogin: this.props.location.state.mustLogin
      };
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    login(user)
      .then(res => {
        setJwtToSession(res.data.token)
        this.props.history.push({
          pathname: "/",
          state: { fullName: [decodeToken(res.data.token).fullName] }
        });
      })
      .catch(err => {
        this.setState({
          error: err.response.data
        });
      });
  }

  render() {
    return (
          <form
            className="text-center border border-light"
            onSubmit={this.onSubmit}
          >
            {this.state.createUser && (
              <div class="alert alert-success" role="alert">
                Register successfull
              </div>
            )}
            {this.state.mustLogin && (
              <div class="alert alert-danger" role="alert">
                You have to login
              </div>
            )}
            <p className="h4 mb-4">Sign in</p>
            <div className="form-group mb-4">
              <input
                type="email"
                name="username"
                id="defaultLoginFormEmail"
                className="form-control"
                placeholder="E-mail"
                value={this.state.username}
                onChange={this.onChange}
              />
              <div className="validate">{this.state.error.username}</div>
            </div>

            <div className="form-group mb-4">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChange}
              />
              <div className="validate">{this.state.error.password}</div>
            </div>

            <button className="btn btn-info btn-block mb-2" type="submit">
              Sign in
            </button>

            <p>
              Not a member?
              <Link to="/register"> Register</Link>
            </p>
          </form>
    );
  }
}