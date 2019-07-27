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
      <ul class="nav nav-pills mb-1">
        <div class="active-cyan-3 active-cyan-4">
          <input
            class="form-control"
            type="text"
            placeholder="Search Id or Name"
            aria-label="Search"
            value={this.state.filter}
            onChange={this.onChange}
          />
        </div>

        <div class="form-check form-check-inline ml-2">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="true"
            onClick={this.completed}
          />
          <label class="form-check-label" for="true">
            Completed
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="false"
            onClick={this.completed}
          />
          <label class="form-check-label" for="false">
            Not Completed
          </label>
        </div>
        <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="all"
          onClick={this.completed}
        />
        <label class="form-check-label" for="all">
          All
        </label>
      </div>

        <li class="nav-item nav-sort" onClick={this.props.taskId}>
          <div
            className={`nav-link pointer ${
              this.state.active === "taskId" ? "active" : ""
            }`}
          >
            Task ID
          </div>
        </li>
        <li class="nav-item" onClick={this.props.taskName}>
          <div
            className={`nav-link pointer ${
              this.state.active === "taskName" ? "active" : ""
            }`}
          >
            Task Name
          </div>
        </li>
        <li class="nav-item" onClick={this.props.endDate}>
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
