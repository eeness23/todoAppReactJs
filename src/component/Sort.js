import React, { Component } from "react";

export default class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "",
      filter: ""
    };
    this.onChange = this.onChange.bind(this);
    this.completed = this.completed.bind(this);
  }

  componentWillReceiveProps(props) {
    let { active } = props;
    this.setState({
      active: active
    });
  }

  onChange(e) {
    this.setState({
      filter: e.target.value
    });
    this.props.filter(e.target.value);
  }

  completed(e){
    this.props.completed(e.target.id);
  }

  render() {
    return (
      <ul className="nav nav-pills mb-1">
        <div className="active-cyan-3 active-cyan-4">
          <input
            className="form-control"
            type="text"
            placeholder="Search Id or Name"
            aria-label="Search"
            value={this.state.filter}
            onChange={this.onChange}
          />
        </div>

        <div className="form-check form-check-inline ml-2">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="true"
            onClick={this.completed}
          />
          <label className="form-check-label" for="true">
            Completed
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="false"
            onClick={this.completed}
          />
          <label className="form-check-label" for="false">
            Not Completed
          </label>
        </div>
        <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="all"
          onClick={this.completed}
        />
        <label className="form-check-label" for="all">
          All
        </label>
      </div>
        <div className="form-inline nav-sort mr-1">Sort By :</div>
        <li className="nav-item" onClick={this.props.taskId}>
          <div
            className={`nav-link pointer ${
              this.state.active === "taskId" ? "active" : ""
            }`}
          >
            Task ID
          </div>
        </li>
        <li className="nav-item" onClick={this.props.taskName}>
          <div
            className={`nav-link pointer ${
              this.state.active === "taskName" ? "active" : ""
            }`}
          >
            Task Name
          </div>
        </li>
        <li className="nav-item" onClick={this.props.endDate}>
          <div
            className={`nav-link pointer ${
              this.state.active === "endDate" ? "active" : ""
            }`}
          >
            End Date
          </div>
        </li>
      </ul>
    );
  }
}
