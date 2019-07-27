import React, { Component } from "react";
import { createTask, empties } from "../action/Action";
import "../css/add.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { getJwtFromSession, redirectToLogin } from "../security/jwt";
import Header from "./Header";
import "@kenshooui/react-multi-select/dist/style.css";
import MultiSelect from "@kenshooui/react-multi-select";

export default class Add extends Component {
  constructor() {
    super();

    this.state = {
      taskName: "",
      taskIdentifier: "",
      desc: "",
      start_date: "",
      end_date: "",
      min_date: new Date(),
      error: {},
      token: "",
      empties: [],
      subTasks: [],
      selectedItems: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (redirectToLogin()) {
      this.props.history.push({
        pathname: "/login",
        state: { mustLogin: true }
      });
    }

    let tempToken = getJwtFromSession();

    this.setState({
      token: tempToken
    });

    empties().then(res =>
      this.setState({
        empties: res.data
      })
    );
  }

  handleChange(subTasks) {
    this.setState({ subTasks });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChangeStart(date) {
    if (date > this.state.end_date && this.state.end_date !== "") {
      this.setState({
        end_date: date
      });
    }
    this.setState({
      start_date: date,
      min_date: date
    });
  }

  handleChangeEnd(date) {
    this.setState({
      end_date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    let { start_date, end_date } = this.state;

    if (start_date !== "") {
      start_date = moment(this.state.start_date).format("DD/MM/YYYY");
    }
    if (end_date !== "") {
      end_date = moment(this.state.end_date).format("DD/MM/YYYY");
    }

    const newTask = {
      taskName: this.state.taskName,
      taskIdentifier: this.state.taskIdentifier,
      desc: this.state.desc,
      start_date: start_date,
      end_date: end_date,
      subTasks: this.state.subTasks
    };

    console.log(newTask);

    createTask(newTask)
      .then(res => {
        this.props.history.push({
          pathname: "/",
          state: { createNew: res.data.taskIdentifier }
        });
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.props.history.push({
            pathname: "/login",
            state: { mustLogin: true }
          });
        } else {
          this.setState({
            error: err.response.data
          });
        }
      });
  }

  render() {
    return (
      <div>
        <Header changeButtonToCreate={redirectToLogin()} />
        <div className="container">
          <form
            className="text-center border border-light"
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

            <div className="form-row mb-4" style={{ clear: "both" }}>
              <div className="form-group col">
                <label>Select Date: </label>
                <DatePicker
                  selected={this.state.start_date}
                  dateFormat="dd/MM/yyyy"
                  startDate={this.state.start_date}
                  endDate={this.state.end_date}
                  onChange={this.handleChangeStart}
                  minDate={new Date()}
                />
              </div>

              <div className="form-group col">
                <label>End Date: </label>
                <DatePicker
                  selected={this.state.end_date}
                  dateFormat="dd/MM/yyyy"
                  startDate={this.state.start_date}
                  endDate={this.state.end_date}
                  onChange={this.handleChangeEnd}
                  minDate={this.state.min_date}
                />
              </div>
            </div>

            <div className="form-group">
              <label> Select Child Tasks </label>
              <p> *Parent Task can not complete until Child Tasks are completed </p>
              <MultiSelect
                items={this.state.empties}
                selectedItems={this.state.subTasks}
                onChange={this.handleChange}
              />
            </div>

            <button className="btn btn-info btn-block mt-4" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}
