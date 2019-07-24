import React, { Component } from "react";
import action from "../action/taskAction";
import "../css/add.css";

export default class Add extends Component {
  constructor() {
    super();

    this.state = {
      taskName: "",
      taskIdentifier: "",
      desc: "",
      start_date: "",
      end_date: "",
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
    const newTask = {
      taskName: this.state.taskName,
      taskIdentifier: this.state.taskIdentifier,
      desc: this.state.desc,
      start_date: this.state.start_date,
      end_date: this.state.end_date
    };

    action
      .createTask(newTask)
      .then( res => {console.log(res.data)})
      .catch(err => {
        this.setState({
          error: err.response.data
        });
      });
  }



  render() {
    return (
      <form
        className="text-center border border-light p-5"
        onSubmit={this.onSubmit}
      >
        <p className="h4 mb-4">Create New Task</p>

        <div className="form-group mb-4">
          <input
            type="text"
            name="taskName"
            className="form-control"
            placeholder="Task Name"
            value={this.state.taskName}
            onChange={this.onChange}
          />
          <div className="validate">{this.state.error.taskName}</div>
        </div>

        <div className="form-group mb-4">
          <input
            type="text"
            name="taskIdentifier"
            className="form-control"
            placeholder="Task Identifier"
            value={this.state.taskIdentifier}
            onChange={this.onChange}
          />
          <div className="validate">{this.state.error.taskIdentifier}</div>
          <div className="validate">{this.state.error.response}</div>
        </div>
        <div className="form-group mb-4">
          <textarea
            name="desc"
            className="form-control rounded-0"
            rows="3"
            placeholder="Description"
            value={this.state.desc}
            onChange={this.onChange}
          />
          <div className="validate">{this.state.error.desc}</div>
        </div>

        <div className="form-row mb-4" style={{clear:"both"}}>
          <div className="col">
            <label htmlFor="start_date">Start Date</label>
            <input
              type="date"
              name="start_date"
              id="start_date"
              className="form-control"
              value={this.state.start_date}
              onChange={this.onChange}
            />
          </div>

          <div className="col">
            <label htmlFor="end_date">End Date</label>
            <input
              type="date"
              name="end_date"
              id="end_date"
              className="form-control"
              value={this.state.end_date}
              onChange={this.onChange}
            />
          </div>
        </div>

        <button className="btn btn-info btn-block" type="submit">
          Send
        </button>
      </form>
    );
  }
}
