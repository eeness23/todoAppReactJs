import React, { Component } from "react";
import { getTaskById, createTask,emptiesOrIsSelf } from "../action/Action";
import "../css/add.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { redirectToLogin } from "../security/jwt";
import Header from "./Header";
import "@kenshooui/react-multi-select/dist/style.css";
import MultiSelect from "@kenshooui/react-multi-select";

export default class Update extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      taskName: "",
      taskIdentifier: "",
      desc: "",
      start_date: "",
      create_at: "",
      end_date: "",
      min_date: new Date(),
      error: {},
      loading: true,
      completed: false,
      dependencies: "",
      empties: [],
      subTasks: []
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

    const { taskId } = this.props.match.params;

    getTaskById(taskId).then(res => {
      let { start_date, end_date } = res.data;

      if (start_date != null) {
        let tempStartDate = start_date.toString().split("/");
        start_date = new Date(
          tempStartDate[2] + "-" + tempStartDate[1] + "-" + tempStartDate[0]
        );
      }
      if (end_date != null) {
        let tempEndDate = end_date.toString().split("/");
        end_date = new Date(
          tempEndDate[2] + "-" + tempEndDate[1] + "-" + tempEndDate[0]
        );
      }

      this.setState({
        id: res.data.id,
        create_at: res.data.create_at,
        taskName: res.data.taskName,
        taskIdentifier: res.data.taskIdentifier,
        desc: res.data.desc,
        start_date: start_date,
        end_date: end_date,
        min_date: new Date(),
        completed: res.data.completed,
        dependencies:"",
        subTasks:res.data.subTasks
      });
    });

    emptiesOrIsSelf(taskId).then(res => {
      this.setState({
        empties:res.data
      })
    })
  }

  handleChange(subTasks) {
    this.setState({ subTasks:subTasks });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChangeStart(date) {
    if (date > this.state.end_date && this.state.end_date != null) {
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

    if (start_date != null) {
      start_date = moment(this.state.start_date).format("DD/MM/YYYY");
    }
    if (end_date != null) {
      end_date = moment(this.state.end_date).format("DD/MM/YYYY");
    }

    const newTask = {
      id: this.state.id,
      create_at: this.state.create_at,
      taskName: this.state.taskName,
      taskIdentifier: this.state.taskIdentifier,
      desc: this.state.desc,
      start_date: start_date,
      end_date: end_date,
      completed: this.state.completed,
      subTasks:this.state.subTasks
    };

    console.log(newTask);

    
    createTask(newTask)
      .then(res => {
        this.props.history.push({
          pathname: "/",
          state: { update: res.data.taskIdentifier }
        });
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 401) {
          this.props.history.push({
            pathname: "/login",
            state: { mustLogin: true }
          });
        } else if (err.response.data.dependencies !== null) {
          this.setState({
            dependencies: err.response.data.dependencies
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
        {this.state.dependencies!=="" && <div className="alert alert-danger" role="alert">
             {this.state.dependencies}
          </div>}
          <form
            className="text-center border border-light"
            onSubmit={this.onSubmit}
          >
            <p className="h4 mb-4">Update Task</p>

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

            <div className="form-inline mt-4 mb-4">
              <label className="col" for="completed">
                Status
              </label>
              <select
                value={this.state.completed}
                onChange={this.onChange}
                className="form-control col"
                name="completed"
              >
                <option value={true}>Completed</option>
                <option value={false}>Not Completed</option>
              </select>
            </div>

            <button className="btn btn-info btn-block" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}
