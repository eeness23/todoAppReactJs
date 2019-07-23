import React, { Component } from "react";

export default class Add extends Component {
    constructor(){
        super()

        this.state={
            "taskName":"",
            "taskIdentifier":"",
            "desc":"",
            "start_date":"",
            "end_date":"",
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    onSubmit(e){
        e.preventDefault();
        const deneme={
            "taskName":this.state.taskName,
            "taskIdentifier":this.state.taskIdentifier,
            "desc":this.state.desc,
            "start_date":this.state.start_date,
            "end_date":this.state.end_date,
        }
        console.log(deneme);
    }

  render() {
    return (
      <form className="text-center border border-light p-5" onSubmit={this.onSubmit}>
        <p className="h4 mb-4">Create New Task</p>

        <input
          type="text"
          name="taskName"
          className="form-control mb-4"
          placeholder="Task Name"
          value={this.state.taskName}
          onChange={this.onChange}
        />

        <input
          type="text"
          name="taskIdentifier"
          className="form-control mb-4"
          placeholder="Task Identifier"
          value={this.state.taskIdentifier}
          onChange={this.onChange}
        />

        <div className="form-group">
          <textarea
            name="desc"
            className="form-control rounded-0"
            rows="3"
            placeholder="Description"
            value={this.state.desc}
            onChange={this.onChange}
          />
        </div>

        <div className="form-row mb-4">

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
