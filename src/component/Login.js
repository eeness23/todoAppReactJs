import React, { Component } from "react";
import {Link} from "react-router-dom"
import {login} from "../action/Action";
import {setJwtToken} from "../security/jwt"

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createUser: false,
      username:"",
      password:""
    };

    if (this.props.location.state) {
      this.state = {
        createUser: this.props.location.state.createUser,
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
      username:this.state.username,
      password:this.state.password
    }
    login(user)
  }

  render() {
    return (
      <form className="text-center border border-light p-5" onSubmit={this.onSubmit}>
        {this.state.createUser && (
          <div class="alert alert-success" role="alert">
            Register successfull
          </div>
        )}
        <p className="h4 mb-4">Sign in</p>
        <input
          type="email"
          name="username"
          id="defaultLoginFormEmail"
          className="form-control mb-4"
          placeholder="E-mail"
          value={this.state.username}
          onChange={this.onChange}
        />

        <input
          type="password"
          name="password"
          className="form-control mb-4"
          placeholder="Password"
          value={this.state.password}
          onChange={this.onChange}
        />

        <button className="btn btn-info btn-block my-4" type="submit">
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
