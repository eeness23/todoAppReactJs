import React, { Component } from 'react'
import {Link} from "react-router-dom"

export default class Header extends Component {
    render() {
        return (
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
            <Link className="my-0 mr-md-auto font-weight-normal" to="/">Spring Boot - ReactJS - TodoApp</Link>
    
            <Link className="btn btn-outline-success" to="/add" style={{marginLef:"auto",marginRight:"20px"}}>Create Task</Link>
            <Link className="btn btn-outline-primary" to="/register">Sign up</Link>
          </div>
          )
    }
}
