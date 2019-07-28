import React, { Component } from "react";
import Thead from "./head";
import Tbody from "./body";
import "../../css/table.css";
import { redirectToLogin } from "../../security/jwt";
import Header from "../Header";
import { getAllTasks, deleteById } from "../../action/Action";
import Sort from "../Sort";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createNew: "",
      update: "",
      fullName: "",
      delete: false,
      deleteTaskName: "",
      tasks: [],
      active: "",
      filterTasks:[],
      completedClick:false,
      completedFilter:[]
    };

    if (this.props.location.state) {
      this.state = {
        ...this.state,
        createNew: this.props.location.state.createNew,
        update: this.props.location.state.update,
        fullName: this.props.location.state.fullName
      };
    }

    this.deleteAlert = this.deleteAlert.bind(this);
    this.reflesh = this.reflesh.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.sortByTaskName = this.sortByTaskName.bind(this);
    this.sortByEndDate = this.sortByEndDate.bind(this);
    this.sortById = this.sortById.bind(this);
    this.filter = this.filter.bind(this);
    this.completed = this.completed.bind(this);
  }

  componentDidMount() {
    this.reflesh();
  }

  reflesh() {
    getAllTasks()
      .then(res => {
        this.setState({
          tasks: res.data,
          filterTasks:res.data
        });
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.props.history.push({
            pathname: "/login",
            state: { mustLogin: true }
          });
        }
      });
  }

  deleteTask(taskId) {
    deleteById(taskId)
      .then(() => {
        this.reflesh();
        this.deleteAlert(taskId);
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.props.history.push({
            pathname: "/login",
            state: { mustLogin: true }
          });
        }
      });
  }

  sortById() {
    let { tasks } = this.state;
    tasks.sort((a, b) => {
      return a.taskIdentifier.localeCompare(b.taskIdentifier);
    });
    this.setState({
      tasks: tasks,
      active: "taskId"
    });
  }

  sortByTaskName() {
    let { tasks } = this.state;
    tasks.sort((a, b) => {
      return a.taskName.localeCompare(b.taskName);
    });
    this.setState({
      tasks: tasks,
      active: "taskName"
    });
  }

  sortByEndDate() {
    let { tasks } = this.state;
    tasks.sort((a, b) => {
      if (a.end_date === null) {
        a.end_date = "99/99/9999";
      }
      if (b.end_date === null) {
        b.end_date = "99/99/9999";
      }

      let dateA = a.end_date.split("/").reverse().join(),
        dateB = b.end_date.split("/").reverse().join();

      if (a.end_date === "99/99/9999") {
        a.end_date = null;
      }
      if (b.end_date === "99/99/9999") {
        b.end_date = null;
      }
      return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
    });
    this.setState({
      tasks: tasks,
      active: "endDate"
    });
  }


  filter(e){
    if(!this.state.completedClick){
      const newTask=this.state.filterTasks.filter(task =>{
        return task.taskIdentifier.toLowerCase().indexOf(e.toLowerCase()) !== -1 ||
        task.taskName.toLowerCase().indexOf(e.toLowerCase()) !== -1
      });
  
      this.setState({
        tasks:newTask
      });
    }else{
      let tempTask=this.state.completedFilter;
      const newTask=tempTask.filter(task =>{
        return task.taskIdentifier.toLowerCase().indexOf(e.toLowerCase()) !== -1 ||
        task.taskName.toLowerCase().indexOf(e.toLowerCase()) !== -1
      });
  
      this.setState({
        tasks:newTask
      });

    }
  }

  completed(completed){
    if(completed==="all"){
      this.setState({
        tasks:this.state.filterTasks,
        completedClick:false
      });
    }else if(completed==="true"){
      const newTask= this.state.filterTasks.filter(task =>{
        return task.completed===true
   
      });
      this.setState({
        tasks:newTask,
        completedClick:true,
        completedFilter:newTask
      });
    }else{
      const newTask= this.state.filterTasks.filter(task =>{
        return task.completed===false
      });
      this.setState({
        tasks:newTask,
        completedClick:true,
        completedFilter:newTask
      });
    }
  }



  deleteAlert(deleteTaskName) {
    this.setState({
      delete: true,
      deleteTaskName: deleteTaskName
    });
  }

  render() {
    return (
      <div>
        <Header changeButtonToCreate={redirectToLogin()} />
        <div className="container">
          <div className="mt-4">
            {this.state.createNew !== "" && this.state.createNew != null && (
              <div className="alert alert-success" role="alert">
                You Created {this.state.createNew} Task
              </div>
            )}
            {this.state.update !== "" && this.state.update != null && (
              <div className="alert alert-success" role="alert">
                You Updated {this.state.update} Task
              </div>
            )}
            {this.state.fullName !== "" && this.state.fullName != null && (
              <div className="alert alert-success" role="alert">
                Welcome {this.state.fullName}
              </div>
            )}
            {this.state.delete && (
              <div className="alert alert-danger" role="alert">
                You Deleted {this.state.deleteTaskName}
              </div>
            )}
            <Sort
            completed={this.completed}
              filter={this.filter}
              taskId={this.sortById}
              endDate={this.sortByEndDate}
              taskName={this.sortByTaskName}
              active={this.state.active}
            />
            <table className="table table-hover table-dark text-center">
              <Thead />
              <Tbody
                tasks={this.state.tasks}
                deleteCallBack={this.deleteTask}
              />
            </table>
          </div>
        </div>
      </div>
    );
  }
}
