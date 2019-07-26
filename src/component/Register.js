import React, { Component } from "react";
import {register} from "../action/Action";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      error: {}
    };

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
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    console.log(newUser);

    
      register(newUser)
      .then(()=>{
        this.props.history.push({
          pathname: "/login",
          state : {createUser : true}
        })
      })
      .catch(err => {
        this.setState({
          error: err.response.data
        })
      });
  }

  render() {
    return (
      <form
        className="text-center border border-light"
        onSubmit={this.onSubmit}
      >
        <p className="h4 mb-4">Sign up</p>
        <div className="form-group mb-4">
          <input
            type="text"
            name="fullName"
            className="form-control"
            placeholder="Full Name"
            value={this.state.fullName}
            onChange={this.onChange}
          />
          <div className="validate">{this.state.error.fullName}</div>
        </div>

        <div className="form-group mb-4">
          <input
            type="email"
            name="username"
            className="form-control"
            placeholder="Email"
            value={this.state.username}
            onChange={this.onChange}
          />
          <div className="validate">{this.state.error.username}</div>
        </div>

        <div className="form-row mb-4">
          <div className="col">
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

          <div className="col">
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="ConfirmPassword"
              value={this.state.confirmPassword}
              onChange={this.onChange}
            />
            <div className="validate">{this.state.error.confirmPassword}</div>
          </div>
        </div>

        <button className="btn btn-info btn-block" type="submit">
          Send
        </button>
      </form>
    );
  }
}
